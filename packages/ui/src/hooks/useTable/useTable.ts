import { ChangeEvent, useCallback, useMemo, useReducer } from "react";
import { BaseTableProps } from "../../components/Table/BaseTable";
import { Cell, CellComparator, Row } from "../../components/Table/types";
import { TableState, reducer } from "./reducer";
import { getTablePropsWithDefaults } from "./utils";
import { SortDirection } from "@mui/material";

const compareAlphabetically = (firstCell: string, secondCell: string) =>
	firstCell.localeCompare(secondCell);

const makeSortRowByIdComparator =
	(sortDirection: SortDirection, customComparator?: CellComparator) =>
	(firstRow: Row, secondRow: Row) => {
		const comparator = customComparator ?? compareAlphabetically;

		if (sortDirection === "asc") {
			return comparator(firstRow.id, secondRow.id);
		}
		return comparator(secondRow.id, firstRow.id);
	};

const makeSortRowByCellComparator =
	(
		sortDirection: SortDirection,
		sortByCellIndex: number,
		customComparator?: CellComparator
	) =>
	(firstRow: Row, secondRow: Row) => {
		const firstCell = firstRow.cells[sortByCellIndex];
		const secondCell = secondRow.cells[sortByCellIndex];

		const comparator = customComparator ?? compareAlphabetically;

		if (sortDirection === "asc") {
			return comparator(firstCell.label, secondCell.label);
		}
		return comparator(secondCell.label, firstCell.label);
	};

export default function useTable(props: BaseTableProps) {
	const {
		defaultRowsPerPage,
		headCells,
		makeSearchableRowContent,
		rows,
		headIdCell,
		paginated,
		onAllRowsSelectionChange,
		onRowSelectionChange,
	} = getTablePropsWithDefaults(props);

	const [state, dispatch] = useReducer(reducer, {
		selectedRowIds: {},
		page: 0,
		rowsPerPage: defaultRowsPerPage,
		sortByColumnId: null,
		searchValue: "",
		sortDirection: "asc",
	});

	const selectedRowsCount = useMemo(
		() =>
			Object.values(state.selectedRowIds).filter((selected) => selected).length,
		[state.selectedRowIds]
	);

	const updateState = useCallback(
		(updates: Partial<TableState>) => {
			dispatch({ type: "update", payload: updates });
		},
		[dispatch]
	);

	const makeRowCellId = (rowId: string, rowCellIndex: number) => {
		return `${rowId}-${headCells[rowCellIndex].id}`;
	};

	const renderCellContent = (cell: Cell) =>
		cell.renderComponent ? cell.renderComponent(cell.label) : cell.label;

	const handleChangePage = (
		_e: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		updateState({ page: newPage });
	};

	const handleChangeSearchValue = (searchValue: string) =>
		updateState({ searchValue });

	const handleRowSelection = (rowId: string, selected: boolean) => {
		updateState({ selectedRowIds: { [rowId]: selected } });
		onRowSelectionChange?.(rowId, selected);
	};

	const handleAllRowsSelection = () => {
		const shouldSelectAll = selectedRowsCount === 0 ? true : false;
		const updatedSelectedRows = rows
			.map((row) => row.id)
			.reduce(
				(acc: Record<string, boolean>, currentRowId: string) => ({
					...acc,
					[currentRowId]: shouldSelectAll,
				}),
				{}
			);
		updateState({ selectedRowIds: updatedSelectedRows });
		onAllRowsSelectionChange?.(shouldSelectAll);
	};
	const handleRowsPerPageChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const updatedRowsPerPage = parseInt(event.target.value, 10);
		updateState({ rowsPerPage: updatedRowsPerPage, page: 0 });
	};

	const handleSortCellClick = (cellId: string) => {
		if (state.sortByColumnId === cellId) {
			updateState({
				sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
			});
		} else {
			updateState({ sortByColumnId: cellId, sortDirection: "asc" });
		}
	};

	const applyFiltering = useCallback(() => {
		if (!makeSearchableRowContent) {
			return rows;
		}
		return rows.filter((row) => {
			return makeSearchableRowContent(row)
				.toLowerCase()
				.includes(state.searchValue.toLowerCase());
		});
	}, [makeSearchableRowContent, rows, state.searchValue]);

	const applySorting = useCallback(
		(rowsToSort: Row[]) => {
			if (!state.sortByColumnId) {
				return rowsToSort;
			}

			if (state.sortByColumnId === "__id") {
				return rowsToSort.sort(
					makeSortRowByIdComparator(state.sortDirection, headIdCell?.comparator)
				);
			}

			const sortByCellIndex = headCells.findIndex(
				(cell) => cell.id === state.sortByColumnId
			);
			const customComparator = headCells[sortByCellIndex].comparator;

			if (!sortByCellIndex) {
				return rowsToSort;
			}

			return rowsToSort.sort(
				makeSortRowByCellComparator(
					state.sortDirection,
					sortByCellIndex,
					customComparator
				)
			);
		},
		[state.sortByColumnId, state.sortDirection, headCells, headIdCell]
	);
	const applyPageSplitting = useCallback(
		(rowsToSplit: Row[]) => {
			if (!paginated) {
				return rowsToSplit;
			}
			const currentPageRows = rowsToSplit.slice(
				state.page * state.rowsPerPage,
				(state.page + 1) * state.rowsPerPage
			);
			return currentPageRows;
		},
		[state.rowsPerPage, state.page]
	);

	const filteredRows = useMemo(() => {
		return applyFiltering();
	}, [applyFiltering]);

	const currentPageRows = useMemo(() => {
		const slicedRows = applyPageSplitting(filteredRows);
		return applySorting(slicedRows);
	}, [filteredRows, applySorting, applyPageSplitting]);

	return {
		currentPageRows,
		filteredRows,
		handleSortCellClick,
		handleRowsPerPageChange,
		handleChangePage,
		handleChangeSearchValue,
		handleRowSelection,
		handleAllRowsSelection,
		renderCellContent,
		makeRowCellId,
		state,
		selectedRowsCount,
		updateState,
	};
}
