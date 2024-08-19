import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

const Profile: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="single-page profile">
      <Title level={1}>Profile Page</Title>
      <h3>Welcome to your profile!</h3>
    </div>
  );
};

export default Profile;
