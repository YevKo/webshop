import { Typography } from "@mui/material";
import i18n from "../../i18n";
import GrayBox from "./GrayBox";
import CheckSharpIcon from '@mui/icons-material/CheckSharp';

const ProductNote: React.FC<{customizable?: boolean, reproducible?: boolean}> = ({ customizable, reproducible }) => {
    return (
        <GrayBox>
            <>
            {customizable}
            { reproducible && <Typography component="div" sx={{ display: 'flex', alignItems: 'center'}}><CheckSharpIcon sx={{ marginRight: '10px', fill: '#05bd05'}} /> { i18n.t('product.reproducible') }</Typography> }
            { customizable && <Typography component="div" sx={{ display: 'flex', alignItems: 'center'}}><CheckSharpIcon sx={{ marginRight: '10px', fill: '#05bd05'}} /> { i18n.t('product.customizable') }</Typography> }
            </>
        </GrayBox>
    );
}

export default ProductNote;