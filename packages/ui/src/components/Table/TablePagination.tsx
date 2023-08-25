import { Box, TableCell, TableFooter, TableRow } from '@mui/material';
import usePagination from '@mui/material/usePagination/usePagination';
import { FC } from 'react';

import { TablePaginationItem } from './TablePaginationItem';
import { PageChangeHandler } from './types';

interface TablePaginationProps {
    itemsCount: number;
    currentPage: number;
    rowsPerPage: number;
    onChangePage?: PageChangeHandler;
}

export const TablePagination: FC<TablePaginationProps> = ({ itemsCount, currentPage, rowsPerPage, onChangePage }) => {
    const numOfPages = Math.max(Math.ceil(itemsCount / rowsPerPage), 1);

    const { items } = usePagination({
        count: numOfPages,
        page: currentPage + 1,
        defaultPage: 1,
        onChange: (_e, page) => onChangePage?.(null, page - 1),
        showFirstButton: true,
        showLastButton: true,
    });

    return (
        <TableFooter data-testid="table-pagination">
            <TableRow>
                <TableCell colSpan={10000}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {items.map((item) => (
                            <TablePaginationItem item={item} key={`${item.page}-${item.type}`} />
                        ))}
                    </Box>
                </TableCell>
            </TableRow>
        </TableFooter>
    );
};
