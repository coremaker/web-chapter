import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";

import { Row, RowAction } from "../types";

interface EllipsisCellContentProps {
	row: Row;
	label: string | ReactNode;

	rowActions: RowAction[];
}

const EllipsisCellContent = ({
	row,
	label,
	rowActions,
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
		<div className="flex justify-between items-center">
			<div>{label}</div>
			<div>
				<IconButton
					data-testid={`ellipsis-button-${row.id}`}
					aria-controls={open ? `table-row-menu-${row.id}` : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
				>
					...
				</IconButton>
				<Menu
					classes={{
						list: "py-1",
						paper: "bg-admin-surface-panel text-ink",
					}}
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
		</div>
	);
};

export default EllipsisCellContent;
