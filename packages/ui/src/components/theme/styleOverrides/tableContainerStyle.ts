import { TableClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { getContainerHeight } from './utils';

export const tableContainerStyle:
    | Partial<OverridesStyleRules<keyof TableClasses, 'MuiTableContainer', Omit<Theme, 'components'>>>
    | undefined = {
    root: () => ({
        padding: '1.5rem',
        height: getContainerHeight(true, true, false),
    }),
};
