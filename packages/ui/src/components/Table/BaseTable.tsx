import { Table as MuiTable, TableBody, TableContainer, TableHead, TableRow, TextField, styled } from '@mui/material';
import { useMemo } from 'react';

import { HEAD_ROW_IDENTIFIER } from '../../hooks/useTable/useTable';
import Spinner from '../Spinner/Spinner';
import { TablePagination } from './TablePagination';
import EllipsisCellContent from './components/EllipsisCellContent';
import RowSelector, { HeadRowSelector } from './components/RowSelector';
import SearchEmptyState from './components/SearchEmptyState';
import TableCell from './components/TableCell';
import { BaseTableProps, CellId, GenericRowStructure, Row, RowCell } from './types';
import useTableLogic from './useTableLogic';

const FiltersRowContainer = styled('div')({
    padding: '1.5rem',
});

const BaseTable = <T extends GenericRowStructure>(props: BaseTableProps<T>) => {
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
        paginated,
        SortIcon,
        classes = {},
        onRowMenuOpen,
        onRowMenuClose,
        loading,
        SpinnerComponent = Spinner,
        tableContainerSxProps,
        onRowClick,
        onRowSelectionChange,
        onAllRowsSelectionChange,
    } = props;

    const {
        state: {
            currentPageRows,
            filteredRows,
            headRow,
            page,
            selectedRowsCount,
            rowsPerPage,
            searchValue,
            sortByColumnId,
            selectedRowIds,
            sortDirection,
        },
        handlers: {
            handleAllRowsSelection,
            handleChangePage,
            handleChangeSearchValue,
            handleRowSelection,
            handleRowsPerPageChange,
            handleSortCellClick,
            makeRowCellId,
            makeCellContentRenderer,
            makeHeadCellContentRenderer,
        },
    } = useTableLogic<T>({
        ...props,
        selectionType,
        onAllRowsSelectionChange,
        onRowSelectionChange,
        defaultRowsPerPage,
    });

    const hasTableData = Boolean(filteredRows.length);

    const { cell: cellClasses } = classes;

    const cellIdsArray = useMemo(() => Object.keys(headCells) as unknown as CellId<T>[], [headCells]);

    const renderRowCell = (row: Row<T>, cell: RowCell<T, T[CellId<T>]>, cellId: CellId<T>) => {
        const cellContent = makeCellContentRenderer(cell, row);
        const cellIndex = cellIdsArray.indexOf(cellId);
        const isLastCell = cellIndex === cellIdsArray.length - 1;
        const shouldRenderRowActions = rowActions.length > 0 && !row.disableActions;
        const key = makeRowCellId(row.cells.id.value, cellId);

        return (
            <TableCell
                key={key}
                data-testid={`table-row-cell-${cellId}`}
                isSticky={cell.isSticky}
                stickyPosition={cell.stickyPosition}
                sxProps={cell.sxProps}
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
            <TablePagination
                rowsPerPage={rowsPerPage ?? defaultRowsPerPage}
                currentPage={page}
                itemsCount={filteredRows.length}
                onChangePage={handleChangePage}
            />
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
            {makeSearchableRowContent || searchProps || renderTableActions ? (
                <FiltersRowContainer className={classes.headArea}>
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
                    <div className={classes.actionsContainer}>{renderTableActions?.(selectedRowIds)}</div>
                </FiltersRowContainer>
            ) : null}

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
                                            isSticky={headCell.isSticky}
                                            stickyPosition={headCell.stickyPosition}
                                            sxProps={headCell.sxProps}
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
                                            {makeHeadCellContentRenderer(headCell, headRow)}
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
                                    colSpan={cellIdsArray.length + 1}
                                    sxProps={{
                                        border: 'none',
                                        textAlign: 'center',
                                        borderBottom: 'none',
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
                                              selectedRowIds[row.cells.id.value] ? 'BaseTable__Row--selected' : ''
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
                                                      selectedRowIdsState={selectedRowIds}
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
