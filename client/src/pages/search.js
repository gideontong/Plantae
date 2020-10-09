import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import { Typography } from 'antd';

const SearchPage = () => {
  const { Title, Text } = Typography;
  return (
    <Layout>
      <Title level={1}>Search</Title>
      <Text type='secondary'>
        Don't know what you're looking for? Try{' '}
        <Link to='/id'>identifying</Link> instead.
      </Text>
    </Layout>
  );
};
export default SearchPage;
