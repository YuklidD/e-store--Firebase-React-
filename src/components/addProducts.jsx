import React, { useState } from 'react';
import { db } from './config/Config';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png).');
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!productImg) {
            setError('Please select an image for the product.');
            setLoading(false);
            return;
        }

        const storage = getStorage();
        const storageReference = storageRef(storage, `product-images/${productImg.name}`);
        const uploadTask = uploadBytesResumable(storageReference, productImg);

        uploadTask.on('state_changed', snapshot => {
            // Handle upload progress here if needed. Could update a progress state to show a progress bar.
        }, 
        err => {
            setError(err.message);
            setLoading(false);
        },
        async () => {
            try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                const productsRef = collection(db, 'products');
                await addDoc(productsRef, {
                    product_name: productName, 
                    product_price: Number(productPrice), 
                    product_img: url
                });
                setProductName('');
                setProductPrice('');
                setProductImg(null);
                document.getElementById('file').value = '';
                setError('');
                setLoading(false);
                alert('Product added successfully!');
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        });
    };

    return (
        <div className='container mt-5'>
            <h2 className="mb-4">Add New Product</h2>
            <form autoComplete="off" onSubmit={addProduct}>
                <div className="mb-3">
                    <label htmlFor="product-name" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="product-name"
                        required onChange={(e) => setProductName(e.target.value)} value={productName} />
                </div>
                <div className="mb-3">
                    <label htmlFor="product-price" className="form-label">Product Price</label>
                    <input type="number" className="form-control" id="product-price"
                        required onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                </div>
                <div className="mb-3">
                    <label htmlFor="product-img" className="form-label">Product Image</label>
                    <input type="file" className="form-control" id="file" onChange={productImgHandler} />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProducts;
