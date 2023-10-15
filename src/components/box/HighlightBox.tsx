import { Box, BoxProps } from "@mui/material";

const HighlightBox: React.FC<BoxProps> = ({ children, ...rest }) => {
    return (
        <Box sx={{ backgroundColor: 'primary.light', padding: '2rem' }} {...rest}>
            { children }
        </Box>
    );
}

export default HighlightBox;