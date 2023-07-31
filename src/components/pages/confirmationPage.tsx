import { useContext, useEffect, useRef } from "react";
import CartContext from "../../context/CartContext";
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';


function ConfirmationPage() {
    return (
        <>
            <Typography sx={{ mt: 2, mb: 20 }}>All steps completed - you&apos;re finished. We will contact you soon!</Typography>
            <Link className='button buttonSecondary textStyleMain noUnderline' to='/products'>Back to shopping</Link>
        </>
    );
}

export default ConfirmationPage;
