import { Chip } from '@mui/material';
import { range } from '@web-chapter/lib';

import { HeadRowCells, Row } from './types';

const names = ['John Doe', 'Jane Doe', 'Jason Statham'];
const emails = ['johndoe@mail.io', 'jasonstatham@mail.io', 'janedoe@mail.io'];

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
