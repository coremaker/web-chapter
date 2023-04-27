import { range } from '@web-chapter/lib';

import { HeadCell, Row } from './types';
import { Chip } from '@mui/material';

const names = ['John Doe', 'Jane Doe', 'Jason Statham'];
const emails = ['johndoe@mail.io', 'jasonstatham@mail.io', 'janedoe@mail.io'];

export const headCells: HeadCell[] = [
    {
        id: 'username',
        numeric: false,
        label: 'Username',
    },
    {
        id: 'fullName',
        label: 'Name',
        sortable: true,
    },
    {
        id: 'role',
        label: 'Role',
        sortable: true,
    },
    {
        id: 'lastActive',
        label: 'Last Active',
        sortable: true,
    },
    {
        id: 'status',
        label: 'Status',
        sortable: true,
    },
];

export const rows: Row[] = range(40).map((i) => ({
    id: `#685065645${i % 2 === 0 ? i : 12 - i}`,
    cells: [
        {
            label: `${i % 2 === 0 ? i : 12 - i}${emails[Math.ceil(Math.random() * 2)]}`,
        },
        {
            label: names[Math.ceil(Math.random() * 2)],
        },
        {
            label: 'Contributor',
        },
        {
            label: '7 Feb 2023',
        },
        {
            label: i > 6 ? 'Pending' : 'Active',
            renderComponent: (value) => <Chip label={value} />,
        },
    ],
}));
