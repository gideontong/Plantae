import React, { useState } from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import { Typography, Divider, Space } from 'antd';
import SearchForm from '../components/searchForm';
import ResultCard from '../components/resultCard';

const SearchPage = () => {
  const [results, setResults] = useState(null);
  const { Title, Text } = Typography;

  return (
    <Layout>
      <Title level={1}>Search 🔍</Title>
      <Text type='secondary'>
        Don't know what you're looking for? Try{' '}
        <Link to='/id'>identifying</Link> instead.
      </Text>
      <Divider />
      <Title level={4}>
        Enter a keyword related to your plant species below and let us do all
        the work.
      </Title>
      <SearchForm callback={setResults} />
      {results && (
        <>
          <Divider />
          <Text type='secondary'>Found {results.length} results.</Text>
          <Space
            direction='vertical'
            size='large'
            style={{ alignItems: 'center' }}
          >
            {results.map((plant) => (
              <ResultCard {...plant} />
            ))}
          </Space>
        </>
      )}
    </Layout>
  );
};

export default SearchPage;
