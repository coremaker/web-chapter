import { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { TableState } from 'src/hooks/useTable/reducer';

export interface AbstractCellRendererArgs<T extends GenericRowStructure, U> {
    value: U;
    disablePadding?: boolean;
    state: TableState<T>;
}

export interface RowCellRendererArgs<T extends GenericRowStructure, U> extends AbstractCellRendererArgs<T, U> {
    currentRow: Row<T>;
}

export interface HeadCellRendererArgs<T extends GenericRowStructure, U> extends AbstractCellRendererArgs<T, U> {
    currentRow: HeadRow<T>;
}

export interface GenericRowStructure extends NonNullable<unknown> {
    id: string;
}

export type CellId<T extends GenericRowStructure> = Extract<keyof T, string>;

export type ValueOf<T extends GenericRowStructure> = T[CellId<T>];

export interface Cell<U> {
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    disablePadding?: boolean;
    value: U;
}
export interface RowCell<T extends GenericRowStructure, U> extends Cell<U> {
    renderComponent?: (args: RowCellRendererArgs<T, U>) => ReactNode;
}

export type CellComparator<U> = (firstCell: Cell<U>, secondCell: Cell<U>) => number;

export interface HeadRow<T extends GenericRowStructure> {
    id: string;
    cells: HeadRowCells<T>;
}
export type HeadRowCells<T extends GenericRowStructure> = {
    [K in CellId<T>]: HeadCell<T, T[K]>;
};

export interface HeadCell<T extends GenericRowStructure, U> extends Cell<string> {
    sortable?: boolean;
    comparator?: CellComparator<U>;
    renderComponent?: (args: HeadCellRendererArgs<T, string>) => ReactNode;
}

export interface Row<T extends GenericRowStructure> {
    disableActions?: boolean;
    cells: { [K in CellId<T>]: RowCell<T, T[K]> };
}

export interface RowActionRendererArgs<T extends GenericRowStructure> {
    row: Row<T>;
    key: string;
    options: { closeMenu: () => void };
}
export interface RowAction<T extends GenericRowStructure> {
    id: string;
    label?: string;
    renderComponent?: (args: RowActionRendererArgs<T>) => ReactNode;
    labelClassName?: string;
    onClick?: (
        row: Row<T>,
        e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
        options: { closeMenu: () => void }
    ) => void;
    disabled?: (row: Row<T>) => boolean;
}

export type RowsPerPageChangeHandler = (value: number) => void;

export type PageChangeHandler = (_e: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;

export interface PaginationRendererArgs<T extends GenericRowStructure> {
    page: number;
    defaultRowsPerPage: number;
    rowsPerPage: number;
    rows: Row<T>[];
    handleChangePage?: PageChangeHandler;
    handleRowsPerPageChange?: RowsPerPageChangeHandler;
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
