import React from 'react';
import { Link } from 'gatsby';
import { Parallax } from 'rc-scroll-anim';
import { Typography, Divider } from 'antd';

const SearchIdentify = () => {
  const { Text, Title } = Typography;

  return (
    <Parallax
      animation={{ opacity: 1, playScale: [0.3, 0.9] }}
      style={{
        opacity: 0,
        marginTop: '7rem',
        marginBottom: '5rem'
      }}
    >
      <Title level={3}>Plant the seed of discovery and learning</Title>
      <Divider />
      <Typography style={{ fontSize: '5rem', textAlign: 'center' }}>
        🔬
      </Typography>
      <Title level={4}>Have no idea what you're looking at?</Title>
      <Text>
        Use the robust <Link to='/id'>identify</Link> feature to quickly and
        easily pinpoint the species with just a few pieces of information.
      </Text>
      <Typography style={{ fontSize: '5rem', textAlign: 'center' }}>
        🔍
      </Typography>
      <Title level={4}>Already know what to look for?</Title>
      <Text>
        Flex your botanical knowledge and go straight to the{' '}
        <Link to='/search'>search</Link> to skip the identifying process. Just
        enter a keyword and explore the data.
      </Text>
    </Parallax>
  );
};

export default SearchIdentify;
