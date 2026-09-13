import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useState } from 'react';
import { createThemeApp } from './themes/theme'

//Components
import Layout from './layouts/Layout'

//Style
import GlobalStyleConfig from './GlobalStyleConfig';

//pages
import Dashboard from './pages/dashboard/Dashboard';
import CategoryPage from './pages/categories/Category';
import ProductPage from './pages/products/Product';
import OrderPage from './pages/orders/Order';


function App() {

  const [darkmode, setDarkmode] = useState(false);

  const theme = createThemeApp(darkmode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyleConfig/>
      
      <Layout setdarkmode={setDarkmode}>
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/dashboard' replace/>}
          />

          <Route
            path='/dashboard'
            element={<Dashboard/>}
          />

          <Route
            path='/orders'
            element={<OrderPage/>}
          />

          <Route
            path='/products'
            element={<ProductPage/>}
          />

          <Route
            path='/categories'
            element={<CategoryPage/>}
          />

        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;