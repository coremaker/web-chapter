import { CircularProgressProps, SortDirection, SxProps } from '@mui/material';
import { ChangeEvent, JSXElementConstructor, MouseEvent, ReactNode } from 'react';
import { SelectedRowIds } from '../../hooks/useTable/reducer';
import { EllipsisCellContentClasses } from './components/EllipsisCellContent';
import { TableCellClasses } from './components/TableCell';
import { CellId, CheckboxRendererArgs, GenericRowStructure, HeadRowCells, PaginationRendererArgs, Row, RowAction, SearchInputRendererArgs } from './types';
interface BaseTableFooterClasses {
    root: string;
    cell: string;
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
    renderSearchEmptyState?: () => ReactNode;
    /**
     * This prop changes the selected rows state from uncontrolled to controlled
     */
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
    currentPage?: number;
    sortColumn?: CellId<T> | null;
    sortDirection?: SortDirection;
    renderTableActions?: (selectedRows: SelectedRowIds) => ReactNode;
    renderTablePagination?: (args: PaginationRendererArgs<T>) => ReactNode;
    renderSearchInput?: (args: SearchInputRendererArgs) => ReactNode;
    renderCheckbox?: (args: CheckboxRendererArgs) => ReactNode;
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
declare const BaseTable: <T extends GenericRowStructure>({ onRowSelectionChange, onAllRowsSelectionChange, ...props }: BaseTableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default BaseTable;
