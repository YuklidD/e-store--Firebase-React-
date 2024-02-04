import React, { useState } from 'react';
import {db} from './config/Config';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();

        if (!productImg) {
            setError('Please select an image for the product');
            return;
        }

        const storage = getStorage();
        const storageReference = storageRef(storage, `product-images/${productImg.name}`);
        const uploadTask = uploadBytesResumable(storageReference, productImg);

        uploadTask.on('state_changed', snapshot => {
            // Handle upload progress here if needed
        }, 
        err => setError(err.message),
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
                setProductPrice(0);
                setProductImg(null);
                document.getElementById('file').value = '';
            } catch (err) {
                setError(err.message);
            }
        });
    };

    return (
        <div className='container'>
            <h2>ADD PRODUCTS</h2>
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" onChange={productImgHandler} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    );
};

export default AddProducts;
