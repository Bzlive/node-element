import React from "react";
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './styles/index.less';

const root = document.querySelector('#root');

if (root) {
  createRoot(root).render(
    <RouterProvider router={router}>
      </RouterProvider>
  )
}
