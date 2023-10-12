/* eslint-disable no-alert */
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { Box, Button, Chip } from '@mui/material';

import { HeadRowCells, Row } from './types';

const names = ['John Doe', 'Jane Doe', 'Jason Statham'];
const emails = ['johndoe@mail.io', 'jasonstatham@mail.io', 'janedoe@mail.io'];

export const range = (end: number) => {
    return [...Array(end).keys()];
};

export interface RowStructure {
    id: string;
    username: string;
    fullName: string;
    role: string;
    lastActive: string;
    status: string;
    address: {
        city: string;
        street: string;
    };
}

export const headCells: HeadRowCells<RowStructure> = {
    id: {
        value: 'User ID',
        sortable: true,
    },
    username: {
        value: 'Username',
    },
    fullName: {
        value: 'Name',
        sortable: true,
    },
    lastActive: {
        value: 'Role',
        sortable: true,
    },
    role: {
        value: 'Last Active',
        sortable: true,
    },
    status: {
        value: 'Status',
        sortable: true,
    },
    address: {
        value: 'Address',
        sortable: true,
        comparator: (firstCell, secondCell) => firstCell.value.city.localeCompare(secondCell.value.city),
    },
};

export const rows: Row<RowStructure>[] = range(40).map((i) => ({
    cells: {
        id: { value: i.toString() },
        username: {
            value: `${i % 2 === 0 ? i : 12 - i}${emails[Math.ceil(Math.random() * 2)] + i}`,
        },
        fullName: {
            value: names[i % names.length] + i,
        },
        role: {
            value: 'Contributor',
        },
        lastActive: {
            value: '12/01/2023',
            renderComponent: ({ value }) => <div>{value}</div>,
        },
        status: {
            value: i > 6 ? 'Pending' : 'Active',
            renderComponent: ({ value }) => <Chip label={value} />,
        },
        address: {
            value: {
                city: `City ${i}`,
                street: `Street ${i}`,
            },
            renderComponent: ({ value }) => (
                <div>
                    <div>{value.city}</div>
                    <div>{value.street}</div>
                </div>
            ),
        },
    },
}));

export interface RowStructureWithStickyActions {
    id: string;
    username: string;
    fullName: string;
    role: string;
    lastActive: string;
    status: string;
    address: {
        city: string;
        street: string;
    };
    actions: string;
}

export const headCellsWithSticky: HeadRowCells<RowStructureWithStickyActions> = {
    id: {
        value: 'User ID',
        sortable: true,
    },
    username: {
        value: 'Username',
        isSticky: true,
        stickyPosition: 'left',
        sxProps: {
            width: 'auto',
        },
    },
    fullName: {
        value: 'Name',
        sortable: true,
    },
    lastActive: {
        value: 'Role',
        sortable: true,
    },
    role: {
        value: 'Last Active',
        sortable: true,
    },
    status: {
        value: 'Status',
        sortable: true,
    },
    address: {
        value: 'Address',
        sortable: true,
        comparator: (firstCell, secondCell) => firstCell.value.city.localeCompare(secondCell.value.city),
    },
    actions: {
        value: '',
        sortable: false,
        isSticky: true,
        stickyPosition: 'right',
    },
};

export const rowsWithSticky: Row<RowStructureWithStickyActions>[] = range(40).map((i) => ({
    cells: {
        id: { value: i.toString() },
        username: {
            value: `${i % 2 === 0 ? i : 12 - i}${emails[Math.ceil(Math.random() * 2)] + i}`,
            isSticky: true,
            stickyPosition: 'left',
            sxProps: {
                width: 'auto',
            },
        },
        fullName: {
            value: names[i % names.length] + i,
        },
        role: {
            value: 'Contributor',
        },
        lastActive: {
            value: '12/01/2023',
            renderComponent: ({ value }) => <div>{value}</div>,
        },
        status: {
            value: i > 6 ? 'Pending' : 'Active',
            renderComponent: ({ value }) => <Chip label={value} />,
        },
        address: {
            value: {
                city: `City ${i}`,
                street: `Street ${i}`,
            },
            renderComponent: ({ value }) => (
                <div>
                    <div>{value.city}</div>
                    <div>{value.street}</div>
                </div>
            ),
        },

        actions: {
            value: '',
            renderComponent: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        sx={{
                            minWidth: 'unset',
                            padding: '0.375rem',
                            marginRight: '0.5rem',
                        }}
                        onClick={() => {
                            alert('clicked on edit');
                        }}
                    >
                        <EditRounded />
                    </Button>
                    <Button
                        sx={{
                            minWidth: 'unset',
                            padding: '0.375rem',
                            marginRight: '0.5rem',
                        }}
                        onClick={() => {
                            alert('clicked on delete');
                        }}
                    >
                        <DeleteRounded />
                    </Button>
                </Box>
            ),
            isSticky: true,
            stickyPosition: 'right',
        },
    },
}));
