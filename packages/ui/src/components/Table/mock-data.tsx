import { range } from "@web-chapter/lib";
import { HeadRowCells, Row } from "./types";
import { Chip } from "@mui/material";

const names = ["John Doe", "Jane Doe", "Jason Statham"];
const emails = ["johndoe@mail.io", "jasonstatham@mail.io", "janedoe@mail.io"];

export interface RowStructure {
	username: string;
	fullName: string;
	role: string;
	lastActive: string;
	status: string;
}

export const headCells: HeadRowCells<RowStructure> = {
	username: {
		id: "username",
		numeric: false,
		value: "Username",
	},
	fullName: {
		id: "fullName",
		value: "Name",
		sortable: true,
	},
	lastActive: {
		id: "role",
		value: "Role",
		sortable: true,
	},
	role: {
		id: "lastActive",
		value: "Last Active",
		sortable: true,
	},
	status: {
		id: "status",
		value: "Status",
		sortable: true,
	},
};

export const rows: Row<RowStructure>[] = range(40).map((i) => ({
	id: `#685065645${i % 2 === 0 ? i : 12 - i}`,
	cells: {
		username: {
			value: `${i % 2 === 0 ? i : 12 - i}${
				emails[Math.ceil(Math.random() * 2)] + i
			}`,
		},
		fullName: {
			value: names[Math.ceil(Math.random() * 2)] + i,
		},
		role: {
			value: "Contributor",
		},
		lastActive: {
			value: "12/01/2023",
			renderComponent: ({ value }) => <div>{value}</div>,
		},
		status: {
			value: i > 6 ? "Pending" : "Active",
			renderComponent: ({ value }) => <Chip label={value} />,
		},
	},
}));
