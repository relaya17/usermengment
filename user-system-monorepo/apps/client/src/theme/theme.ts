import { createTheme, Theme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark'): Theme => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'dark' ? '#90caf9' : '#1976d2',
            },
            secondary: {
                main: mode === 'dark' ? '#f48fb1' : '#dc004e',
            },
            background: {
                default: mode === 'dark' ? '#121212' : '#ffffff',
                paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
            },
            text: {
                primary: mode === 'dark' ? '#ffffff' : '#000000',
                secondary: mode === 'dark' ? '#aaaaaa' : '#666666',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                    },
                },
            },
        },
    });
};
