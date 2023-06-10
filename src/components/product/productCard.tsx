// Teaser render of the Product

import { Product } from '../../types';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const productCard: React.FC<{ product: Product }> = ( {product} ) => {
    return (
        <>
            <h3>{product.name}</h3>
            <p>{product.price} / {product.quantity}</p>
            { <Link to={`/products/${product.id}`}>View Details</Link> }
        </>
    );
}

export default productCard;