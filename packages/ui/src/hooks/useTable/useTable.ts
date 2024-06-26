import { SortDirection } from '@mui/material';
import { MouseEvent, useCallback, useMemo, useReducer } from 'react';

import {
    BaseTableProps,
    Cell,
    CellComparator,
    CellId,
    GenericRowStructure,
    HeadCell,
    HeadRow,
    Row,
    RowCell,
    ValueOf,
} from '../../components/Table/types';
import { TableState, reducer } from './reducer';

export const HEAD_ROW_IDENTIFIER = '__head';

const compareAlphabetically = (firstCell: Cell<string>, secondCell: Cell<string>) =>
    firstCell.value.localeCompare(secondCell.value);

const compare = <T>(
    comparator: CellComparator<T>,
    firstCell: Cell<T>,
    secondCell: Cell<T>,
    sortDirection: SortDirection
) => {
    if (sortDirection === 'asc') {
        return comparator(firstCell, secondCell);
    }
    return comparator(secondCell, firstCell);
};

const makeSortRowByIdComparator =
    <T extends GenericRowStructure>(sortDirection: SortDirection, customComparator?: CellComparator<T['id']>) =>
    (firstRow: Row<T>, secondRow: Row<T>) => {
        const comparator = customComparator ?? compareAlphabetically;

        return compare(
            comparator,
            { value: firstRow.cells.id.value },
            { value: secondRow.cells.id.value },
            sortDirection
        );
    };

const makeSortRowByCellComparator =
    <T extends GenericRowStructure>(
        sortDirection: SortDirection,
        sortByCellId: CellId<T>,
        customComparator?: CellComparator<T[CellId<T>]>
    ) =>
    (firstRow: Row<T>, secondRow: Row<T>) => {
        const firstCell = firstRow.cells[sortByCellId];
        const secondCell = secondRow.cells[sortByCellId];

        if (customComparator) {
            return compare(customComparator, firstCell, secondCell, sortDirection);
        }

        if (typeof firstCell.value === 'string') {
            return compare(compareAlphabetically, firstCell as Cell<string>, secondCell as Cell<string>, sortDirection);
        }

        throw Error('Cannot sort non-string cell values without a custom comparator');
    };

export default function useTable<T extends GenericRowStructure>({
    headCells,
    makeSearchableRowContent,
    rows,
    paginated,
    sortDirection = 'asc',
    sortColumn,
    selectionType,
    defaultRowsPerPage = 10,
}: BaseTableProps<T>) {
    const [state, dispatch] = useReducer(reducer<T>, {
        selectedRowIds: {},
        page: 0,
        rowsPerPage: defaultRowsPerPage,
        sortByColumnId: sortColumn,
        searchValue: '',
        sortDirection,
    });

    const selectedRowsCount = useMemo(
        () => Object.values(state.selectedRowIds).filter((selected) => selected).length,
        [state.selectedRowIds]
    );

    const headRow: HeadRow<T> = useMemo(
        () => ({
            id: HEAD_ROW_IDENTIFIER,
            cells: headCells,
        }),
        [headCells]
    );

    const updateState = useCallback(
        (updates: Partial<TableState<T>>) => {
            dispatch({ type: 'update', payload: updates });
        },
        [dispatch]
    );

    const makeRowCellId = (rowId: string, cellId: CellId<T>) => `${rowId}-${String(cellId)}`;

    const renderCellContent = (cell: RowCell<T, T[CellId<T>]>, row: Row<T>) => {
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

    const renderHeadCellContent = (cell: HeadCell<T, ValueOf<T>>, row: HeadRow<T>) => {
        if (cell.renderComponent) {
            return cell.renderComponent({
                ...cell,
                currentRow: row,
                state,
            });
        }

        return cell.value;
    };

    const handleChangePageInternal = (_e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        updateState({ page: newPage });
    };

    const handleChangeSearchValue = (searchValue: string) => updateState({ searchValue, page: 0 });

    const handleRowSelectionInternal = (rowId: string, selected: boolean) => {
        if (selectionType === 'single') {
            const currentRowSelectedRows = rows
                .map((row) => row.cells.id.value)
                .reduce(
                    (acc: Record<string, boolean>, currentRowId: string) => ({
                        ...acc,
                        [currentRowId]: currentRowId === rowId,
                    }),
                    {}
                );
            updateState({ selectedRowIds: currentRowSelectedRows });
            return;
        }
        updateState({ selectedRowIds: { [rowId]: selected } });
    };

    const handleAllRowsSelectionInternal = () => {
        const shouldSelectAll = selectedRowsCount === 0;

        const updatedSelectedRows = rows
            .map((row) => row.cells.id.value)
            .reduce(
                (acc: Record<string, boolean>, currentRowId: string) => ({
                    ...acc,
                    [currentRowId]: shouldSelectAll,
                }),
                {}
            );
        updateState({ selectedRowIds: updatedSelectedRows });
    };

    const handleRowsPerPageChangeInternal = (value: number) => {
        updateState({ rowsPerPage: value, page: 0 });
    };

    const handleSortCellClickInternal = (cellId: CellId<T>) => {
        if (state.sortByColumnId === cellId) {
            const direction = state.sortDirection === 'asc' ? 'desc' : 'asc';
            updateState({ sortDirection: direction });
        } else {
            updateState({ sortByColumnId: cellId, sortDirection: 'asc' });
        }
    };

    const applyFiltering = useCallback(() => {
        if (!makeSearchableRowContent) {
            return rows;
        }
        return rows.filter((row) =>
            makeSearchableRowContent(row).toLowerCase().includes(state.searchValue.toLowerCase().trim())
        );
    }, [makeSearchableRowContent, rows, state.searchValue]);

    const applySorting = useCallback(
        (rowsToSort: Row<T>[]) => {
            if (!state.sortByColumnId) {
                return rowsToSort;
            }

            if (state.sortByColumnId === 'id') {
                return rowsToSort.sort(makeSortRowByIdComparator(state.sortDirection, headCells.id.comparator));
            }

            const customComparator = headCells[state.sortByColumnId].comparator;

            return rowsToSort.sort(
                makeSortRowByCellComparator(state.sortDirection, state.sortByColumnId, customComparator)
            );
        },
        [state.sortByColumnId, state.sortDirection, headCells]
    );
    const applyPageSplitting = useCallback(
        (rowsToSplit: Row<T>[]) => {
            if (!paginated) {
                return rowsToSplit;
            }
            const currentPageRows = rowsToSplit.slice(
                state.page * state.rowsPerPage,
                (state.page + 1) * state.rowsPerPage
            );
            return currentPageRows;
        },
        [paginated, state.page, state.rowsPerPage]
    );

    const filteredRows = useMemo(() => applyFiltering(), [applyFiltering]);

    const currentPageRows = useMemo(() => {
        const sortedRows = applySorting(filteredRows);
        return applyPageSplitting(sortedRows);
    }, [filteredRows, applySorting, applyPageSplitting]);

    return {
        currentPageRows,
        filteredRows,
        handleChangeSearchValue,

        handleSortCellClick: handleSortCellClickInternal,

        handleRowsPerPageChange: handleRowsPerPageChangeInternal,
        handleChangePage: handleChangePageInternal,
        page: state.page,

        handleRowSelection: handleRowSelectionInternal,
        handleAllRowsSelection: handleAllRowsSelectionInternal,
        selectedRowsCount,
        selectedRowIds: state.selectedRowIds,
        renderCellContent,
        renderHeadCellContent,
        makeRowCellId,
        state,
        updateState,
        headRow,
    };
}
