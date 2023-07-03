import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu, MenuClasses, MenuItem, styled } from '@mui/material';
import { MouseEvent, ReactNode, useState } from 'react';

import { GenericRowStructure, Row, RowAction } from '../types';

export interface EllipsisCellContentClasses {
    root: string;
    menu: Partial<MenuClasses>;
}
interface EllipsisCellContentProps<T extends GenericRowStructure> {
    row: Row<T>;
    label: string | ReactNode;
    classes?: Partial<EllipsisCellContentClasses>;
    rowActions: RowAction<T>[];
    icon?: ReactNode;
    onMenuOpen?: (row: Row<T>) => void;
    onMenuClose?: (row: Row<T>) => void;
}
const StyledDivContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

const EllipsisCellContent = <T extends GenericRowStructure>({
    row,
    label,
    rowActions,
    icon,
    classes = {},
    onMenuOpen,
    onMenuClose,
}: EllipsisCellContentProps<T>) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        onMenuOpen?.(row);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        onMenuClose?.(row);
        setAnchorEl(null);
    };
    const menuId = `table-row-menu-${row.cells.id.value}`;
    return (
        <StyledDivContainer className={classes.root ?? ''}>
            <div>{label}</div>
            <div>
                <IconButton
                    data-testid={`ellipsis-button-${row.cells.id.value}`}
                    aria-label="open table row menu"
                    aria-controls={open ? menuId : undefined}
                    aria-haspopup="true"
                    className="BaseTable__EllipsisCellContent__Button"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {icon ?? <MoreHorizIcon fontSize="small" />}
                </IconButton>
                <Menu classes={classes.menu} id={menuId} open={open} onClose={handleClose} anchorEl={anchorEl}>
                    {rowActions.map((rowAction) => {
                        const key = `${row.cells.id.value}-${rowAction.id}`;
                        if (rowAction.renderComponent) {
                            return rowAction.renderComponent({ key, row });
                        }
                        return (
                            <MenuItem
                                key={key}
                                data-testid={`menu-item-${row.cells.id.value}-${rowAction.id}`}
                                className={rowAction.labelClassName}
                                onClick={(e) => rowAction.onClick?.(row, e)}
                            >
                                {rowAction.label}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </div>
        </StyledDivContainer>
    );
};

export default EllipsisCellContent;
