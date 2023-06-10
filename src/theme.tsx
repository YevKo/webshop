import { createTheme } from '@mui/material';

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

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#282828',
        },
    },
    typography: {
        h1: {
            fontSize: '3.5rem',
        },
        h2: {
            fontSize: '2.5rem',
        },
        h3: {
            fontSize: '2.25rem',
        },
        h4: {
            fontSize: '2rem',
        },
        h5: {
            fontSize: '1.75rem',
        },
        body1: {
            fontSize: '1rem',
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