import {createTheme} from "@mui/material";

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
    interface Palette {
        neutral: PaletteColorOptions;
    }

    interface PaletteOptions {
        neutral?: PaletteColorOptions;
    }

    interface PaletteColorOptions {
        main?: string
        light?: string,
        dark?: string
        contrastText?: string
        notContrastText?: string
    }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#673ab7',
            light: '#8561c5',
            dark: '#482880',
            contrastText: '#fff',
        },
        secondary: {
            main: '#0288D1',
            light: '#42a5f5',
            dark: '#01579B',
            contrastText: '#fff',
        },
        neutral: {
            main: '#757575',
            light: '#9e9e9e',
            dark: '#616161',
            contrastText: '#FFFFFF',
            notContrastText: '#616161'
        }
    },
})

export const globalStyles = () => ({
    "&::-webkit-scrollbar": {
        width: 5,
        height: 5
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: null
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#b2b2b2",
        borderRadius: 2
    },
});