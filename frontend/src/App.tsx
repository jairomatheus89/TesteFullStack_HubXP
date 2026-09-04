import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout'

//pages
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
      <Layout>
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
  );
}

export default App;