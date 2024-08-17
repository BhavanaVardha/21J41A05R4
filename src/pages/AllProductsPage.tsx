import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

const fetchProducts = async (
    company: string,
    category: string,
    top: number,
    minPrice: number,
    maxPrice: number
): Promise<Product[]> => {
    const API_BASE_URL = 'http://20.244.56.144/test/companies';
    try {
        const response = await axios.get(`${API_BASE_URL}/${company}/categories/${category}/products`, {
            params: { top, minPrice, maxPrice }
        });
        return response.data.map((item: any, index: number) => ({
            id: `${item.productName}-${item.price}-${index}`,
            name: item.productName,
            company,
            category,
            price: item.price,
            rating: item.rating,
            discount: item.discount,
            availability: item.availability,
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const AllProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState({
        company: 'AMZ',
        category: 'Laptop',
        minPrice: 0,
        maxPrice: 10000
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchProducts(
                filters.company, 
                filters.category, 
                10, 
                filters.minPrice, 
                filters.maxPrice
            );
            setProducts(fetchedProducts);
            setLoading(false);
        };

        loadProducts();
    }, [filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = () => {
        setLoading(true);
    };

    return (
        <div>
            <h1>All Products</h1>
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="Laptop">Laptop</MenuItem>
                    <MenuItem value="Phone">Phone</MenuItem>
                    {/* Add more categories */}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Company</InputLabel>
                <Select
                    name="company"
                    value={filters.company}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="AMZ">AMZ</MenuItem>
                    <MenuItem value="FLP">FLP</MenuItem>
                    {/* Add more companies */}
                </Select>
            </FormControl>
            <TextField
                name="minPrice"
                label="Min Price"
                type="number"
                value={filters.minPrice}
                onChange={handleFilterChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="maxPrice"
                label="Max Price"
                type="number"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '16px' }}>
                Search
            </Button>
            {loading ? <p>Loading...</p> : <ProductList products={products} />}
        </div>
    );
};

export default AllProductsPage;
