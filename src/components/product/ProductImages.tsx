import { ImageList, ImageListItem, useMediaQuery } from "@mui/material"
import { Theme } from '@mui/system';
import DefaultProductImage from '../../assets/images/default-product.png';
import { ProductImage } from "../../types";

const ProductImages: React.FC<{ productImages: ProductImage[]}> = ( { productImages }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const columnCount = isMobile ? 2 : 1;

    return (
        <>
        { productImages ?
            <ImageList sx={{ width: '100%', height: 'auto', margin: '0' }} cols={columnCount} rowHeight={'auto'} gap={16}>
            { productImages.map((item) => (
                <ImageListItem key={item.id}>
                    <img
                    src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.alt}
                    loading="lazy"
                    />
                </ImageListItem>
            )) }
            </ImageList>
            :
            <img
                src={`${DefaultProductImage}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${DefaultProductImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={'no image'}
                loading="lazy"
            />
        }
        </>
    );
}

export default ProductImages ;