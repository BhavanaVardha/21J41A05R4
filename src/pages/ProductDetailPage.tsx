import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/Product';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    // Example product detail (replace with actual fetched data)
    const product: Product = {
        id: id || '',
        name: 'Sample Product',
        company: 'AMZ',
        category: 'Laptop',
        price: 999,
        rating: 4.5,
        discount: 10,
        availability: 'yes'
    };

    return (
        <div>
            <h1>Product Detail</h1>
            <div>
                <h2>{product.name}</h2>
                <p>Company: {product.company}</p>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Rating: {product.rating}</p>
                <p>Discount: {product.discount}%</p>
                <p>Availability: {product.availability}</p>
            </div>
        </div>
    );
};

export default ProductDetailPage;
