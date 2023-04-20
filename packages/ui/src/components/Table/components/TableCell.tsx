import {
	TableCell as MuiTableCell,
	TableCellProps as MuiTableCellProps,
	TableSortLabel,
} from "@mui/material";
import { forwardRef } from "react";

import { SortDirection } from "../types";

export type TableCellClasses = {
	cell?: string;
	headCell?: string;
	sortLabel?: {
		root?: string;
		active?: string;
		icon?: string;
	};
};

interface TableCellProps extends Omit<MuiTableCellProps, "classes"> {
	isHeadCell?: boolean;
	sortable?: boolean;
	sortDirection?: SortDirection;
	active?: boolean;
	SortIcon?: React.JSXElementConstructor<{
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
			sortDirection = "asc",
			active,
			SortIcon,
			...props
		}: TableCellProps,
		ref
	) => {
		const rootClasses = isHeadCell ? classes.headCell : classes.cell;

		if (isHeadCell && sortable) {
			return (
				<MuiTableCell ref={ref} className={rootClasses} {...props}>
					<TableSortLabel
						IconComponent={SortIcon}
						direction={sortDirection}
						active={active}
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

TableCell.displayName = "TableCell";

export default TableCell;
