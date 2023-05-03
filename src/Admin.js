import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';

const initialState = {
    name: '', price: ''
}

const Admin = () => {
    const [itemInfo, updateItemInfo] = useState(initialState);

    const updateForm = (e) => {
        const formData = {
            ...itemInfo, [e.target.name]: e.target.value
        };
        updateItemInfo(formData);
    };

    const addItem = async() => {
        try {
            const data = {
                body: { ...itemInfo, price: parseInt(itemInfo.price) }
            }
            updateItemInfo(initialState);
            await API.post('ecommercelabsapi', '/products', data);
        } catch (err) {
            console.log(err);
        };
    }

    return (
        <div style={containerStyle}>
            <Input 
                name='name'
                onChange={updateForm}
                value={itemInfo.name}
                placeholder='What is this?'
                style={inputStyle}
            />
            <Input 
                name='price'
                onChnage={updateForm}
                value={itemInfo.price}
                style={inputStyle}
                placeholder='What is the price?'
            />
            <Button
                style={buttonStyle}
                onClick={addItem}
            >
                Put it on the digital shelf
            </Button>
        </div>
    );
}

const containerStyle = { width: 400, margin: '20px auto' }
const inputStyle = { marginTop: 10 }
const buttonStyle = { marginTop: 10 }

export default withAuthenticator(Admin)