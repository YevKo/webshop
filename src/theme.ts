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
    '"ReemKufi"',
    '"Roboto"',
    'sans-serif',
].join(',');

const theme = createTheme({
    palette: {
        primary: {
            light: '#EDBBBA20',
            main: '#374151',
            dark: '#EDBBBA'
        },
        secondary: {
            main: '#EDBBBAD3',
            dark: '#374151',
            light: '#EDBBBA26'
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
    },
    components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'ReemKufiRegular';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('ReemKufi'), url(${`${process.env.PUBLIC_URL}/assets/fonts/ReemKufiRegular.ttf`}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
      },
});


export default theme;
