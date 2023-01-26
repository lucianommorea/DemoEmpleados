import React from 'react';
import { render as rltRender} from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducer/index';
import { BrowserRouter } from 'react-router-dom';

function render(
    ui,
    {
      preloadedState,
      // Automatically create a store instance if no store was passed in
      store = configureStore({ reducer: rootReducer, preloadedState }),
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }) {
      return  <BrowserRouter> <Provider store={store}>{children}</Provider> </BrowserRouter>
    }
  
    // Return an object with the store and all of RTL's query functions
    return rltRender(ui, { wrapper: Wrapper, ...renderOptions }) 
  }

//re-export everything
export * from '@testing-library/react'
//override render method
export { render }