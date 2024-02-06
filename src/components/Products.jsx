import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import './css/Products.css';
import { CartContext } from '../global/CartContext';
import { useSnackbar } from 'notistack';

const Products = () => {
    const { products } = useContext(ProductsContext); // Get products from ProductsContext
    const { dispatch, alreadyInCart } = useContext(CartContext); // Get dispatch and alreadyInCart from CartContext
    const { enqueueSnackbar } = useSnackbar(); // Use the useSnackbar hook to get the enqueueSnackbar function

    useEffect(() => {
        if (alreadyInCart) {
            enqueueSnackbar('This product is already in your cart', { variant: 'info' });
            // Reset the alreadyInCart flag after the snackbar is displayed
            dispatch({ type: 'RESET_ALREADY_IN_CART' });
        }
    }, [alreadyInCart, dispatch, enqueueSnackbar]);
    
    // Function to handle adding products to the cart
    const handleAddToCart = (product) => {
        if (!product.ProductID || !product.product_price) {
            console.error('ProductID or price is missing');
            return;
        }

        dispatch({
            type: 'ADD_TO_CART',
            product: {
                ProductID: product.ProductID,
                product_name: product.product_name,
                product_price: product.product_price,
                product_img: product.product_img
            }
        });
    };

    return (
        <>
            {products.length > 0 && <h1>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>Slow internet...no products to display</div>}
                {products.map((product) => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.product_img} alt={product.product_name} />
                        </div>
                        <div className='product-name'>{product.product_name}</div>
                        <div className='product-price'>Rs {product.product_price}.00</div>
                        <button className='addcart-btn' onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Products;
