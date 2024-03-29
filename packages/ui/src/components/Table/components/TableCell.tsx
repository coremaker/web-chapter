import {
    TableCell as MuiTableCell,
    TableCellProps as MuiTableCellProps,
    SortDirection,
    SxProps,
    TableSortLabel,
} from '@mui/material';
import classNames from 'classnames';
import { JSXElementConstructor, forwardRef } from 'react';

export type TableCellClasses = {
    bodyCell?: string;
    headCell?: {
        root?: string;
        active?: string;
    };
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

const TableCell = forwardRef(
    (
        {
            isHeadCell,
            isSticky,
            stickyPosition,
            sxProps,
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
        const headClasses = classNames(classes?.headCell?.root as string, {
            [classes?.headCell?.active as string]: active && classes?.headCell?.active,
        });
        const rootClasses = isHeadCell ? headClasses : classes.bodyCell;

        if (isHeadCell && sortable) {
            return (
                <MuiTableCell
                    ref={ref}
                    className={rootClasses + (isSticky ? ' BaseTable-sticky' : '')}
                    {...props}
                    sx={{
                        ...sxProps,
                        ...(isSticky &&
                            stickyPosition && {
                                position: 'sticky',
                                zIndex: 1,
                                ...(stickyPosition === 'left' ? { left: 0 } : {}),
                                ...(stickyPosition === 'right' ? { right: 0 } : {}),
                            }),
                    }}
                >
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
            <MuiTableCell
                ref={ref}
                className={rootClasses + (isSticky ? ' BaseTable-sticky' : '')}
                {...props}
                sx={{
                    ...sxProps,
                    ...(isSticky &&
                        stickyPosition && {
                            position: 'sticky',
                            zIndex: 1,
                            ...(stickyPosition === 'left' ? { left: 0 } : {}),
                            ...(stickyPosition === 'right' ? { right: 0 } : {}),
                        }),
                }}
            >
                {children}
            </MuiTableCell>
        );
    }
);

TableCell.displayName = 'TableCell';

export default TableCell;
