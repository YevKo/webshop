import React from 'react';
import ProductSingle from '../../src/components/product/ProductSingle';
import Layout from '../../src/components/layout/layout';
import fetchProducts from '../api/api_products';
import fetchProduct from '../api/api_product';
import ProductsRelated from '../../src/components/product/ProductsRelated';
import { InferGetStaticPropsType } from 'next';

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export const getStaticProps = (async (context: { params: { id: any; }; locale: string; }) => {
    // Fetch necessary data for the product using params.id
    const [ products, images ]  = await fetchProducts(context.locale);
    const id = context.params.id;

    const [ product, product_images ] = await fetchProduct(id, context.locale);

    return {
        props: {
            products,
            product,
            images,
            product_images
        }
    }
})

function ProductPage( { products, product, images, product_images}: InferGetStaticPropsType<typeof getStaticProps> ) {
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <Layout>
            <ProductSingle product={product} productImages={product_images || null} />
            <ProductsRelated products={products} images={images} category={product.category} id={product.id} />
        </Layout>
    );
}

export default ProductPage;
