import { MUIComponentOverrides } from './types/StyleOverrides';
import { getContainerHeight } from './utils';

export const tableContainerStyle: MUIComponentOverrides['MuiTableContainer'] = {
    root: () => ({
        padding: '1.5rem',
        height: getContainerHeight({ hasToolbar: true, hasPageHeaderBreadcrumbs: true, hasTabs: false }),
    }),
};
