import { Meta, StoryFn } from "@storybook/react";
import Table from "./BaseTable";
import { RowStructure, headCells, rows } from "./mock-data";
import { SelectedRowIds } from "../../hooks/useTable/reducer";
import Styles from "./styles.module.css";
import { Chip } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";

export default {
  title: "Example/Table",
  component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table<RowStructure>> = (args) => (
	<Table<RowStructure> {...args} />
);

export const Base = Template.bind({});
Base.args = {
	showIdCell: true,
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
		return `${row.cells.fullName.value} ${row.cells.username.value}`;
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
		return `${row.cells.fullName.value} ${row.cells.username.value}`;
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
		return `${row.cells.fullName.value} ${row.cells.username.value}`;
	},
};

export const RowActions = Template.bind({});
RowActions.args = {
  rows: rows,
  headCells: headCells,
  rowActions: [
    {
      id: "1",
      label: "Action 1",
      onClick: () => alert("Action 1 clicked"),
    },
    {
      id: "2",
      label: "Action 2",
      onClick: () => alert("Action 2 clicked"),
    },
  ],
};

export const RowActionsCustomIcon = Template.bind({});
RowActionsCustomIcon.args = {
  rows: rows,
  headCells: headCells,
  ellipsisIcon: <AppleIcon fontSize="small" />,
  rowActions: [
    {
      id: "1",
      label: "Action 1",
      onClick: () => alert("Action 1 clicked"),
    },
    {
      id: "2",
      label: "Action 2",
      onClick: () => alert("Action 2 clicked"),
    },
  ],
};
