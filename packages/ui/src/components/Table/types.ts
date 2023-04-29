import { ChangeEvent, MouseEvent, ReactNode } from "react";
import { TableState } from "src/hooks/useTable/reducer";

interface CellRendererArgs<T extends GenericRowInfo, U> {
	value: U;
	numeric?: boolean;
	disablePadding?: boolean;
	currentRow: Row<T> | HeadRow<T>;
	state: TableState<T>;
}

export type GenericRowInfo = object;

export type CellId<T extends GenericRowInfo> = Extract<keyof T, string>;

export interface Cell<T extends GenericRowInfo, U> {
	numeric?: boolean;
	disablePadding?: boolean;
	value: U;
	renderComponent?: (args: CellRendererArgs<T, U>) => ReactNode;
}
export type CellComparator<T extends GenericRowInfo, U> = (
	firstCell: Cell<T, U>,
	secondCell: Cell<T, U>
) => number;

export interface HeadRow<T extends GenericRowInfo> {
	id: string;
	cells: HeadRowCells<T>;
}
export type HeadRowCells<T extends GenericRowInfo> = {
	[K in CellId<T>]: HeadCell<T>;
};

export interface HeadCell<T extends GenericRowInfo> extends Cell<T, string> {
	id: CellId<T>;
	sortable?: boolean;
	comparator?: CellComparator<T, T[CellId<T>]>;
}

export interface Row<T extends GenericRowInfo> {
	id: string;
	cells: { [K in CellId<T>]: Cell<T, T[K]> };
}

export interface RowAction<T extends GenericRowInfo> {
	id: string;
	label?: string;
	renderComponent?: () => ReactNode;
	labelClassName?: string;
	onClick?: (row: Row<T>) => void;
}

export type RowsPerPageChangeHandler = (
	event: ChangeEvent<HTMLInputElement>
) => void;

export type PageChangeHandler = (
	_e: MouseEvent<HTMLButtonElement> | null,
	newPage: number
) => void;

export interface PaginationRendererArgs<T extends GenericRowInfo> {
	page: number;
	defaultRowsPerPage: number;
	rows: Row<T>[];
	handleChangePage: PageChangeHandler;
	handleRowsPerPageChange: RowsPerPageChangeHandler;
}

export interface CheckboxRendererArgs {
	rowId?: string;
	checked?: boolean;
	indeterminate?: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface SearchInputRendererArgs {
	searchValue: string;
	handleChangeSearchValue: (value: string) => void;
}
