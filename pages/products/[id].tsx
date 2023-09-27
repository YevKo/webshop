import React from 'react';
import ProductSingle from '../../src/components/product/ProductSingle';
import Layout from '../../src/components/layout/layout';
import fetchProducts from '../api/api_products';
import fetchProduct from '../api/api_product';
import ProductsRelated from '../../src/components/product/Productsrelated';

export async function getStaticPaths( context ) {
    const paths = [...Array(1000).keys()].map((_, nid) => {
        let output = [];
        output = output.concat(context.locales.map((locale) => {
            return {
                params: {
                    id: String(nid),
                },
                locale: locale
            };
        }));
        return output;
    }).flat();
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps( { params, locale} ) {
    // Fetch necessary data for the product using params.id
    const [ products, images ]  = await fetchProducts(locale);
    const id = params.id;

    const [ product, product_images ] = await fetchProduct(id, locale);

    return {
        props: {
            products,
            product,
            images,
            product_images
        }
    }
}

function ProductPage( { products, product, images, product_images} ) {
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <Layout images={images}>
            <ProductSingle product={product} productImages={product_images || null} />
            <ProductsRelated products={products} images={images} category={product.category} id={product.id} />
        </Layout>
    );
}

export default ProductPage;
