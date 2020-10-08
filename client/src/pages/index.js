import React, { useRef } from 'react';
import Layout from '../components/layout';
import PlantID from '../components/plantID';

import { Parallax } from 'rc-scroll-anim';
import { DownOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { useStaticQuery, graphql, Link } from 'gatsby';

const IndexPage = () => {
  const myRef = useRef(null);
  const data = useStaticQuery(graphql`
    query SiteDescriptionQuery {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `);

  const executeScroll = () => {
    window.scrollTo({
      top: myRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const classes = {
    header: {
      fontSize: '3.75rem'
    }
  };

  const { Title } = Typography;

  return (
    <Layout>
      <Title style={classes.header}>{data?.site?.siteMetadata?.title}</Title>
      <Title level={2}>{data?.site?.siteMetadata?.description}</Title>
      <Space>
        <Link to='/search'>
          <Button type='primary'>Get Started</Button>
        </Link>
        <Button onClick={executeScroll}>
          Learn More
          <DownOutlined />
        </Button>
      </Space>
      <div
        style={{ marginTop: '25vh', marginBottom: '20vh', paddingTop: '2rem' }}
        ref={myRef}
      >
        <Parallax
          animation={{
            x: 0,
            opacity: 1,
            playScale: [0.4, 0.9]
          }}
          style={{
            transform: 'translateX(50px)',
            opacity: 0
          }}
        >
          <Title level={3}>
            1 million plant species, right at your fingertips
          </Title>
          <PlantID />
        </Parallax>
      </div>
    </Layout>
  );
};

export default IndexPage;
