import React, { useState, useEffect } from 'react';
import Container from './Container';
import { API } from 'aws-amplify';
import { List } from 'antd';
import checkUser from './checkUser';

const Main = () => {
    const [state, setState] = useState({products: [], loading: true});

    const [user, updateUser] = useState({});

    let didCancel = false;

    useEffect(() => {
        getProducts()
        checkUser(updateUser)
        return () => didCancel = true
    }, []);

    const getProducts = async() => {
        const data = await API.get('ecommercelabsapi', '/products');
        console.log('data: ', data);
        if (didCancel) return
        setState({
            products: data.data.Items, loading: false
        })
    }

    const deleteItem = async(id) => {
        try {
            const products = state.products.filter(p => p.id !== id)
            setState({ ...state, products })
            await API.del('ecommercelabsapi', '/products', 
                { body: { id } }
            )
            console.log('Got rid of that, boss')
        } catch (err) {
            console.error('There is a problem: ', err)
        }
    }
    return (
        <Container>
            <h1>Welcome to the Home Page</h1>
            <List 
                itemLayout="horizontal"
                dataSource={state.products}
                loading={state.loading}
                renderItem={item => (
                    <List.Item
                        actions={user.isAuthorized
                        ? [<p onClick={() => deleteItem(item.id)}
                        key={item.id}>delete</p>] : null}
                    >
                        <List.Item.Meta 
                            title={item.name}
                            description={item.price}
                        />
                    </List.Item>
                )}
            />
        </Container>
    )
}

export default Main