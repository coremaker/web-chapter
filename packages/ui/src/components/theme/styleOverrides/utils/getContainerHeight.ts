export const TOOLBAR_HEIGHT = 4;
export const PAGE_HEADER_BREADCRUMBS_HEIGHT = 6.87;
export const PAGE_HEADER_HEIGHT = 4.87;
export const TABS_CONTAINER_HEIGHT = 3;

interface Args {
    hasToolbar: boolean;
    hasPageHeaderBreadcrumbs: boolean;
    hasTabs: boolean;
    options?: {
        toolbarHeight?: number;
        toolbarHeightSm?: number;
        pageHeaderBreadcrumbsHeight?: number;
        pageHeaderHeight?: number;
        tabsContainerHeight?: number;
    };
}
export const getContainerHeight = ({ options, hasTabs, hasPageHeaderBreadcrumbs, hasToolbar }: Args) => {
    const margin = 2;

    const toolbarHeight = options?.toolbarHeight ?? TOOLBAR_HEIGHT;
    const pageHeaderBreadcrumbsHeight = options?.pageHeaderBreadcrumbsHeight ?? PAGE_HEADER_BREADCRUMBS_HEIGHT;
    const pageHeaderHeight = options?.pageHeaderHeight ?? PAGE_HEADER_HEIGHT;
    const tabsContainerHeight = options?.tabsContainerHeight ?? TABS_CONTAINER_HEIGHT;

    if (hasToolbar && hasPageHeaderBreadcrumbs && hasTabs) {
        return `calc(100vh - ${toolbarHeight}rem - ${pageHeaderBreadcrumbsHeight}rem - ${tabsContainerHeight}rem - ${margin}rem)`;
    }

    if (hasToolbar && !hasPageHeaderBreadcrumbs && hasTabs) {
        return `calc(100vh - ${toolbarHeight}rem - ${pageHeaderHeight}rem - ${tabsContainerHeight}rem - ${margin}rem)`;
    }

    if (hasToolbar && hasPageHeaderBreadcrumbs && !hasTabs) {
        return `calc(100vh - ${toolbarHeight}rem - ${pageHeaderBreadcrumbsHeight}rem)`;
    }

    if (hasToolbar && !hasPageHeaderBreadcrumbs && !hasTabs) {
        return `calc(100vh - ${toolbarHeight}rem - ${pageHeaderHeight}rem)`;
    }

    return '100vh';
};
