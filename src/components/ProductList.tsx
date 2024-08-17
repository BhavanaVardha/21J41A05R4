import React from 'react';
import { Product } from '../types/Product';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const getRandomImage = () => `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;

    return (
        <Grid container spacing={2}>
            {products.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                        <img src={getRandomImage()} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                        <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography>Price: ${product.price.toFixed(2)}</Typography>
                            <Typography>Rating: {product.rating}</Typography>
                            <Typography>Discount: {product.discount}%</Typography>
                            <Typography>Availability: {product.availability}</Typography>
                            <Link to={`/product/${product.id}`}>View Details</Link>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
