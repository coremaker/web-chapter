import { IconButton, Menu, MenuClasses, MenuItem, styled } from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";
import { GenericRowStructure, Row, RowAction } from "../types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
const StyledDivContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
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
	const menuId = `table-row-menu-${row.id}`;
	return (
		<StyledDivContainer className={classes.root ?? ""}>
			<div>{label}</div>
			<div>
				<IconButton
					data-testid={`ellipsis-button-${row.id}`}
					aria-controls={open ? menuId : undefined}
					aria-haspopup="true"
					className="BaseTable__EllipsisCellContent__Button"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
				>
					{icon ?? <MoreHorizIcon fontSize="small" />}
				</IconButton>
				<Menu
					classes={classes.menu}
					id={menuId}
					open={open}
					onClose={handleClose}
					anchorEl={anchorEl}
				>
					{rowActions.map((rowAction) =>
						rowAction.renderComponent ? (
							rowAction.renderComponent()
						) : (
							<MenuItem
								key={`${row.id}-${rowAction.id}`}
								data-testid={`menu-item-${row.id}-${rowAction.id}`}
								className={rowAction.labelClassName}
								onClick={() => rowAction.onClick?.(row)}
							>
								{rowAction.label}
							</MenuItem>
						)
					)}
				</Menu>
			</div>
		</StyledDivContainer>
	);
};

export default EllipsisCellContent;
