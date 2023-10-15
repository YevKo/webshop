import { Typography } from '@mui/material';
import HighlightBox from './HighlightBox';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { useTranslation } from 'next-i18next';

const ProductNote: React.FC<{customizable?: boolean, reproducible?: boolean}> = ({ customizable, reproducible }) => {
    const { t } = useTranslation();

    return (
        <HighlightBox>
            <>
            { reproducible && <Typography component='div' sx={{ display: 'flex', alignItems: 'center'}}><CheckSharpIcon sx={{ marginRight: '10px', fill: '#05bd05'}} /> { t('product.reproducible') }</Typography> }
            { customizable && <Typography component='div' sx={{ display: 'flex', alignItems: 'center'}}><CheckSharpIcon sx={{ marginRight: '10px', fill: '#05bd05'}} /> { t('product.customizable') }</Typography> }
            </>
        </HighlightBox>
    );
}

export default ProductNote;