import { ImageList, ImageListItem, useMediaQuery } from "@mui/material"
import { Theme } from '@mui/system';
import DefaultProductImage from '../../assets/images/default-product.png';

interface ImagesProps {
    images?: {
        id: number,
        url: string,
        alt: string
    }[];
}

const ProductImages: React.FC<ImagesProps> = ({ images }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const columnCount = isMobile ? 2 : 1;

    return (
        <>
        { images ?
            <ImageList sx={{ width: '100%', height: 'auto', margin: '0' }} cols={columnCount} rowHeight={'auto'} gap={16}>
            { images.map((item) => (
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