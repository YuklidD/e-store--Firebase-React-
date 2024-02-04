import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import './css/Products.css';

const Products = () => {
    const { products } = useContext(ProductsContext);

    return (
        <>
            {products.length > 0 && <h1>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>Slow internet...no products to display</div>}
                {products.map(product => (
    <div className='product-card' key={product.ProductID}>
        <div className='product-img'>
            <img src={product.product_img} alt="not found" />
        </div>
        <div className='product-name'>
            {product.product_name}
        </div>
        <div className='product-price'>
            Rs {product.product_price}.00
        </div>
        <button className='addcart-btn'>ADD TO CART</button>
    </div>
))}

            </div>
        </>
    );
};

export default Products;
