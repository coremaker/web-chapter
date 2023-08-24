import {
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight,
    MoreHorizRounded,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { UsePaginationItem } from '@mui/material/usePagination/usePagination';
import { FC } from 'react';

interface TablePaginationItemProps {
    item: UsePaginationItem;
}

export const TablePaginationItem: FC<TablePaginationItemProps> = ({ item }) => {
    const { page, type, onClick, disabled, selected } = item;

    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
        return <MoreHorizRounded sx={{ mr: '0.5rem' }} fontSize="small" />;
    }

    const getItem = (givenType: string) => {
        switch (givenType) {
            case 'page':
                return page;
            case 'next':
                return <KeyboardArrowRight color={disabled ? 'disabled' : 'primary'} />;
            case 'last':
                return <KeyboardDoubleArrowRight color={disabled ? 'disabled' : 'primary'} />;
            case 'first':
                return <KeyboardDoubleArrowLeft color={disabled ? 'disabled' : 'primary'} />;
            default:
                return <KeyboardArrowLeft color={disabled ? 'disabled' : 'primary'} />;
        }
    };

    return (
        <Button
            variant={selected ? 'soft' : 'text'}
            color={selected ? 'primary' : 'ink'}
            onClick={onClick}
            disabled={disabled}
            sx={{ mr: '0.5rem', minWidth: 0 }}
            size="small"
        >
            {getItem(type)}
        </Button>
    );
};
