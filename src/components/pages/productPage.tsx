import { Product } from '../../types';
import ProductSingle from '../product/productSingle';
import { useParams } from 'react-router-dom';

const ProductPage: React.FC<{ products: Product[] }> = ( {products} ) => {
    // extract a product id from url
    const { productId } = useParams<{ productId?: string }>();
    if (!productId) {
        return <div>Product ID is missing</div>;
    }
    // get the product from a list of products
    const product = products.find((p) => String(p.id) === productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            {
                <ProductSingle product={product} />
            }
        </>
    );
}

export default ProductPage;