// News.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, addNews, deleteNews } from '../store/newsSlice';
import { RootState, AppDispatch } from '../store';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from '../components/NewsItem';
import { Modal, Input, Button, Form, Typography } from 'antd';

const { Search } = Input;
const { Title } = Typography;

const News: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, status, error } = useSelector((state: RootState) => state.news);
  const [hasMore, setHasMore] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', description: '', image: '', fibonacci: 0 });
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews());
    }
  }, [status, dispatch]);

  const loadMoreNews = () => {
    // Implement infinite scroll logic if needed
    setHasMore(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddNews = () => {
    dispatch(addNews(newNews)).then(() => {
      setNewNews({ title: '', description: '', image: '', fibonacci: 0 });
      closeModal();
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNews(id));
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="single-page news">
      <Title level={1}>News Page</Title>
      <Button type="primary" onClick={openModal} style={{ marginBottom: '16px' }}>
        Add News
      </Button>
      <Search
        placeholder="Search news"
        onSearch={(value) => setSearchText(value)}
        style={{ marginBottom: '16px' }}
      />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      <InfiniteScroll
        className='news-list'
        dataLength={filteredNews.length}
        next={loadMoreNews}
        hasMore={hasMore}
        loader={<h4>Loading more news...</h4>}
      >
        {filteredNews.map((item: any) => (
          <NewsItem 
            key={item.id} 
            item={item} 
            onDelete={() => handleDelete(item.id)} />
        ))}
      </InfiniteScroll>

      <Modal
        title="Add News"
        open={modalIsOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddNews}>
            Add
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              value={newNews.title}
              onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={newNews.description}
              onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Image URL">
            <Input
              value={newNews.image}
              onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Fibonacci Number">
            <Input
              type="number"
              value={newNews.fibonacci}
              onChange={(e) => setNewNews({ ...newNews, fibonacci: parseInt(e.target.value) })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default News;
