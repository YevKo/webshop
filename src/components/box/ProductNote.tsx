import { Box, Typography } from "@mui/material";

function ProductNote() {
    return (
    <Box sx={{ backgroundColor: 'secondary.light', padding: '2rem' }}>
        <Typography component="div">
            { "This product can be ordered in bigger quantities" }
        </Typography>
    </Box>
    );
}

export default ProductNote ;