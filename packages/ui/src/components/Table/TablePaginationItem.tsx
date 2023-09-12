import {
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight,
    MoreHorizRounded,
} from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { UsePaginationItem } from '@mui/material/usePagination/usePagination';
import { FC } from 'react';

interface TablePaginationItemProps {
    item: UsePaginationItem;
}

export const TablePaginationItem: FC<TablePaginationItemProps> = ({ item }) => {
    const { page, type, onClick, disabled, selected } = item;

    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
        return (
            <IconButton
                disabled
                sx={{ mr: '0.5rem', minWidth: 0 }}
                size="small"
                data-testid="table-pagination-item-ellipsis"
            >
                <MoreHorizRounded fontSize="small" />
            </IconButton>
        );
    }

    const iconColor = disabled ? 'disabled' : 'primary';

    const getIcon = (givenType: string) => {
        switch (givenType) {
            case 'next':
                return <KeyboardArrowRight color={iconColor} />;
            case 'last':
                return <KeyboardDoubleArrowRight color={iconColor} />;
            case 'first':
                return <KeyboardDoubleArrowLeft color={iconColor} />;
            default:
                return <KeyboardArrowLeft color={iconColor} />;
        }
    };

    if (type === 'page') {
        return (
            <Button
                variant={selected ? 'soft' : 'text'}
                color={selected ? 'primary' : 'ink'}
                onClick={onClick}
                disabled={disabled}
                sx={{ mr: '0.5rem', minWidth: 0 }}
                size="small"
            >
                {page}
            </Button>
        );
    }

    return (
        <IconButton
            onClick={onClick}
            disabled={disabled}
            sx={{ mr: '0.5rem', minWidth: 0 }}
            size="small"
            data-testid={`table-pagination-item-${type}`}
            aria-label={type}
            aria-current={!disabled}
        >
            {getIcon(type)}
        </IconButton>
    );
};
