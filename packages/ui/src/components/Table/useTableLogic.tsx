import { SelectedRowIds, TableState } from 'src/hooks/useTable/reducer';
import useTable, { HEAD_ROW_IDENTIFIER } from 'src/hooks/useTable/useTable';

import {
    BaseTableProps,
    CellId,
    GenericRowStructure,
    HeadCell,
    HeadRow,
    HeadRowCells,
    Row,
    RowCell,
    ValueOf,
} from './types';

const renderCellContent =
    <T extends GenericRowStructure>(state: TableState<T>) =>
    (cell: RowCell<T, T[CellId<T>]>, row: Row<T>) => {
        if (cell.renderComponent) {
            return cell.renderComponent({
                ...cell,
                currentRow: row,
                state,
            });
        }

        if (typeof cell.value === 'string') {
            return cell.value;
        }

        throw new Error('Cannot render non-string cell content without a custom renderer');
    };
const renderHeadCellContent =
    <T extends GenericRowStructure>(state: TableState<T>) =>
    (cell: HeadCell<T, ValueOf<T>>, row: HeadRow<T>) => {
        if (cell.renderComponent) {
            return cell.renderComponent({
                ...cell,
                currentRow: row,
                state,
            });
        }

        return cell.value;
    };

const makeRowCellId = <T extends GenericRowStructure>(rowId: string, cellId: CellId<T>) => `${rowId}-${String(cellId)}`;
const getSelectedRowsCount = (selectedRowIds: SelectedRowIds) =>
    Object.values(selectedRowIds).filter((selected) => selected).length;

const getHeadRow = <T extends GenericRowStructure>(headCells: HeadRowCells<T>) =>
    ({
        id: HEAD_ROW_IDENTIFIER,
        cells: headCells,
    } as HeadRow<T>);

const useTableLogic = <T extends GenericRowStructure>({
    headCells,
    rows,
    currentPage,
    defaultRowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortCellClick,
    onAllRowsSelectionChange,
    onRowSelectionChange,
    rowsPerPage,
    searchProps,
    selectedRowIds,
    selectionType,
    makeSearchableRowContent,
    sortColumn,
    sortDirection,
}: BaseTableProps<T>) => {
    const {
        currentPageRows: internalCurrentPageRows,
        handleRowsPerPageChange: internalHandleRowsPerPageChange,
        handleSortCellClick: internalHandleSortCellClick,
        filteredRows: internalFilteredRows,
        handleChangePage: internalHandleChangePage,
        handleChangeSearchValue: internalHandleChangeSearchValue,
        handleRowSelection: internalHandleRowSelection,
        handleAllRowsSelection: internalHandleAllRowsSelection,
        state: {
            selectedRowIds: internalSelectedRowIds,
            rowsPerPage: internalRowsPerPage,
            sortByColumnId: internalSortColumn,
            searchValue: internalSearchValue,
            sortDirection: internalSortDirection,
        },
        page: internalPage,
    } = useTable<T>({
        makeSearchableRowContent,
        headCells,
        rows,
        selectionType,
        onAllRowsSelectionChange,
        onRowSelectionChange,
        defaultRowsPerPage,
        searchProps,
    });

    const tableState = {
        selectedRowIds: selectedRowIds ?? internalSelectedRowIds,
        page: currentPage ?? internalPage,
        rowsPerPage: rowsPerPage ?? internalRowsPerPage,
        sortByColumnId: sortColumn ?? internalSortColumn,
        searchValue: searchProps?.value ?? internalSearchValue,
        sortDirection: sortDirection ?? internalSortDirection,
        currentPageRows: handleSortCellClick ? rows : internalCurrentPageRows,
        filteredRows: handleSortCellClick ? rows : internalFilteredRows,
        selectedRowsCount: getSelectedRowsCount(selectedRowIds ?? internalSelectedRowIds),
        headRow: getHeadRow(headCells),
    };

    const tableHandlers = {
        handleChangeSearchValue: searchProps?.onChange ?? internalHandleChangeSearchValue,
        handleSortCellClick: handleSortCellClick ?? internalHandleSortCellClick,
        handleRowsPerPageChange: handleRowsPerPageChange ?? internalHandleRowsPerPageChange,
        handleChangePage: handlePageChange ?? internalHandleChangePage,
        handleRowSelection: onRowSelectionChange ?? internalHandleRowSelection,
        handleAllRowsSelection: onAllRowsSelectionChange ?? internalHandleAllRowsSelection,
        // handled for both internal and external use cases
        renderCellContent: renderCellContent(tableState),
        renderHeadCellContent: renderHeadCellContent(tableState),
        makeRowCellId,
    };

    return {
        state: tableState,
        handlers: tableHandlers,
    };
};

export default useTableLogic;
