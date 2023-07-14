import { createTheme } from '@mui/material';
import '@fontsource/prosto-one';
import '@fontsource/montserrat';

declare module "@mui/material/styles" {
    interface TypographyVariants {
        titleLarge: React.CSSProperties;
        titleMedium: React.CSSProperties;
        titleSmall: React.CSSProperties;
        bold: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        titleLarge?: React.CSSProperties;
        titleMedium?: React.CSSProperties;
        titleSmall?: React.CSSProperties;
        bold?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        titleLarge: true;
        titleMedium: true;
        titleSmall: true;
        bold: true;
    }
}

const headingFont = [
    '"Prosto One"',
    '"Roboto"',
    'serif',
].join(',');

const bodyFont = [
    '"Montserrat"',
    '"Roboto"',
    'sans-serif',
].join(',');

const theme = createTheme({
    palette: {
        primary: {
            light: '#a0a0a0',
            main: '#000000',
        },
        secondary: {
            main: '#f1f1f1',
        },
        info: {
            main: '#bc575f',
        }
    },
    typography: {
        fontFamily: bodyFont,
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
            fontFamily: bodyFont,
            fontSize: '1rem',
            letterSpacing: '0.5px',
        },
        body2: {
            fontFamily: bodyFont,
            fontSize: '0.875rem',
        },
        bold: {
            fontFamily: bodyFont,
            fontWeight: '700',
            letterSpacing: '0.5px',
        },
        titleLarge: {
            fontFamily: headingFont,
            fontSize: '1.375rem',
        },
        titleMedium: {
            fontFamily: headingFont,
            fontSize: '1rem',
        },
        titleSmall: {
            fontFamily: headingFont,
            fontSize: '0.875rem',
        },
    }
});


export default theme;
