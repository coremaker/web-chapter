import {
	ChangeEvent,
	MouseEvent,
	useCallback,
	useMemo,
	useReducer,
} from "react";
import { BaseTableProps } from "../../components/Table/BaseTable";
import {
	Cell,
	CellComparator,
	CellId,
	GenericRowStructure,
	HeadCell,
	HeadRow,
	Row,
	ValueOf,
} from "../../components/Table/types";
import { TableState, reducer } from "./reducer";
import { getTablePropsWithDefaults } from "./utils";
import { SortDirection } from "@mui/material";

export const INTERNAL_ID_CELL_IDENTIFIER = "__id";
export const HEAD_ROW_IDENTIFIER = "__head";

const compareAlphabetically = (
	firstCell: Cell<any, string>,
	secondCell: Cell<any, string>
) => firstCell.value.localeCompare(secondCell.value);

const makeSortRowByIdComparator =
	<T extends GenericRowStructure>(
		sortDirection: SortDirection,
		customComparator?: CellComparator<T, T[CellId<T>]>
	) =>
	(firstRow: Row<T>, secondRow: Row<T>) => {
		const comparator = customComparator ?? compareAlphabetically;

		return compare(
			comparator,
			{ value: firstRow.id },
			{ value: secondRow.id },
			sortDirection
		);
	};

const compare = (
	comparator: CellComparator<any, any>,
	firstCell: Cell<any, any>,
	secondCell: Cell<any, any>,
	sortDirection: SortDirection
) => {
	if (sortDirection === "asc") {
		return comparator(firstCell, secondCell);
	}
	return comparator(secondCell, firstCell);
};
const makeSortRowByCellComparator =
	<T extends GenericRowStructure>(
		sortDirection: SortDirection,
		sortByCellId: CellId<T>,
		customComparator?: CellComparator<T, T[CellId<T>]>
	) =>
	(firstRow: Row<T>, secondRow: Row<T>) => {
		const firstCell = firstRow.cells[sortByCellId];
		const secondCell = secondRow.cells[sortByCellId];

		if (customComparator) {
			return compare(customComparator, firstCell, secondCell, sortDirection);
		}

		if (typeof firstCell.value === "string") {
			return compare(
				compareAlphabetically,
				firstCell,
				secondCell,
				sortDirection
			);
		}

		throw Error(
			"Cannot sort non-string cell values without a custom comparator"
		);
	};

export default function useTable<T extends GenericRowStructure>(
	props: BaseTableProps<T>
) {
	const {
		defaultRowsPerPage,
		headCells,
		makeSearchableRowContent,
		rows,
		headIdCell,
		paginated,
		onAllRowsSelectionChange,
		onRowSelectionChange,
		selectedRowIds,
	} = getTablePropsWithDefaults<T>(props);

	const [state, dispatch] = useReducer(reducer<T>, {
		selectedRowIds: {},
		page: 0,
		rowsPerPage: defaultRowsPerPage,
		sortByColumnId: null,
		searchValue: "",
		sortDirection: "asc",
	});

	const isSelectionControlled = !!selectedRowIds;

	const selectedRowIdsState = isSelectionControlled
		? selectedRowIds
		: state.selectedRowIds;

	const selectedRowsCount = useMemo(
		() =>
			Object.values(selectedRowIdsState).filter((selected) => selected).length,
		[selectedRowIdsState]
	);

	const headRow: HeadRow<T> = useMemo(
		() => ({
			id: INTERNAL_ID_CELL_IDENTIFIER,
			cells: headCells,
		}),
		[headCells]
	);

	const cellIdsArray = useMemo(
		() => Object.keys(headCells) as unknown as CellId<T>[],
		[headIdCell]
	);

	const updateState = useCallback(
		(updates: Partial<TableState<T>>) => {
			dispatch({ type: "update", payload: updates });
		},
		[dispatch]
	);

	const makeRowCellId = (rowId: string, cellId: CellId<T>) => {
		return `${rowId}-${String(cellId)}`;
	};

	const renderCellContent = (cell: Cell<T, any>, row: Row<T>) => {
		if (cell.renderComponent) {
			return cell.renderComponent({
				...cell,
				currentRow: row,
				state,
			});
		}

		if (typeof cell.value === "string") {
			return cell.value;
		}

		throw new Error(
			"Cannot render non-string cell content without a custom renderer"
		);
	};

	const renderHeadCellContent = (
		cell: Omit<HeadCell<T, ValueOf<T>>, "id">,
		row: HeadRow<T>
	) => {
		if (cell.renderComponent) {
			return cell.renderComponent({
				...cell,
				currentRow: row,
				state,
			});
		}

		return cell.value;
	};

	const handleChangePage = (
		_e: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		updateState({ page: newPage });
	};

	const handleChangeSearchValue = (searchValue: string) =>
		updateState({ searchValue });

	const handleRowSelection = (rowId: string, selected: boolean) => {
		if (!isSelectionControlled) {
			updateState({ selectedRowIds: { [rowId]: selected } });
		}
		onRowSelectionChange?.(rowId, selected);
	};

	const handleAllRowsSelection = () => {
		const shouldSelectAll = selectedRowsCount === 0 ? true : false;

		if (!isSelectionControlled) {
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
		}

		onAllRowsSelectionChange?.(shouldSelectAll);
	};

	const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const updatedRowsPerPage = parseInt(event.target.value, 10);
		updateState({ rowsPerPage: updatedRowsPerPage, page: 0 });
	};

	const handleSortCellClick = (cellId: CellId<T> | "__id") => {
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
		(rowsToSort: Row<T>[]) => {
			if (!state.sortByColumnId) {
				return rowsToSort;
			}

			if (state.sortByColumnId === INTERNAL_ID_CELL_IDENTIFIER) {
				return rowsToSort.sort(
					makeSortRowByIdComparator(state.sortDirection, headIdCell?.comparator)
				);
			}

			const customComparator = headCells[state.sortByColumnId].comparator;

			return rowsToSort.sort(
				makeSortRowByCellComparator(
					state.sortDirection,
					state.sortByColumnId,
					customComparator
				)
			);
		},
		[state.sortByColumnId, state.sortDirection, headCells, headIdCell]
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
		renderHeadCellContent,
		makeRowCellId,
		state,
		selectedRowsCount,
		updateState,
		headRow,
		cellIdsArray,
	};
}
