import { Product, ProductImage } from '../../src/types';

// const backend_url = 'http://ddev-test.ddev.site';
const backend_url = 'https://main-bvxea6i-33i32kvwbas3y.de-2.platformsh.site';

const fetchProducts = async ( lang: string, category?: string | null ): Promise<[Product[], ProductImage[]]>=> {
    let products:Product[] = [] as Product[];
    let images:ProductImage[] = [] as ProductImage[];

    // getting all available products
    const product_data = await fetch(`${backend_url}/${lang}/products/?_format=json`)
        .then(res => res.json());

    products = product_data.map((item: { nid: any; title: any; field_category: any; field_description: any; field_price: any; field_quantity: any; field_customizable: string; field_reproducible: string; }) => {
        return {
            id: item.nid,
            name: item.title,
            category: item.field_category,
            description: item.field_description,
            price: item.field_price,
            quantity: item.field_quantity,
            uri: '',
            customizable: item.field_customizable == '1' ? true : false,
            reproducible: item.field_reproducible == '1' ? true : false,
        }
    });

    images = product_data.map( (item: { [x: string]: any; field_product_image: string; }) => {
        return item.field_product_image.split(',').map( (url:string) => {
            return {
                id: item['uuid'] + '-' + item['nid'],
                url: backend_url + url,
                alt: '',
                productId: item['nid']
            }
        })
    }).flat();

    if (category) {
        const products_by_category = products.filter((product) => product.category.toLowerCase() === category)
        products = products_by_category;
    }

    return [ products, images ];
};

export default fetchProducts;