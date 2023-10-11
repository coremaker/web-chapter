import {
    CircularProgressProps,
    Table as MuiTable,
    SortDirection,
    SxProps,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from '@mui/material';
import { ChangeEvent, JSXElementConstructor, MouseEvent, ReactNode, useMemo } from 'react';

import { SelectedRowIds } from '../../hooks/useTable/reducer';
import useTable, { HEAD_ROW_IDENTIFIER } from '../../hooks/useTable/useTable';
import Spinner from '../Spinner/Spinner';
import EllipsisCellContent, { EllipsisCellContentClasses } from './components/EllipsisCellContent';
import RowSelector, { HeadRowSelector } from './components/RowSelector';
import SearchEmptyState from './components/SearchEmptyState';
import TableCell, { TableCellClasses } from './components/TableCell';
import {
    CellId,
    CheckboxRendererArgs,
    GenericRowStructure,
    HeadRowCells,
    PaginationRendererArgs,
    Row,
    RowAction,
    RowCell,
    SearchInputRendererArgs,
} from './types';

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
    loaderContainer: string;
}

export interface BaseTableProps<T extends GenericRowStructure> {
    showIdCell?: boolean;
    makeSearchableRowContent?: (row: Row<T>) => string;
    searchInputPlaceholder?: string;
    selectable?: boolean;
    selectionType?: 'single' | 'multiple';
    renderSearchEmptyState?: () => ReactNode;
    /**
     * This prop changes the selected rows state from uncontrolled to controlled
     */
    searchProps?: {
        value: string;
        onChange: (value: string) => void;
    };
    totalPages?: number;
    selectedRowIds?: SelectedRowIds;
    headCells: HeadRowCells<T>;
    rows: Row<T>[];
    rowActions?: RowAction<T>[];
    ellipsisIcon?: ReactNode;
    rowsPerPageOptions?: number[];
    currentPage?: number;
    sortColumn?: CellId<T> | null;
    sortDirection?: SortDirection;
    renderTableActions?: (selectedRows: SelectedRowIds) => ReactNode;
    renderTablePagination?: (args: PaginationRendererArgs<T>) => ReactNode;
    renderSearchInput?: (args: SearchInputRendererArgs) => ReactNode;
    renderCheckbox?: (args: CheckboxRendererArgs) => ReactNode;
    onRowSelectionChange?: (rowId: string, selected: boolean) => void;
    onAllRowsSelectionChange?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    onRowMenuOpen?: (row: Row<T>) => void;
    onRowMenuClose?: (row: Row<T>) => void;
    defaultRowsPerPage?: number;
    paginated?: boolean;
    SortIcon?: JSXElementConstructor<{
        className: string;
    }>;
    classes?: Partial<BaseTableClasses>;
    loading?: boolean;
    SpinnerComponent?: JSXElementConstructor<CircularProgressProps>;
    handleRowsPerPageChange?: (value: number) => void;
    handlePageChange?: (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleSortCellClick?: (cellId: CellId<T>) => void;
    tableContainerSxProps?: SxProps;
    onRowClick?: (row: Row<T>, e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => void;
}

const defaultRowsPerPageOptions = [5, 10, 15, 20, 25];

const BaseTable = <T extends GenericRowStructure>({
    onRowSelectionChange,
    onAllRowsSelectionChange,
    ...props
}: BaseTableProps<T>) => {
    const {
        headCells,
        rows,
        selectable,
        selectionType = 'multiple',
        makeSearchableRowContent,
        searchInputPlaceholder = 'Search',
        showIdCell,
        rowActions = [],
        ellipsisIcon,
        renderTableActions,
        renderTablePagination,
        renderSearchInput,
        searchProps,
        renderCheckbox,
        renderSearchEmptyState = () => <SearchEmptyState />,
        defaultRowsPerPage = 10,
        rowsPerPageOptions,
        paginated,
        SortIcon,
        classes = {},
        onRowMenuOpen,
        onRowMenuClose,
        loading,
        SpinnerComponent = Spinner,
        tableContainerSxProps,
        onRowClick,
    } = props;

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
        page,
    } = useTable<T>({
        ...props,
        selectionType,
        onAllRowsSelectionChange,
        onRowSelectionChange,
        defaultRowsPerPage,
    });

    const { searchValue, sortByColumnId, sortDirection, rowsPerPage } = state;
    const hasTableData = Boolean(filteredRows.length);

    const { cell: cellClasses } = classes;

    const selectedRowIdsState = props.selectedRowIds ? props.selectedRowIds : state.selectedRowIds;

    const cellIdsArray = useMemo(() => Object.keys(headCells) as unknown as CellId<T>[], [headCells]);

    const renderRowCell = (row: Row<T>, cell: RowCell<T, T[CellId<T>]>, cellId: CellId<T>) => {
        const cellContent = renderCellContent(cell, row);
        const cellIndex = cellIdsArray.indexOf(cellId);
        const isLastCell = cellIndex === cellIdsArray.length - 1;
        const shouldRenderRowActions = rowActions.length > 0 && !row.disableActions;
        const key = makeRowCellId(row.cells.id.value, cellId);
        return (
            <TableCell
                key={key}
                data-testid={`table-row-cell-${cellId}`}
                align={cell.align}
                padding={cell.disablePadding ? 'none' : 'normal'}
                classes={{
                    ...cellClasses,
                    bodyCell: `${cellClasses?.bodyCell ?? ''} BaseTable__Cell__${String(cellId)}`,
                }}
                SortIcon={SortIcon}
            >
                {isLastCell && shouldRenderRowActions ? (
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
                rowsPerPage,
                rows: filteredRows,
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
                        rowsPerPageOptions={rowsPerPageOptions ?? defaultRowsPerPageOptions}
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={(e) => handleRowsPerPageChange(parseInt(e.target.value, 10))}
                    />
                </TableRow>
            </TableFooter>
        );
    };

    const shouldRenderCell = (render: (cellId: CellId<T>) => JSX.Element) => (cellId: CellId<T>) =>
        cellId !== 'id' || showIdCell ? render(cellId) : null;

    const searchInputProps = searchProps ?? {
        value: searchValue,
        onChange: handleChangeSearchValue,
    };

    return (
        <div className={classes.root}>
            <div className={classes.headArea}>
                {makeSearchableRowContent || searchProps ? (
                    <div className={classes.searchInputContainer}>
                        {renderSearchInput ? (
                            renderSearchInput({
                                searchValue: searchInputProps.value,
                                handleChangeSearchValue: searchInputProps.onChange,
                            })
                        ) : (
                            <TextField
                                placeholder={searchInputPlaceholder}
                                onChange={(e) => searchInputProps.onChange(e.target.value)}
                                value={searchInputProps.value}
                            />
                        )}
                    </div>
                ) : null}
                <div className={classes.actionsContainer}>{renderTableActions?.(selectedRowIdsState)}</div>
            </div>

            <TableContainer className={classes.tableContainer} sx={tableContainerSxProps}>
                <MuiTable>
                    <TableHead data-testid="table-head">
                        <TableRow>
                            {selectable && (
                                <TableCell classes={cellClasses} isHeadCell padding="checkbox">
                                    {selectionType === 'multiple' && (
                                        <HeadRowSelector
                                            selectedRowsCount={selectedRowsCount}
                                            rows={rows}
                                            handleAllRowsSelection={handleAllRowsSelection}
                                            renderCheckbox={renderCheckbox}
                                        />
                                    )}
                                </TableCell>
                            )}

                            {cellIdsArray.map(
                                shouldRenderCell((cellId) => {
                                    const headCell = headCells[cellId];
                                    return (
                                        <TableCell
                                            key={HEAD_ROW_IDENTIFIER + cellId}
                                            cellId={cellId}
                                            isHeadCell
                                            align={headCell.align}
                                            active={sortByColumnId === cellId}
                                            sortDirection={cellId === sortByColumnId ? sortDirection : 'desc'}
                                            SortIcon={SortIcon}
                                            onClick={() => {
                                                if (!headCell.sortable) {
                                                    return;
                                                }

                                                handleSortCellClick(cellId);
                                            }}
                                            padding={headCell.disablePadding ? 'none' : 'normal'}
                                            sortable={headCell.sortable}
                                            classes={cellClasses}
                                        >
                                            {renderHeadCellContent(headCell, headRow)}
                                        </TableCell>
                                    );
                                })
                            )}
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <TableBody data-testid="table-body">
                            <TableRow>
                                <TableCell
                                    colSpan={cellIdsArray.length}
                                    sx={{
                                        border: 'none',
                                        textAlign: 'center',
                                    }}
                                    className={classes?.loaderContainer ?? ''}
                                >
                                    <SpinnerComponent />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody data-testid="table-body">
                            {hasTableData
                                ? currentPageRows.map((row) => (
                                      <TableRow
                                          key={row.cells.id.value}
                                          data-testid={`table-body-row-${row.cells.id.value}`}
                                          hover
                                          tabIndex={-1}
                                          onClick={(e) => onRowClick?.(row, e)}
                                          className={
                                              selectedRowIdsState[row.cells.id.value] ? 'BaseTable__Row--selected' : ''
                                          }
                                      >
                                          {selectable && (
                                              <TableCell
                                                  key={row.cells.id.value}
                                                  classes={cellClasses}
                                                  data-testid="table-row-cell"
                                                  padding="checkbox"
                                              >
                                                  <RowSelector
                                                      selectionType={selectionType}
                                                      handleRowSelection={handleRowSelection}
                                                      renderCheckbox={renderCheckbox}
                                                      row={row}
                                                      selectedRowIdsState={selectedRowIdsState}
                                                  />
                                              </TableCell>
                                          )}

                                          {cellIdsArray.map(
                                              shouldRenderCell((cellId) =>
                                                  renderRowCell(row, row.cells[cellId], cellId)
                                              )
                                          )}
                                      </TableRow>
                                  ))
                                : renderSearchEmptyState?.()}
                        </TableBody>
                    )}
                    {currentPageRows.length > 0 && !loading ? renderPaginationComponent() : null}
                </MuiTable>
            </TableContainer>
        </div>
    );
};

export default BaseTable;
