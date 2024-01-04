/* eslint-disable no-alert */
import AppleIcon from '@mui/icons-material/Apple';
import { Chip } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { MouseEvent, useState } from 'react';

import { SelectedRowIds } from '../../hooks/useTable/reducer';
import Table from './BaseTable';
import {
    RowStructure,
    RowStructureWithStickyActions,
    headCells,
    headCellsWithSticky,
    rows,
    rowsWithSticky,
} from './MockData';
import Styles from './styles.module.css';

export default {
    title: 'Example/Table',
    component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table<RowStructure>> = (args) => <Table<RowStructure> {...args} />;

const TemplateWithSticky: StoryFn<typeof Table<RowStructureWithStickyActions>> = (args) => (
    <Table<RowStructureWithStickyActions> {...args} />
);

export const Base = Template.bind({});
Base.args = {
    showIdCell: true,
    rows,
    headCells,
};

export const Pagination = Template.bind({});
Pagination.args = {
    rows,
    headCells,
    defaultRowsPerPage: 4,
    paginated: true,
    rowsPerPageOptions: [4, 8, 16],
    sortDirection: 'asc',
    sortColumn: 'address',
};

export const Searchable = Template.bind({});
Searchable.args = {
    rows,
    headCells,
    defaultRowsPerPage: 5,
    paginated: true,
    makeSearchableRowContent: (row) => {
        return `${row.cells.fullName.value} ${row.cells.username.value}`;
    },
};

export const Selectable = Template.bind({});
Selectable.args = {
    // Storybook overrides functions passed as props with its own functions
    onAllRowsSelectionChange: undefined,
    onRowSelectionChange: undefined,
    rows,
    headCells,
    defaultRowsPerPage: 5,
    paginated: true,
    selectable: true,
    classes: {
        headArea: Styles.table__headArea,
        searchInputContainer: Styles.table__searchInputContainer,
    },
    renderTableActions: (selectedRowIds: SelectedRowIds) => {
        const selectedCount = Object.values(selectedRowIds).filter((selected) => selected).length;

        return <Chip color="primary" label={`Total selected: ${selectedCount}`} />;
    },
    makeSearchableRowContent: (row) => {
        return `${row.cells.fullName.value} ${row.cells.username.value}`;
    },
};
export const SingleSelectable = Template.bind({});
SingleSelectable.args = {
    onAllRowsSelectionChange: undefined,
    onRowSelectionChange: undefined,
    rows,
    headCells,
    defaultRowsPerPage: 5,
    paginated: true,
    selectable: true,
    selectionType: 'single',
    classes: {
        headArea: Styles.table__headArea,
        searchInputContainer: Styles.table__searchInputContainer,
    },

    renderTableActions: (selectedRowIds: SelectedRowIds) => {
        const selectedCount = Object.values(selectedRowIds).filter((selected) => selected).length;

        return <Chip color="primary" label={`Total items: ${selectedCount}`} />;
    },
    makeSearchableRowContent: (row) => {
        return `${row.cells.fullName.value} ${row.cells.username.value}`;
    },
};

export const SelectableWithCustomHandlers = Template.bind({});
SelectableWithCustomHandlers.args = {
    rows,
    headCells,
    defaultRowsPerPage: 5,
    paginated: true,
    selectable: true,
    onRowSelectionChange: (rowId, selected) => {
        alert(`You ${selected ? 'selected' : 'unselected'} the row with id ${rowId}`);
    },
    classes: {
        headArea: Styles.table__headArea,
        searchInputContainer: Styles.table__searchInputContainer,
    },

    renderTableActions: (selectedRowIds: SelectedRowIds) => {
        const selectedCount = Object.values(selectedRowIds).filter((selected) => selected).length;

        return <Chip color="primary" label={`Total selected: ${selectedCount}`} />;
    },
    makeSearchableRowContent: (row) => {
        return `${row.cells.fullName.value} ${row.cells.username.value}`;
    },
};

export const RowActions = Template.bind({});
RowActions.args = {
    rows,
    headCells,
    onRowClick: () => alert('row click'),
    rowActions: [
        {
            id: '1',
            label: 'Action 1',
            onClick: () => alert('Action 1 clicked'),
        },
        {
            id: '2',
            label: 'Action 2',
            onClick: () => alert('Action 2 clicked'),
        },
    ],
};

export const LoadingState = Template.bind({});
LoadingState.args = {
    rows,
    headCells,
    loading: true,
    rowActions: [
        {
            id: '1',
            label: 'Action 1',
            onClick: () => alert('Action 1 clicked'),
        },
        {
            id: '2',
            label: 'Action 2',
            onClick: () => alert('Action 2 clicked'),
        },
    ],
};

export const NoResultsState = Template.bind({});
NoResultsState.args = {
    rows: [],
    headCells,
    rowActions: [
        {
            id: '1',
            label: 'Action 1',
            onClick: () => alert('Action 1 clicked'),
        },
        {
            id: '2',
            label: 'Action 2',
            onClick: () => alert('Action 2 clicked'),
        },
    ],
};

export const RowActionsCustomIcon = Template.bind({});
RowActionsCustomIcon.args = {
    rows,
    headCells,
    ellipsisIcon: <AppleIcon width={100} height={100} />,
    rowActions: [
        {
            id: '1',
            label: 'Action 1',
            onClick: () => alert('Action 1 clicked'),
        },
        {
            id: '2',
            label: 'Action 2',
            onClick: () => alert('Action 2 clicked'),
        },
    ],
};

export const StickyColumns = TemplateWithSticky.bind({});
StickyColumns.args = {
    rows: rowsWithSticky,
    headCells: headCellsWithSticky,
    tableContainerSxProps: {
        borderRadius: '0.5rem',
    },
};

type Config = {
    defaultRowsPerPage?: number;
    rowsPerPage: number;
    totalPages?: number;
    page: number;
    sortDirection: 'asc' | 'desc' | false;
    sortColumn: keyof RowStructure | null;
};
const ServerFilterSortPaginationTemplate: StoryFn<typeof Table<RowStructure>> = (args) => {
    const [config, setConfig] = useState<Config>({
        page: 0,
        totalPages: 10,
        rowsPerPage: 4,
        sortDirection: 'asc',
        sortColumn: 'address',
    });

    const handleRowsPerPageChange = (value: number) => {
        setConfig((prev) => ({ ...prev, rowsPerPage: value, totalPages: Math.ceil(rows.length / value) }));
    };

    const handlePageChange = (_e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setConfig((prev) => ({ ...prev, page: newPage }));
    };

    const handleSortChange = (sortColumn: keyof RowStructure | null) => {
        setConfig((prev) => ({ ...prev, sortColumn, sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc' }));
    };
    return (
        <Table<RowStructure>
            paginated
            {...args}
            rows={rows.slice(config.page * config.rowsPerPage, (config.page + 1) * config.rowsPerPage)}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            handleSortCellClick={handleSortChange}
            currentPage={config.page}
            rowsPerPage={config.rowsPerPage}
            sortColumn={config.sortColumn}
            totalPages={config.totalPages}
            sortDirection={config.sortDirection}
        />
    );
};
export const ServerFilterSortPagination = ServerFilterSortPaginationTemplate.bind({});
ServerFilterSortPagination.args = {
    rows,
    headCells,
    rowsPerPageOptions: [4, 8, 16],
};
