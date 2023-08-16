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
                    {item.url.split('/')}
                    <img
                    src={item.url.split('/').slice(0,6).join('/') + '/styles/large/public/' + item.url.split('/').slice(6).join('/') }
                    srcSet={item.url.split('/').slice(0,6).join('/') + '/styles/large/public/' + item.url.split('/').slice(6).join('/') }
                    alt={item.url.split('/').slice(0,6).join('/')}
                    loading="lazy"
                    />
                </ImageListItem>
            )) }
            </ImageList>
            :
            <img
                src={`${DefaultProductImage}?w=220&h=220&fit=crop&auto=format`}
                srcSet={`${DefaultProductImage}?w=220&h=220&fit=crop&auto=format&dpr=2 2x`}
                alt={'no image'}
                loading="lazy"
            />
        }
        </>
    );
}

export default ProductImages ;