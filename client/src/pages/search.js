import React, { useState } from 'react';
import Layout from '../components/layout';
import SearchForm from '../components/searchForm';
import '../styles/result.css';

import { Link } from 'gatsby';
import { RightOutlined } from '@ant-design/icons';
import { Typography, Divider, List } from 'antd';

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
          <Title type='secondary' level={5}>
            Found {results.length} results.
          </Title>
          <List
            bordered
            dataSource={results}
            renderItem={(plant) =>
              plant.slug && (
                <Link to={`/plant/${plant.slug}`}>
                  <List.Item className='result-item' extra={<RightOutlined />}>
                    {plant.common_name}
                  </List.Item>
                </Link>
              )
            }
          />
        </>
      )}
    </Layout>
  );
};

export default SearchPage;
