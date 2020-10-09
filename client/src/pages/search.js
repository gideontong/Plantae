import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import { Typography, Divider } from 'antd';
import SearchForm from '../components/searchForm';

const SearchPage = () => {
  const { Title, Text } = Typography;

  return (
    <Layout>
      <Title level={1}>Search</Title>
      <Text type='secondary'>
        Don't know what you're looking for? Try{' '}
        <Link to='/id'>identifying</Link> instead.
      </Text>
      <Divider />
      <Title level={4}>
        Enter a keyword related to your plant species below and let us do all
        the work.
      </Title>
      <SearchForm />
    </Layout>
  );
};

export default SearchPage;
