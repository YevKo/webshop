import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import i18n from "../../i18n";


function ConfirmationPage() {
    return (
        <>
            <Typography sx={{ mt: 2, mb: 20 }}>{ i18n.t('cart.confirmation_message') }</Typography>
            <Link className='button buttonSecondary textStyleMain noUnderline' to='/products'>{ i18n.t('cart.back_to_shopping') }</Link>
        </>
    );
}

export default ConfirmationPage;
