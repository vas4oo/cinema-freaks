import { createMuiTheme } from '@material-ui/core';

export const snackbar = createMuiTheme({
    overrides: {
        MuiSnackbarContent: {
            root: {
                width: '90%',
                alignItems: 'start'
            },
            action: {
                paddingTop: 5,
                paddingLeft: 0,
                display: 'flow-root'
            },
            message: {
                width: '90%'
            }
        },
        MuiSnackbar: {
            root: {
                alignItems: "start"
            }
        },
        MuiIconButton: {
            root: {
                padding: 0
            }
        }

    }
});