import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Admin from './Admin';
import Main from './Main';
import Profile from './Profile';

const Router = () => {
    const [current, setCurrent] = useState('home');
    useEffect(() => {
      setRoute();
      window.addEventListener('hashchange', setRoute);

      return () =>  window.removeEventListener('hashchange', setRoute);
    
    }, []);
    const setRoute = () => {
      const location = window.location.href.split('/');

      const pathname = location[location.length - 1];

      console.log('The path we are traveling: ', pathname);
      setCurrent(pathname ? pathname : 'home');
    };
    return (
      <HashRouter>
        <Nav current={current} />
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/profile' element={<Profile />} />
          <Route element={<Main />} />
        </Routes>
      </HashRouter>
    );
  }

export default Router