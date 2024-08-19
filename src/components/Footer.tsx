import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';


const Footer: React.FC = () => {
  const menuItems = [
    { label: <Link to="/">Home</Link>, key: 'home' },
    { label: <Link to="/news">News</Link>, key: 'news' },
    { label: <Link to="/profile">Profile</Link>, key: 'profile' },
  ];

  return (
    <footer style={{ textAlign: 'center' }}>
      <div className='container'>
        <Menu mode="horizontal" items={menuItems} className="menu" />
      </div>
      <div className='copyright'>©2024 Sultanova Anahit - test task for "Studio One" </div>
    </footer>
  );
};

export default Footer;
