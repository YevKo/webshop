import { Typography } from "@mui/material";
import GrayBox from "./GrayBox";

function ProductNote() {
    return (
    <GrayBox>
        <Typography component="div">
            { "This product can be ordered in bigger quantities" }
        </Typography>
    </GrayBox>
    );
}

export default ProductNote ;