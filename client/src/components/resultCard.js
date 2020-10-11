import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'gatsby';

const ResultCard = ({
  common_name,
  image_url,
  family_common_name,
  scientific_name,
  id,
  slug
}) => {
  const { Text, Title } = Typography;

  return (
    <Link to={`/plant/${slug}`}>
      <Card
        title={common_name}
        hoverable
        style={{ width: '300px' }}
        cover={
          <img
            alt='image'
            src={image_url}
            style={{ height: '250px', padding: '1rem', borderRadius: '20px' }}
          />
        }
      >
        <Title level={4}>{family_common_name}</Title>
        <Title level={5}>{scientific_name}</Title>
        <Text type='secondary'>{id}</Text>
      </Card>
    </Link>
  );
};

export default ResultCard;
