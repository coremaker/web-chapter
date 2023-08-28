import { CheckCircleRounded, Clear, ErrorRounded, InfoRounded, WarningRounded } from '@mui/icons-material';
import { createTheme } from '@mui/material';

import {
    autocompleteStyle,
    avatarStyle,
    breadcrumbsStyle,
    buttonStyle,
    chipStyle,
    containerStyle,
    dialogStyle,
    drawerStyle,
    iconButtonStyle,
    listItemAvatarStyle,
    listItemTextStyle,
    menuStyle,
    muiOutlinedInputStyle,
    switchStyle,
    tabStyle,
    tableContainerStyle,
    tableStyle,
    tabsStyle,
    toggleButtonGroupStyle,
    toggleButtonStyle,
    tooltipStyle,
} from './styleOverrides';
import { blurEffects, breakpoints, customShadows, palette, typography } from './themeOptions';

export const theme = createTheme({
    palette,
    typography,
    customShadows,
    blurEffects,
    breakpoints,
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiChip: {
            defaultProps: {
                deleteIcon: <Clear />,
                size: 'small',
                color: 'primary',
            },
            styleOverrides: {
                ...chipStyle,
            },
        },

        MuiButton: {
            defaultProps: {
                size: 'large',
                color: 'primary',
            },
            styleOverrides: {
                ...buttonStyle,
            },
        },

        MuiTypography: {
            defaultProps: {
                color: palette.ink[900],
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                ...muiOutlinedInputStyle,
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '&.MuiInputBase-root': {
                        boxShadow: 'none',
                    },
                },
            },
        },

        MuiAutocomplete: {
            styleOverrides: {
                ...autocompleteStyle,
            },
        },

        MuiMenu: {
            styleOverrides: {
                ...menuStyle,
            },
        },

        MuiListItemText: {
            styleOverrides: {
                ...listItemTextStyle,
            },
        },

        MuiListItemAvatar: {
            styleOverrides: {
                ...listItemAvatarStyle,
            },
        },

        MuiTabs: {
            styleOverrides: {
                ...tabsStyle,
            },
        },

        MuiTab: {
            styleOverrides: {
                ...tabStyle,
            },
        },

        MuiAlert: {
            defaultProps: {
                iconMapping: {
                    info: <InfoRounded />,
                    success: <CheckCircleRounded />,
                    warning: <ErrorRounded />,
                    error: <WarningRounded />,
                },
            },
        },

        MuiBreadcrumbs: {
            styleOverrides: {
                ...breadcrumbsStyle,
            },
        },

        MuiAvatar: {
            styleOverrides: {
                ...avatarStyle,
            },
        },

        MuiDrawer: {
            styleOverrides: {
                ...drawerStyle,
            },
        },

        MuiContainer: {
            styleOverrides: {
                ...containerStyle,
            },
        },

        MuiToggleButtonGroup: {
            defaultProps: {
                color: 'primary',
            },
            styleOverrides: {
                ...toggleButtonGroupStyle,
            },
        },

        MuiToggleButton: {
            defaultProps: {
                color: 'primary',
            },
            styleOverrides: {
                ...toggleButtonStyle,
            },
        },

        MuiDialog: {
            styleOverrides: {
                ...dialogStyle,
            },
        },

        MuiIconButton: {
            styleOverrides: {
                ...iconButtonStyle,
            },
        },

        MuiTable: {
            styleOverrides: {
                ...tableStyle,
            },
        },

        MuiTableContainer: {
            styleOverrides: {
                ...tableContainerStyle,
            },
        },

        MuiTooltip: {
            styleOverrides: {
                ...tooltipStyle,
            },
        },
        MuiSwitch: {
            defaultProps: {
                color: 'primary',
            },
            styleOverrides: {
                ...switchStyle,
            },
        },
    },
});
