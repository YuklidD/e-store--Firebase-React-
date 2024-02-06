import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import './css/Products.css';
import { CartContext } from '../global/CartContext';
import { useSnackbar } from 'notistack';

const Products = () => {
    const { products } = useContext(ProductsContext);
    const { dispatch, alreadyInCart } = useContext(CartContext);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (alreadyInCart) {
            enqueueSnackbar('This product is already in your cart', { variant: 'info' });
            dispatch({ type: 'RESET_ALREADY_IN_CART' });
        }
    }, [alreadyInCart, dispatch, enqueueSnackbar]);

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
        enqueueSnackbar(`${product.product_name} added to cart!`, { variant: 'success' });
    };

    return (
        <>
            {products.length > 0 ? <h1>Products</h1> : <h1>Loading Products...</h1>}
            <div className='products-container'>
                {products.map((product) => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.product_img} alt={product.product_name} />
                        </div>
                        <div className='product-info'>
                            <div className='product-name'>{product.product_name}</div>
                            <div className='product-price'>Rs {product.product_price}</div>
                        </div>
                        <button className='addcart-btn' onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Products;
