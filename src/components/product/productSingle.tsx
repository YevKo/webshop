// Full product page render of the Product

import { Product } from '../../types';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const productSingle: React.FC<{ product: Product }> = ( {product} ) => {
    return (
        <>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price} / {product.quantity}</p>
            { <Link to={`/products/`}>Back to all products</Link> }
        </>
    );
}

export default productSingle;