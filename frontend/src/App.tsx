import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material'
import Layout from './layouts/Layout'

import { createThemeApp } from './themes/theme'

//pages
import Dashboard from './pages/dashboard/Dashboard';
import { useState } from 'react';

function App() {

  const [darkmode, setDarkmode] = useState(false);

  const theme = createThemeApp(darkmode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            element={<div>Orders</div>}
          />

          <Route
            path='/products'
            element={<div>Products</div>}
          />

          <Route
            path='/categories'
            element={<div>Categories</div>}
          />

        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;