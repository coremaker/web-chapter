import {
	Checkbox,
	Table as MuiTable,
	TableBody,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
} from "@mui/material";
import { JSXElementConstructor, ReactNode } from "react";

import EllipsisCellContent, {
	EllipsisCellContentClasses,
} from "./components/EllipsisCellContent";
import TableCell, { TableCellClasses } from "./components/TableCell";
import {
	Cell,
	CellId,
	CheckboxRendererArgs,
	GenericRowStructure,
	HeadCell,
	HeadRowCells,
	PaginationRendererArgs,
	Row,
	RowAction,
	SearchInputRendererArgs,
} from "./types";
import useTable, {
	HEAD_ROW_IDENTIFIER,
	INTERNAL_ID_CELL_IDENTIFIER,
} from "../../hooks/useTable/useTable";
import { getTablePropsWithDefaults } from "../../hooks/useTable/utils";
import { SelectedRowIds } from "../../hooks/useTable/reducer";

interface BaseTableFooterClasses {
	root: string;
	cell: string;
}

export interface BaseTableClasses {
	root: string;
	headArea: string;
	searchInputContainer: string;
	actionsContainer: string;
	tableContainer: string;
	cell: Partial<TableCellClasses>;
	ellipsis: Partial<EllipsisCellContentClasses>;
	footer: Partial<BaseTableFooterClasses>;
}

export interface BaseTableProps<T extends GenericRowStructure> {
	showIdCell?: boolean;
	headIdCell?: Omit<HeadCell<T>, "id">;
	rowIdCell?: Omit<Cell<T, string>, "value">;
	makeSearchableRowContent?: (row: Row<T>) => string;
	searchInputPlaceholder?: string;
	selectable?: boolean;
	/**
	 * This prop changes the selected rows state from uncontrolled to controlled
	 */
	selectedRowIds?: SelectedRowIds;
	headCells: HeadRowCells<T>;
	rows: Row<T>[];
	rowActions?: RowAction<T>[];
	ellipsisIcon?: ReactNode;
	renderTableActions?: (selectedRows: SelectedRowIds) => ReactNode;
	renderTablePagination?: (args: PaginationRendererArgs<T>) => ReactNode;
	renderSearchInput?: (args: SearchInputRendererArgs) => ReactNode;
	renderCheckbox?: (args: CheckboxRendererArgs) => ReactNode;
	onRowSelectionChange?: (rowId: string, selected: boolean) => void;
	onAllRowsSelectionChange?: (selected: boolean) => void;
	onRowMenuOpen?: (row: Row<T>) => void;
	onRowMenuClose?: (row: Row<T>) => void;
	defaultRowsPerPage?: number;
	paginated?: boolean;
	SortIcon?: JSXElementConstructor<{
		className: string;
	}>;
	classes?: Partial<BaseTableClasses>;
}

const BaseTable = <T extends GenericRowStructure>(props: BaseTableProps<T>) => {
	const {
		headCells,
		rows,
		selectable,
		makeSearchableRowContent,
		searchInputPlaceholder = "Search",
		showIdCell,
		headIdCell,
		rowIdCell,
		rowActions,
		ellipsisIcon,
		renderTableActions,
		renderTablePagination,
		renderSearchInput,
		renderCheckbox,
		defaultRowsPerPage,
		paginated,
		SortIcon,
		classes,
		onRowMenuOpen,
		onRowMenuClose,
	} = getTablePropsWithDefaults(props);

	const {
		renderCellContent,
		renderHeadCellContent,
		makeRowCellId,
		currentPageRows,
		filteredRows,
		handleChangePage,
		handleRowsPerPageChange,
		handleSortCellClick,
		handleChangeSearchValue,
		handleRowSelection,
		handleAllRowsSelection,
		state,
		selectedRowsCount,
		headRow,
		cellIdsArray,
	} = useTable<T>(props);

	const { searchValue, sortByColumnId, sortDirection, page } = state;

	const { cell: cellClasses } = classes;

	const selectedRowIdsState = props.selectedRowIds
		? props.selectedRowIds
		: state.selectedRowIds;

	const renderRowCell = (
		row: Row<T>,
		cell: Cell<T, T[CellId<T>]>,
		cellId: CellId<T>
	) => {
		const cellContent = renderCellContent(cell, row);

		const cellIndex = cellIdsArray.indexOf(cellId);
		const isLastCell = cellIndex === cellIdsArray.length - 1;
		const rowActionsPresent = rowActions.length > 0;
		const key = makeRowCellId(row.id, cellId);
		return (
			<TableCell
				key={key}
				data-testid={`table-row-cell-${cellId}`}
				align={cell.numeric ? "right" : "left"}
				padding={cell.disablePadding ? "none" : "normal"}
				classes={{
					...cellClasses,
					bodyCell: `${cellClasses?.bodyCell ?? ""} BaseTable__Cell__${String(
						cellId
					)}`,
				}}
				SortIcon={SortIcon}
			>
				{isLastCell && rowActionsPresent ? (
					<EllipsisCellContent
						row={row}
						label={cellContent}
						rowActions={rowActions}
						classes={classes.ellipsis}
						icon={ellipsisIcon}
						onMenuOpen={onRowMenuOpen}
						onMenuClose={onRowMenuClose}
					/>
				) : (
					cellContent
				)}
			</TableCell>
		);
	};

	const renderPaginationComponent = () => {
		if (!paginated) {
			return null;
		}

		if (renderTablePagination) {
			return renderTablePagination({
				page,
				defaultRowsPerPage,
				rows,
				handleChangePage,
				handleRowsPerPageChange,
			});
		}
		return (
			<TableFooter className={classes.footer?.root}>
				<TableRow>
					<TablePagination
						className={classes.footer?.cell}
						data-testid="table-pagination"
						rowsPerPageOptions={[5, 10, 15, 20, 25]}
						count={filteredRows.length}
						rowsPerPage={defaultRowsPerPage}
						page={page}
						SelectProps={{
							inputProps: {
								"aria-label": "rows per page",
							},
						}}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleRowsPerPageChange}
					/>
				</TableRow>
			</TableFooter>
		);
	};

	return (
		<div className={classes.root}>
			<div className={classes.headArea}>
				{makeSearchableRowContent && (
					<div className={classes.searchInputContainer}>
						{renderSearchInput ? (
							renderSearchInput({
								searchValue,
								handleChangeSearchValue,
							})
						) : (
							<TextField
								placeholder={searchInputPlaceholder}
								onChange={(e) => handleChangeSearchValue(e.target.value)}
								value={searchValue}
							/>
						)}
					</div>
				)}
				<div className={classes.actionsContainer}>
					{renderTableActions?.(selectedRowIdsState)}
				</div>
			</div>

			<TableContainer className={classes.tableContainer}>
				<MuiTable>
					<TableHead data-testid="table-head">
						<TableRow>
							{selectable && (
								<TableCell classes={cellClasses} isHeadCell padding="checkbox">
									{renderCheckbox ? (
										renderCheckbox({
											onChange: handleAllRowsSelection,
											checked: selectedRowsCount === rows.length,
											indeterminate:
												selectedRowsCount > 0 &&
												selectedRowsCount < rows.length,
										})
									) : (
										<Checkbox
											onChange={handleAllRowsSelection}
											checked={selectedRowsCount === rows.length}
											indeterminate={
												selectedRowsCount > 0 && selectedRowsCount < rows.length
											}
											inputProps={{
												"aria-label": "select all rows",
											}}
										/>
									)}
								</TableCell>
							)}
							{showIdCell && (
								<TableCell
									isHeadCell
									sortable={headIdCell?.sortable}
									active={sortByColumnId === INTERNAL_ID_CELL_IDENTIFIER}
									align="left"
									sortDirection={
										sortByColumnId === INTERNAL_ID_CELL_IDENTIFIER
											? sortDirection
											: "desc"
									}
									padding={headIdCell?.disablePadding ? "none" : "normal"}
									onClick={() =>
										handleSortCellClick(INTERNAL_ID_CELL_IDENTIFIER)
									}
									classes={cellClasses}
									SortIcon={SortIcon}
								>
									{headIdCell
										? renderHeadCellContent(headIdCell, headRow)
										: "ID"}
								</TableCell>
							)}
							{cellIdsArray.map((cellId) => {
								const headCell = headCells[cellId];
								return (
									<TableCell
										key={HEAD_ROW_IDENTIFIER + cellId}
										isHeadCell
										align={headCell.numeric ? "right" : "left"}
										active={sortByColumnId === cellId}
										sortDirection={
											cellId === sortByColumnId ? sortDirection : "desc"
										}
										SortIcon={SortIcon}
										onClick={() => {
											if (!headCell.sortable) {
												return;
											}

											handleSortCellClick(cellId);
										}}
										padding={headCell.disablePadding ? "none" : "normal"}
										sortable={headCell.sortable}
										classes={cellClasses}
									>
										{renderHeadCellContent(headCell, headRow)}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody data-testid="table-body">
						{currentPageRows.map((row) => (
							<TableRow
								hover
								tabIndex={-1}
								key={row.id}
								data-testid={`table-body-row-${row.id}`}
								className={
									selectedRowIdsState[row.id] ? "BaseTable__Row--selected" : ""
								}
							>
								{selectable && (
									<TableCell
										classes={cellClasses}
										data-testid="table-row-cell"
										padding="checkbox"
									>
										{renderCheckbox ? (
											renderCheckbox({
												rowId: row.id,
												checked: !!selectedRowIdsState[row.id],
												onChange: (e) =>
													handleRowSelection(row.id, e.target.checked),
											})
										) : (
											<Checkbox
												onChange={(e) =>
													handleRowSelection(row.id, e.target.checked)
												}
												checked={!!selectedRowIdsState[row.id]}
												inputProps={{
													"aria-label": `select row ${row.id}`,
												}}
											/>
										)}
									</TableCell>
								)}
								{showIdCell && (
									<TableCell
										classes={cellClasses}
										data-testid="table-row-cell"
										padding="none"
									>
										{renderCellContent({ ...rowIdCell, value: row.id }, row)}
									</TableCell>
								)}
								{cellIdsArray.map((cellId) =>
									renderRowCell(row, row.cells[cellId], cellId)
								)}
							</TableRow>
						))}
					</TableBody>
					{renderPaginationComponent()}
				</MuiTable>
			</TableContainer>
		</div>
	);
};

export default BaseTable;
