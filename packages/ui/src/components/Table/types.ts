import { ChangeEvent, MouseEvent, ReactNode } from "react";
import { TableState } from "src/hooks/useTable/reducer";

export interface CellRendererArgs<T extends GenericRowStructure, U> {
	value: U;
	numeric?: boolean;
	disablePadding?: boolean;
	currentRow: Row<T> | HeadRow<T>;
	state: TableState<T>;
}

export interface GenericRowStructure extends Object {
	id: string;
}

export type CellId<T extends GenericRowStructure> = Extract<keyof T, string>;

export type ValueOf<T extends GenericRowStructure> = T[CellId<T>];

export interface Cell<T extends GenericRowStructure, U> {
	numeric?: boolean;
	disablePadding?: boolean;
	value: U;
	renderComponent?: (args: CellRendererArgs<T, U>) => ReactNode;
}
export type CellComparator<T extends GenericRowStructure, U> = (
	firstCell: Cell<T, U>,
	secondCell: Cell<T, U>
) => number;

export interface HeadRow<T extends GenericRowStructure> {
	id: string;
	cells: HeadRowCells<T>;
}
export type HeadRowCells<T extends GenericRowStructure> = {
	[K in CellId<T>]: HeadCell<T, T[K]>;
};

export interface HeadCell<T extends GenericRowStructure, U>
	extends Cell<T, string> {
	sortable?: boolean;
	comparator?: CellComparator<T, U>;
}

export interface Row<T extends GenericRowStructure> {
	cells: { [K in CellId<T>]: Cell<T, T[K]> };
}

export interface RowActionRendererArgs<T extends GenericRowStructure> {
	row: Row<T>;
	key: string;
}
export interface RowAction<T extends GenericRowStructure> {
	id: string;
	label?: string;
	renderComponent?: (args: RowActionRendererArgs<T>) => ReactNode;
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

export interface PaginationRendererArgs<T extends GenericRowStructure> {
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
