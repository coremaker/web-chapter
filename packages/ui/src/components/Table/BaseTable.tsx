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
} from '@mui/material';
import { JSXElementConstructor, ReactNode } from 'react';

import { SelectedRowIds } from '../../hooks/useTable/reducer';
import useTable, { HEAD_ROW_IDENTIFIER } from '../../hooks/useTable/useTable';
import EllipsisCellContent, { EllipsisCellContentClasses } from './components/EllipsisCellContent';
import SearchEmptyState from './components/SearchEmptyState';
import TableCell, { TableCellClasses } from './components/TableCell';
import {
    Cell,
    CellId,
    CheckboxRendererArgs,
    GenericRowStructure,
    HeadRowCells,
    PaginationRendererArgs,
    Row,
    RowAction,
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
}

export interface BaseTableProps<T extends GenericRowStructure> {
    showIdCell?: boolean;
    makeSearchableRowContent?: (row: Row<T>) => string;
    searchInputPlaceholder?: string;
    selectable?: boolean;
    renderSearchEmptyState?: () => ReactNode;
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

const BaseTable = <T extends GenericRowStructure>({
    onRowSelectionChange,
    onAllRowsSelectionChange,
    ...props
}: BaseTableProps<T>) => {
    const {
        headCells,
        rows,
        selectable,
        makeSearchableRowContent,
        searchInputPlaceholder = 'Search',
        showIdCell,
        rowActions = [],
        ellipsisIcon,
        renderTableActions,
        renderTablePagination,
        renderSearchInput,
        renderCheckbox,
        renderSearchEmptyState = () => <SearchEmptyState />,
        defaultRowsPerPage = 10,
        paginated,
        SortIcon,
        classes = {},
        onRowMenuOpen,
        onRowMenuClose,
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
        cellIdsArray,
    } = useTable<T>({ ...props, onAllRowsSelectionChange, onRowSelectionChange });

    const { searchValue, sortByColumnId, sortDirection, page } = state;
    const hasTableData = Boolean(currentPageRows.length);

    const { cell: cellClasses } = classes;

    const selectedRowIdsState = props.selectedRowIds ? props.selectedRowIds : state.selectedRowIds;

    const renderRowCell = (row: Row<T>, cell: Cell<T, T[CellId<T>]>, cellId: CellId<T>) => {
        const cellContent = renderCellContent(cell, row);

        const cellIndex = cellIdsArray.indexOf(cellId);
        const isLastCell = cellIndex === cellIdsArray.length - 1;
        const rowActionsPresent = rowActions.length > 0;
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
                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                        count={filteredRows.length}
                        rowsPerPage={defaultRowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </TableRow>
            </TableFooter>
        );
    };

    const decideCellRender = (render: (cellId: CellId<T>) => JSX.Element) => (cellId: CellId<T>) =>
        cellId !== 'id' || showIdCell ? render(cellId) : null;

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
                <div className={classes.actionsContainer}>{renderTableActions?.(selectedRowIdsState)}</div>
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
                                            indeterminate: selectedRowsCount > 0 && selectedRowsCount < rows.length,
                                        })
                                    ) : (
                                        <Checkbox
                                            onChange={handleAllRowsSelection}
                                            checked={selectedRowsCount === rows.length}
                                            indeterminate={selectedRowsCount > 0 && selectedRowsCount < rows.length}
                                            inputProps={{
                                                'aria-label': 'select all rows',
                                            }}
                                        />
                                    )}
                                </TableCell>
                            )}

                            {cellIdsArray.map(
                                decideCellRender((cellId) => {
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
                                                console.log('clicked sort on cell id' + cellId);

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
                    <TableBody data-testid="table-body">
                        {hasTableData
                            ? currentPageRows.map((row) => (
                                  <TableRow
                                      key={row.cells.id.value}
                                      data-testid={`table-body-row-${row.cells.id.value}`}
                                      hover
                                      tabIndex={-1}
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
                                              {renderCheckbox ? (
                                                  renderCheckbox({
                                                      rowId: row.cells.id.value,
                                                      checked: !!selectedRowIdsState[row.cells.id.value],
                                                      onChange: (e) =>
                                                          handleRowSelection(row.cells.id.value, e.target.checked),
                                                  })
                                              ) : (
                                                  <Checkbox
                                                      onChange={(e) =>
                                                          handleRowSelection(row.cells.id.value, e.target.checked)
                                                      }
                                                      checked={!!selectedRowIdsState[row.cells.id.value]}
                                                      inputProps={{
                                                          'aria-label': `select row ${row.cells.id.value}`,
                                                      }}
                                                  />
                                              )}
                                          </TableCell>
                                      )}

                                      {cellIdsArray.map(
                                          decideCellRender((cellId) => renderRowCell(row, row.cells[cellId], cellId))
                                      )}
                                  </TableRow>
                              ))
                            : renderSearchEmptyState?.()}
                    </TableBody>
                    {hasTableData && renderPaginationComponent()}
                </MuiTable>
            </TableContainer>
        </div>
    );
};

export default BaseTable;
