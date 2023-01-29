import React from 'react';
import Create from '../pages/Create.jsx';
import Index from '../pages/Index.jsx';
import Training from '../pages/Training.jsx';
import NavBar from '../components/NavBar.jsx';

export const navigation = [
  {
    path: '/',
    title: 'Главная',
    element: <><NavBar/><Index/></>,
  },
  {
    path: '/trainer/',
    title: 'Тренажер',
    element: <><NavBar/><Training/></>,
  },
  {
    path: '/create/word/',
    title: 'Создать',
    element: <><NavBar/><Create/></>,
  }
];