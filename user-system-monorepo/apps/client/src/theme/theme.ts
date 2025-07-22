// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
    const baseTheme = createTheme({
        direction: 'rtl',
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    background: {
                        default: '#e3f2fd',
                        paper: '#ffffff',
                    },
                    primary: {
                        main: '#1976d2',
                        light: '#64b5f6',
                        contrastText: '#ffffff',
                    },
                    secondary: {
                        main: '#dc004e',
                    },
                    text: {
                        primary: '#333333',
                        secondary: '#555555',
                    },
                }
                : {
                    background: {
                        default: '#121212',
                        paper: '#1e1e1e',
                    },
                    primary: {
                        main: '#90caf9',
                        light: '#bbdefb',
                        contrastText: '#000000',
                    },
                    secondary: {
                        main: '#ce93d8',
                    },
                    text: {
                        primary: '#ffffff',
                        secondary: '#bbbbbb',
                    },
                }),
        },
        typography: {
            fontFamily: '"Inter", sans-serif',
            h4: {
                fontWeight: 700,
                marginBottom: '1rem',
                color: mode === 'light' ? '#333' : '#eee',
                textAlign: 'center',
            },
            h5: {
                fontWeight: 600,
                color: mode === 'light' ? '#333' : '#eee',
                textAlign: 'right',
            },
            subtitle1: {
                fontWeight: 500,
                color: mode === 'light' ? '#555' : '#ccc',
                textAlign: 'right',
            },
            body1: {
                fontSize: '1rem',
                lineHeight: 1.5,
                color: mode === 'light' ? '#555' : '#ccc',
                textAlign: 'right',
            },
            body2: {
                fontSize: '0.875rem',
                color: mode === 'light' ? '#666' : '#bbb',
                textAlign: 'right',
            },
            caption: {
                fontSize: '0.75rem',
                color: mode === 'light' ? '#888' : '#aaa',
                textAlign: 'right',
                display: 'block',
            },
        },
    });

    return createTheme(baseTheme, {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: 'none',
                        padding: '10px 20px',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: baseTheme.palette.primary.main,
                        color: baseTheme.palette.primary.contrastText,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    },
                },
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        justifyContent: 'space-between',
                    },
                },
            },
            MuiBottomNavigation: {
                styleOverrides: {
                    root: {
                        backgroundColor: baseTheme.palette.background.paper,
                        boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
                        height: 64,
                        direction: 'rtl',
                    },
                },
            },
            MuiBottomNavigationAction: {
                styleOverrides: {
                    root: {
                        minWidth: 80,
                        '&.Mui-selected': {
                            color: baseTheme.palette.primary.main,
                        },
                    },
                    label: {
                        fontSize: '0.75rem',
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        backgroundColor: baseTheme.palette.background.paper,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 8,
                            backgroundColor: alpha(baseTheme.palette.action.hover, 0.05),
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        left: 'auto',
                        right: 14,
                        '&.Mui-focused': { right: 0 },
                        '&.MuiFormLabel-filled': { right: 0 },
                        '&.MuiInputLabel-shrink': { right: 0, transformOrigin: 'top right' },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    input: { textAlign: 'right', direction: 'rtl' },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: { textAlign: 'right' },
                },
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: { textAlign: 'right' },
                },
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    label: {
                        marginLeft: 0,
                        marginRight: 8,
                    },
                    root: {
                        flexDirection: 'row-reverse',
                        justifyContent: 'flex-end',
                    },
                },
            },
        },
    });
};
