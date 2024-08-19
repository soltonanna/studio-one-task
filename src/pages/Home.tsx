import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <div className='single-page home'>
      <Title level={1}>Welcome to the Home Page!</Title>
    </div>
  );
};

export default Home;