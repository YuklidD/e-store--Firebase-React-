import React, { createContext, Component } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../components/config/Config';

export const ProductsContext = createContext();

class ProductsContextProvider extends Component {
    state = {
        products: [],
        loading: true,
        error: null
    };

    componentDidMount() {
        const ref = collection(db, 'products'); 
        this.unsubscribe = onSnapshot(ref, 
            (snapshot) => {
                const products = snapshot.docs.map(doc => ({
                    ProductID: doc.id,
                    ...doc.data(),
                }));
                this.setState({ products, loading: false });
            },
            (error) => {
                console.error("Error fetching products: ", error);
                this.setState({ error, loading: false });
            }
        );
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe(); // Check if unsubscribe is a function before calling it
    }

    render() {
        const { products, loading, error } = this.state;
        return (
            <ProductsContext.Provider value={{ products, loading, error }}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}

export default ProductsContextProvider;
