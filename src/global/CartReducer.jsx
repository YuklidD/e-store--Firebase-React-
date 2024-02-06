export const CartReducer = (state, action) => {
    const { shoppingCart, totalPrice, totalQty } = state;

    switch (action.type) {
        case 'ADD_TO_CART':
            const check = shoppingCart.find(product => product.ProductID === action.product.ProductID);
            if (check) {
                return state;
            } else {
                const newProduct = {
                    ...action.product,
                    qty: 1,
                    TotalProductPrice: action.product.product_price // Ensure this is a number
                };
                return {
                    ...state,
                    shoppingCart: [...shoppingCart, newProduct],
                    totalPrice: state.totalPrice + newProduct.product_price, // Ensure product_price is a number
                    totalQty: state.totalQty + 1
                };
            }
        case 'INC':
            const incrementedIndex = shoppingCart.findIndex(cart => cart.ProductID === action.id);
            if (incrementedIndex < 0) return state; // If product is not found, do nothing

            // Update the product details without mutating the state directly
            const incrementedProduct = {
                ...shoppingCart[incrementedIndex],
                qty: shoppingCart[incrementedIndex].qty + 1,
                TotalProductPrice: (shoppingCart[incrementedIndex].qty + 1) * shoppingCart[incrementedIndex].product_price
            };

            // Construct a new shopping cart array with the updated product
            const incrementedCart = [
                ...shoppingCart.slice(0, incrementedIndex),
                incrementedProduct,
                ...shoppingCart.slice(incrementedIndex + 1)
            ];

            return {
                ...state,
                shoppingCart: incrementedCart,
                totalPrice: state.totalPrice + incrementedProduct.product_price,
                totalQty: state.totalQty + 1
            };
        case 'DEC':
            const decrementedIndex = shoppingCart.findIndex(cart => cart.ProductID === action.id);
            if (decrementedIndex < 0) return state; // If product is not found, do nothing

            if (shoppingCart[decrementedIndex].qty > 1) {
                // Update the product details without mutating the state directly
                const decrementedProduct = {
                    ...shoppingCart[decrementedIndex],
                    qty: shoppingCart[decrementedIndex].qty - 1,
                    TotalProductPrice: (shoppingCart[decrementedIndex].qty - 1) * shoppingCart[decrementedIndex].product_price
                };

                // Construct a new shopping cart array with the updated product
                const decrementedCart = [
                    ...shoppingCart.slice(0, decrementedIndex),
                    decrementedProduct,
                    ...shoppingCart.slice(decrementedIndex + 1)
                ];

                return {
                    ...state,
                    shoppingCart: decrementedCart,
                    totalPrice: state.totalPrice - decrementedProduct.product_price,
                    totalQty: state.totalQty - 1
                };
            } else {
                // If the quantity is 1, do not decrement to avoid negative numbers
                return state;
            }
        case 'DELETE':
            const filteredCart = shoppingCart.filter(product => product.ProductID !== action.id);
            const removedProduct = shoppingCart.find(product => product.ProductID === action.id);
            if (!removedProduct) return state; // If product is not found, do nothing

            return {
                ...state,
                shoppingCart: filteredCart,
                totalPrice: state.totalPrice - (removedProduct.qty * removedProduct.product_price),
                totalQty: state.totalQty - removedProduct.qty
            };
        case 'EMPTY':
            return {
                shoppingCart: [],
                totalPrice: 0,
                totalQty: 0
            };
        default:
            return state;
    }
};
