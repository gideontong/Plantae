import React from 'react';
import Layout from '../components/layout';
import IdForm from '../components/idForm';

import { Link } from 'gatsby';
import { Typography, Divider } from 'antd';

const IdentifyPage = () => {
  const { Title, Text } = Typography;

  return (
    <Layout>
      <Title level={1}>Identify 🔬</Title>
      <Text type='secondary'>
        Already know what you're looking for? Try{' '}
        <Link to='/search'>searching</Link> instead.
      </Text>
      <Divider />
      <Title level={4}>
        To accurately identify the plant you've found, please answer the
        questions below.
      </Title>
      <IdForm />
    </Layout>
  );
};
export default IdentifyPage;
