import { MUIComponentOverrides } from './types/StyleOverrides';

export const tableStyle: MUIComponentOverrides['MuiTable'] = {
    root: ({ theme: { palette, typography } }) => ({
        border: `1px solid ${palette.surface[300]}`,
        borderRadius: '12px',
        borderCollapse: 'separate',
        overflow: 'hidden',
        '& .MuiTableCell-head': {
            color: palette.ink[500],
            ...typography.body2Bold,
        },
        '& .BaseTable__Cell__transactionNumber': {
            minWidth: '5rem!important',
        },
        '& .MuiTableCell-body': {
            minWidth: '12.5rem',
        },
        '& .BaseTable__Cell__name': {
            color: palette.ink[500],
            width: '100%',
            ...typography.body1Bold,
        },
        '& .BaseTable__Cell__email': {
            color: palette.primary[500],
            ...typography.body1Regular,
            textDecoration: 'underline',
        },
        '& .BaseTable__Cell__dateAdded': {
            color: palette.ink[500],
            ...typography.body1Regular,
        },
        '& .MuiTableRow-root:nth-of-type(odd)': {
            backgroundColor: `${palette.surface[50]}!important`,
        },
        '& .MuiTableRow-head': {
            backgroundColor: `${palette.surface[0]}!important`,
        },
        '& .MuiTableSortLabel-root': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        '&. MuiMenu-list': {
            paddingTop: 0,
            paddingBottom: 0,
        },
    }),
};
