import { Product, ProductImage } from '../../src/types';
import { v4 } from 'uuid';

const backend_url = 'https://main-bvxea6i-33i32kvwbas3y.de-2.platformsh.site';

const fetchProduct = async ( nid: string, lang: string ): Promise<[Product, ProductImage[]]> => {
    let product:Product = {} as Product;
    let images:ProductImage[] = [] as ProductImage[];

    // getting all available products
    const product_data = await fetch(`${backend_url}/${lang}/product/?_format=json&nid=${nid}`)
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
            url: backend_url + url,
            alt: '',
            productId: nid
        }
    }).flat();

    return [ product, images ];
};

export default fetchProduct;