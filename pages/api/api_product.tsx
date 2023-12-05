import { Product, ProductImage } from '../../src/types';
import { v4 } from 'uuid';

const fetchProduct = async ( nid: string, lang: string ): Promise<[Product, ProductImage[]]> => {
    let product:Product = {} as Product;
    let images:ProductImage[] = [] as ProductImage[];

    // getting all available products
    const product_data = await fetch(`${process.env.BACKEND_URL}/${lang}/product/?_format=json&nid=${nid}`)
        .then(res => res.json());

        product = {
        id: product_data[0].nid,
        name: product_data[0].title,
        category: product_data[0].field_category,
        description: product_data[0].field_description,
        price: product_data[0].field_price,
        quantity: product_data[0].field_quantity,
        uri: '',
        customizable: product_data[0].field_customizable == '1' ? true : false,
        reproducible: product_data[0].field_reproducible == '1' ? true : false,
    };

    images = product_data[0].field_product_image.split(',').map( (url:string) => {
        return {
            id: v4(),
            url: process.env.BACKEND_URL + url,
            alt: '',
            productId: nid
        }
    }).flat();

    return [ product, images ];
};

export default fetchProduct;