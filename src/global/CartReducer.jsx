export const CartReducer = (state, action) => {
    let { shoppingCart, totalPrice, totalQty, alreadyInCart } = state;

    switch (action.type) {
        case 'ADD_TO_CART': {
            const productIndex = shoppingCart.findIndex(product => product.ProductID === action.product.ProductID);
            
            if (productIndex !== -1) {
                // Product is already in the cart
                return { ...state, alreadyInCart: true };
            } else {
                const newProduct = {
                    ...action.product,
                    qty: 1,
                    TotalProductPrice: action.product.product_price // Assuming product_price is already a number
                };
                return {
                    ...state,
                    shoppingCart: [...shoppingCart, newProduct],
                    totalPrice: totalPrice + newProduct.product_price,
                    totalQty: totalQty + 1,
                    alreadyInCart: false // Reset the flag when a new product is added
                };
            }
        }
        case 'INC': {
            const productIndex = shoppingCart.findIndex(cart => cart.ProductID === action.id);
            if (productIndex === -1) return { ...state, alreadyInCart: false }; // Product not found, reset the flag

            const incrementedProduct = {
                ...shoppingCart[productIndex],
                qty: shoppingCart[productIndex].qty + 1,
                TotalProductPrice: (shoppingCart[productIndex].qty + 1) * shoppingCart[productIndex].product_price
            };

            const newShoppingCart = [
                ...shoppingCart.slice(0, productIndex),
                incrementedProduct,
                ...shoppingCart.slice(productIndex + 1)
            ];

            return {
                ...state,
                shoppingCart: newShoppingCart,
                totalPrice: totalPrice + incrementedProduct.product_price,
                totalQty: totalQty + 1,
                alreadyInCart: false // Ensure flag is reset appropriately
            };
        }
        case 'DEC': {
            const productIndex = shoppingCart.findIndex(cart => cart.ProductID === action.id);
            if (productIndex === -1) return { ...state, alreadyInCart: false }; // Product not found, reset the flag

            if (shoppingCart[productIndex].qty > 1) {
                const decrementedProduct = {
                    ...shoppingCart[productIndex],
                    qty: shoppingCart[productIndex].qty - 1,
                    TotalProductPrice: (shoppingCart[productIndex].qty - 1) * shoppingCart[productIndex].product_price
                };

                const newShoppingCart = [
                    ...shoppingCart.slice(0, productIndex),
                    decrementedProduct,
                    ...shoppingCart.slice(productIndex + 1)
                ];

                return {
                    ...state,
                    shoppingCart: newShoppingCart,
                    totalPrice: totalPrice - decrementedProduct.product_price,
                    totalQty: totalQty - 1,
                    alreadyInCart: false // Ensure flag is reset appropriately
                };
            } else {
                // If qty is 1, simply return the current state without decrementing
                return { ...state, alreadyInCart: false };
            }
        }
        case 'DELETE': {
            const newShoppingCart = shoppingCart.filter(product => product.ProductID !== action.id);
            const productToRemove = shoppingCart.find(product => product.ProductID === action.id);
            if (!productToRemove) return { ...state, alreadyInCart: false }; // Product not found, reset the flag

            return {
                ...state,
                shoppingCart: newShoppingCart,
                totalPrice: totalPrice - (productToRemove.qty * productToRemove.product_price),
                totalQty: totalQty - productToRemove.qty,
                alreadyInCart: false // Ensure flag is reset appropriately
            };
        }
        case 'EMPTY':
            return {
                ...state,
                shoppingCart: [],
                totalPrice: 0,
                totalQty: 0,
                alreadyInCart: false // Reset the flag on emptying cart
            };
        case 'RESET_ALREADY_IN_CART':
            return {
                ...state,
                alreadyInCart: false // Explicitly handle resetting this flag
            };
        default:
            return state;
    }
};
