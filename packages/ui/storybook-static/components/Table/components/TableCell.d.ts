import { TableCellProps as MuiTableCellProps, SortDirection, SxProps } from '@mui/material';
import { JSXElementConstructor } from 'react';
export type TableCellClasses = {
    bodyCell?: string;
    headCell?: string;
    sortLabel?: {
        root?: string;
        active?: string;
        icon?: string;
    };
};
interface TableCellProps extends Omit<MuiTableCellProps, 'classes'> {
    isHeadCell?: boolean;
    isSticky?: boolean;
    stickyPosition?: 'left' | 'right';
    sxProps?: SxProps;
    sortable?: boolean;
    sortDirection?: SortDirection;
    cellId?: string;
    active?: boolean;
    SortIcon?: JSXElementConstructor<{
        className: string;
    }>;
    classes?: TableCellClasses;
}
declare const TableCell: import("react").ForwardRefExoticComponent<Omit<TableCellProps, "ref"> & import("react").RefAttributes<unknown>>;
export default TableCell;
