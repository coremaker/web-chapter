import { CircularProgressProps, MenuClasses, SortDirection, SxProps } from '@mui/material';
import { ChangeEvent, JSXElementConstructor, MouseEvent, ReactNode } from 'react';
import { SelectedRowIds, TableState } from 'src/hooks/useTable/reducer';

import { TableCellClasses } from './components/TableCell';

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
    isSticky?: boolean;
    stickyPosition?: StickyRowPosition;
    sxProps?: SxProps;
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
    isSticky?: boolean;
    stickyPosition?: StickyRowPosition;
    sxProps?: SxProps;
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
}

export type StickyRowPosition = 'left' | 'right';

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

interface BaseTableFooterClasses {
    root: string;
    cell: string;
}

export interface EllipsisCellContentClasses {
    root: string;
    menu: Partial<MenuClasses>;
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
    loaderContainer: string;
}

export interface BaseTableProps<T extends GenericRowStructure> {
    showIdCell?: boolean;
    makeSearchableRowContent?: (row: Row<T>) => string;
    searchInputPlaceholder?: string;
    selectable?: boolean;
    selectionType?: 'single' | 'multiple';
    renderSearchEmptyState?: () => ReactNode;
    searchProps?: {
        value: string;
        onChange: (value: string) => void;
    };
    totalPages?: number;
    selectedRowIds?: SelectedRowIds;
    headCells: HeadRowCells<T>;
    rows: Row<T>[];
    rowActions?: RowAction<T>[];
    ellipsisIcon?: ReactNode;
    rowsPerPageOptions?: number[];
    rowsPerPage?: number;
    currentPage?: number;
    sortColumn?: CellId<T> | null;
    sortDirection?: SortDirection;
    renderTableActions?: (selectedRows: SelectedRowIds) => ReactNode;
    renderTablePagination?: (args: PaginationRendererArgs<T>) => ReactNode;
    renderSearchInput?: (args: SearchInputRendererArgs) => ReactNode;
    renderCheckbox?: (args: CheckboxRendererArgs) => JSX.Element;
    onRowSelectionChange?: (rowId: string, selected: boolean) => void;
    onAllRowsSelectionChange?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    onRowMenuOpen?: (row: Row<T>) => void;
    onRowMenuClose?: (row: Row<T>) => void;
    defaultRowsPerPage?: number;
    paginated?: boolean;
    SortIcon?: JSXElementConstructor<{
        className: string;
    }>;
    classes?: Partial<BaseTableClasses>;
    loading?: boolean;
    SpinnerComponent?: JSXElementConstructor<CircularProgressProps>;
    handleRowsPerPageChange?: (value: number) => void;
    handlePageChange?: (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleSortCellClick?: (cellId: CellId<T>) => void;
    tableContainerSxProps?: SxProps;
    onRowClick?: (row: Row<T>, e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => void;
}
