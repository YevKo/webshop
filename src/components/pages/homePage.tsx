import { Box } from "@mui/material";
import { useContext } from "react";
import ProductContext from "../../context/ProductContext";
import SearchInput from "../search/searchInput";

const HomePage = () => {
    const { products } = useContext(ProductContext);

    return (
        <>
            <Box sx={{ 'minWidth': '10rem', 'marginTop': '-16px', 'marginRight': '10px' }}>
                <SearchInput data={products} />
            </Box>
        </>
    );
}


export default HomePage;