import React, { createContext, Component } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../components/config/Config';

export const ProductsContext = createContext();

class ProductsContextProvider extends Component {
    state = {
        products: [],
    };

    componentDidMount() {
        const ref = collection(db, 'products'); 
        this.unsubscribe = onSnapshot(ref, (snapshot) => {
            const products = snapshot.docs.map(doc => ({
                ProductID: doc.id,
                ...doc.data(),
            }));
            this.setState({ products });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <ProductsContext.Provider value={{ products: this.state.products }}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}

export default ProductsContextProvider;
