import React from 'react';
import { Card, Button } from 'antd';
import { isPrime } from '../utils/primeUtils';
import noImage from '../media/not-found.jpg';

interface NewsItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    image: string;
    fibonacci: number;
  };
  onDelete: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, onDelete }) => {
  return (
    <Card
      className='news-single-item'
      hoverable
      cover={
        <img 
          src={item.image ? item.image : noImage} 
          alt={item.title} 
          loading="lazy" 
        />
      }
      style={{ marginBottom: '16px' }}
    >
      <Card.Meta
        title={
          <>
            {item.title} <span>( {item.fibonacci} {isPrime(item.fibonacci) && <span> : Prime Number</span>})</span>
          </>
        }
        description={item.description}
      />
      <Button type="primary" onClick={onDelete} style={{ marginTop: '16px' }}>
        Delete
      </Button>
    </Card>
  );
};

export default NewsItem;
