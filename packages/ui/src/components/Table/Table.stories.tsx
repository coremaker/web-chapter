/* eslint-disable no-alert */
import AppleIcon from '@mui/icons-material/Apple';
import { Chip } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

import { SelectedRowIds } from '../../hooks/useTable/reducer';
import Table from './BaseTable';
import { RowStructure, headCells, rows } from './mock-data';
import Styles from './styles.module.css';
import { useState } from 'react';

export default {
    title: 'Example/Table',
    component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table<RowStructure>> = (args) => <Table<RowStructure> {...args} />;

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
    currentPage: 2,
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

type Config = {
    defaultRowsPerPage: number;
    paginated: boolean;
    page: number;
    sortDirection: 'asc' | 'desc' | false;
    sortColumn: keyof RowStructure | null;
};
const ServerFilterSortPaginationTemplate: StoryFn<typeof Table<RowStructure>> = (args) => {
    const [config, setConfig] = useState<Config>({
        defaultRowsPerPage: 5,
        paginated: true,
        page: 1,
        sortDirection: 'asc',
        sortColumn: null,
    });

    const handleRowsPerPageChange = (rowsPerPage: number) => {
        setConfig((prev) => ({ ...prev, defaultRowsPerPage: rowsPerPage }));
        console.log('rowsPerPage', rowsPerPage);
    };

    const handlePageChange = (page: number) => {
        setConfig((prev) => ({ ...prev, page }));
        console.log('page', page);
    };

    const handleSortChange = (sortColumn: keyof RowStructure | null, sortDirection: 'asc' | 'desc' | false) => {
        setConfig((prev) => ({ ...prev, sortColumn, sortDirection }));
        console.log('sortColumn', sortColumn, sortDirection);
    };

    return (
        <Table<RowStructure>
            {...args}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            handleSortCellClick={handleSortChange}
            {...config}
        />
    );
};
export const ServerFilterSortPagination = ServerFilterSortPaginationTemplate.bind({});
ServerFilterSortPagination.args = {
    rows,
    headCells,
};
