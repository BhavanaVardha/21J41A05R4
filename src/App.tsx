import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
    return (
        <Router>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<AllProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;
