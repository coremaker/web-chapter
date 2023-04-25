import { IconButton, Menu, MenuClasses, MenuItem, styled } from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";
import { Row, RowAction } from "../types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export interface EllipsisCellContentClasses {
	root: string;
	menu: Partial<MenuClasses>;
}
interface EllipsisCellContentProps {
	row: Row;
	label: string | ReactNode;
	classes?: Partial<EllipsisCellContentClasses>;
	rowActions: RowAction[];
	icon?: ReactNode;
}
const StyledDivContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
});

const EllipsisCellContent = ({
	row,
	label,
	rowActions,
	icon,
	classes = {},
}: EllipsisCellContentProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<StyledDivContainer className={classes.root ?? ""}>
			<div>{label}</div>
			<div>
				<IconButton
					data-testid={`ellipsis-button-${row.id}`}
					aria-controls={open ? `table-row-menu-${row.id}` : undefined}
					aria-haspopup="true"
					className="BaseTable__EllipsisCellContent__Button"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
				>
					{icon ?? <MoreHorizIcon fontSize="small" />}
				</IconButton>
				<Menu
					classes={classes.menu}
					id={`table-row-menu-${row.id}`}
					open={open}
					onClose={handleClose}
					anchorEl={anchorEl}
				>
					{rowActions.map((rowAction) => (
						<MenuItem
							key={row.id + rowAction.label}
							data-testid={`menu-item-${row.id}-${rowAction.label}`}
							className={rowAction.labelClassName}
							onClick={() => rowAction.onClick(row)}
						>
							{rowAction.label}
						</MenuItem>
					))}
				</Menu>
			</div>
		</StyledDivContainer>
	);
};

export default EllipsisCellContent;