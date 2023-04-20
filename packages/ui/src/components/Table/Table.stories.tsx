import { Meta, StoryFn } from "@storybook/react";
import Table from "./Table";
import { headCells, rows } from "./mock-data";
import { SelectedRowIds } from "../../hooks/useTable/reducer";
import Styles from "./styles.module.css";
import { Chip } from "@mui/material";

export default {
	title: "Example/Table",
	component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />;

export const Base = Template.bind({});
Base.args = {
	rows: rows,
	headCells: headCells,
};

export const Pagination = Template.bind({});
Pagination.args = {
	rows: rows,
	headCells: headCells,
	defaultRowsPerPage: 5,
	paginated: true,
};

export const Searchable = Template.bind({});
Searchable.args = {
	rows: rows,
	headCells: headCells,
	defaultRowsPerPage: 5,
	paginated: true,
	makeSearchableRowContent: (row) => {
		return `${row.cells[0].label} ${row.cells[1].label}`;
	},
};

export const Selectable = Template.bind({});
Selectable.args = {
	rows: rows,
	headCells: headCells,
	defaultRowsPerPage: 5,
	paginated: true,
	selectable: true,
	classes: {
		headArea: Styles.table__headArea,
		searchInputContainer: Styles.table__searchInputContainer,
	},

	renderTableActions: (selectedRowIds: SelectedRowIds) => {
		const selectedCount = Object.values(selectedRowIds).filter(
			(selected) => selected
		).length;

		return <Chip color="primary" label={`Total selected: ${selectedCount}`} />;
	},
	makeSearchableRowContent: (row) => {
		return `${row.cells[0].label} ${row.cells[1].label}`;
	},
};

export const SelectableWithCustomHandlers = Template.bind({});
SelectableWithCustomHandlers.args = {
	rows: rows,
	headCells: headCells,
	defaultRowsPerPage: 5,
	paginated: true,
	selectable: true,
	onRowSelectionChange: (rowId, selected) => {
		alert(
			`You ${selected ? "selected" : "unselected"} the row with id ${rowId}`
		);
	},
	classes: {
		headArea: Styles.table__headArea,
		searchInputContainer: Styles.table__searchInputContainer,
	},

	renderTableActions: (selectedRowIds: SelectedRowIds) => {
		const selectedCount = Object.values(selectedRowIds).filter(
			(selected) => selected
		).length;

		return <Chip color="primary" label={`Total selected: ${selectedCount}`} />;
	},
	makeSearchableRowContent: (row) => {
		return `${row.cells[0].label} ${row.cells[1].label}`;
	},
};
