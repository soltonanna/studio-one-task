import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { Menu, Button } from 'antd';


const Header: React.FC = () => {
  const menuItems = [
    { label: <Link to="/">Home</Link>, key: 'home' },
    { label: <Link to="/news">News</Link>, key: 'news' },
    { label: <Link to="/profile">Profile</Link>, key: 'profile' },
  ];
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <header>
      <div className="container">
        <Menu theme="dark" mode="horizontal" items={menuItems} className="menu" />
       
        { isAuthenticated && (
          <Button type="primary" onClick={handleLogout} className="logout-button">
            Logout
          </Button>
        ) }
      </div>
    </header>
  );
};

export default Header;
