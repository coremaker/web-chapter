import {
    TableCell as MuiTableCell,
    TableCellProps as MuiTableCellProps,
    SortDirection,
    TableSortLabel,
} from '@mui/material';
import { JSXElementConstructor, forwardRef } from 'react';

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
    sortable?: boolean;
    sortDirection?: SortDirection;
    cellId?: string;
    active?: boolean;
    SortIcon?: JSXElementConstructor<{
        className: string;
    }>;
    classes?: TableCellClasses;
}

const TableCell = forwardRef(
    (
        {
            isHeadCell,
            classes = {},
            sortable,
            children,
            sortDirection,
            active,
            SortIcon,
            cellId,
            ...props
        }: TableCellProps,
        ref
    ) => {
        const rootClasses = isHeadCell ? classes.headCell : classes.bodyCell;
        if (isHeadCell && sortable) {
            return (
                <MuiTableCell ref={ref} className={rootClasses} {...props}>
                    <TableSortLabel
                        IconComponent={SortIcon}
                        direction={sortDirection || 'asc'}
                        active={active}
                        aria-label={cellId ? `sort by ${cellId}` : 'sort by cell'}
                        classes={classes.sortLabel}
                    >
                        {children}
                    </TableSortLabel>
                </MuiTableCell>
            );
        }
        return (
            <MuiTableCell ref={ref} className={rootClasses} {...props}>
                {children}
            </MuiTableCell>
        );
    }
);

TableCell.displayName = 'TableCell';

export default TableCell;
