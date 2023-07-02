import ProductSingle from '../product/ProductSingle';
import { useParams } from 'react-router-dom';
import ProductContext from  '../../context/ProductContext';
import { useContext } from 'react';

const ProductPage: React.FC = () => {
    const { products, images } = useContext(ProductContext);
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
                <ProductSingle product={product} productImages={images.filter((image) => (image.productId === Number(productId))) || null }/>
            }
        </>
    );
}

export default ProductPage;