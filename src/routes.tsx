import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/Header';
import Footer from './components/Footer';

const { Content } = Layout;

// Lazy load the pages
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const News = React.lazy(() => import('./pages/News'));
const Profile = React.lazy(() => import('./pages/Profile'));

const AppRoutes: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Layout className='main-block'>

        <Header />
        
        <Content className="container" style={{ padding: '0 50px', marginTop: '20px' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/news" element={<News />} />
              <Route
                path="/profile"
                element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Content>

        <Footer />

      </Layout>
    </Router>
  );
};

export default AppRoutes;
