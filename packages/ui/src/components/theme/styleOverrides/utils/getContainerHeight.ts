export const TOOLBAR_HEIGHT = 4;
export const TOOLBAR_HEIGHT_SM = 3.5;
export const PAGE_HEADER_BREADCRUMBS_HEIGHT = 6.87;
export const PAGE_HEADER_HEIGHT = 4.87;
export const TABS_CONTAINER_HEIGHT = 3;

export const getContainerHeight = (hasToolbar: boolean, hasPageHeaderBreadcrumbs: boolean, hasTabs: boolean) => {
    const margin = 2;

    if (hasToolbar && hasPageHeaderBreadcrumbs && hasTabs) {
        return `calc(100vh - ${TOOLBAR_HEIGHT}rem - ${PAGE_HEADER_BREADCRUMBS_HEIGHT}rem - ${TABS_CONTAINER_HEIGHT}rem - ${margin}rem)`;
    }

    if (hasToolbar && !hasPageHeaderBreadcrumbs && hasTabs) {
        return `calc(100vh - ${TOOLBAR_HEIGHT}rem - ${PAGE_HEADER_HEIGHT}rem - ${TABS_CONTAINER_HEIGHT}rem - ${margin}rem)`;
    }

    if (hasToolbar && hasPageHeaderBreadcrumbs && !hasTabs) {
        return `calc(100vh - ${TOOLBAR_HEIGHT}rem - ${PAGE_HEADER_BREADCRUMBS_HEIGHT}rem)`;
    }

    if (hasToolbar && !hasPageHeaderBreadcrumbs && !hasTabs) {
        return `calc(100vh - ${TOOLBAR_HEIGHT}rem - ${PAGE_HEADER_HEIGHT}rem)`;
    }

    return '100vh';
};
