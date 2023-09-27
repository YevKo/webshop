import { ImageList, ImageListItem, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/system';
import { ProductImage } from '../../types';
import Image from 'next/image';

const ProductImages: React.FC<{ productImages: ProductImage[]}> = ( { productImages }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const columnCount = isMobile ? 2 : 1;

    return (
        <>
        { productImages ?
            <ImageList sx={{ width: '100%', height: 'auto', margin: '0' }} cols={columnCount} rowHeight={'auto'} gap={16}>
            { productImages.map((item) => (
                <ImageListItem key={item.id}>
                    {item.url.split('/')}
                    <Image
                        src={item.url}
                        alt={item.alt}
                        width={400}
                        height={400}
                        loading='lazy'
                    />
                </ImageListItem>
            )) }
            </ImageList>
            :
            <Image
                src={`defaultProduct.png?w=220&h=220&fit=crop&auto=format`}
                alt={'no image'}
                width={400}
                height={400}
                loading='lazy'
            />
        }
        </>
    );
}

export default ProductImages ;