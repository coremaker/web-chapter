import { ChangeEvent, ReactNode } from "react";

export interface Cell {
	numeric?: boolean;
	disablePadding?: boolean;
	label: string;
	renderComponent?: (value: string) => ReactNode;
}
export type CellComparator = (firstCell: string, secondCell: string) => number;

export interface HeadCell extends Cell {
	id: string;
	sortable?: boolean;
	comparator?: CellComparator;
}

export interface Row {
	id: string;
	cells: Cell[];
}

export interface RowAction {
	label?: string;
	renderComponent?: (value: string) => ReactNode;
	labelClassName?: string;
	onClick: (row: Row) => void;
}

export type RowsPerPageChangeHandler = (
	event: React.ChangeEvent<HTMLInputElement>
) => void;
export type PageChangeHandler = (
	_e: React.MouseEvent<HTMLButtonElement> | null,
	newPage: number
) => void;

export interface PaginationRendererArgs {
	page: number;
	defaultRowsPerPage: number;
	rows: Row[];
	handleChangePage: PageChangeHandler;
	handleRowsPerPageChange: RowsPerPageChangeHandler;
}

export interface CheckboxRendererArgs {
	rowId?: string;
	checked?: boolean;
	onChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => void;
}

export interface SearchInputRendererArgs {
	searchValue: string;
	handleChangeSearchValue: (e: ChangeEvent<HTMLInputElement>) => void;
}
