import { createTheme } from '@mui/material';
import '@fontsource/prosto-one';
import '@fontsource/montserrat';

declare module "@mui/material/styles" {
    interface TypographyVariants {
        titleLarge: React.CSSProperties;
        titleMedium: React.CSSProperties;
        titleSmall: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        titleLarge?: React.CSSProperties;
        titleMedium?: React.CSSProperties;
        titleSmall?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        titleLarge: true;
        titleMedium: true;
        titleSmall: true;
    }
}

const headingFont = [
    'Prosto One',
    'Roboto',
    'serif',
].join(',');

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#f1f1f1',
        },
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'Roboto',
            'sans-serif',
        ].join(','),
        h1: {
            fontFamily: headingFont,
            fontSize: '2.25rem',
            letterSpacing: 0,
        },
        h2: {
            fontFamily: headingFont,
            fontSize: '2rem',
            letterSpacing: 0
        },
        h3: {
            fontFamily: headingFont,
            fontSize: '1.75rem',
            letterSpacing: 0
        },
        h4: {
            fontFamily: headingFont,
            fontSize: '1.5rem',
            letterSpacing: 0
        },
        h5: {
            fontFamily: headingFont,
            fontSize: '1.25rem',
            letterSpacing: 0
        },
        body1: {
            fontSize: '1rem',
            letterSpacing: '0.5px',
        },
        body2: {
            fontSize: '0.75rem',
        },
        titleLarge: {
            fontSize: '1.375rem',
        },
        titleMedium: {
            fontSize: '1rem',
        },
        titleSmall: {
            fontSize: '0.875rem',
        },
    },
});


export default theme;
