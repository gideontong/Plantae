import React, { useRef } from 'react';
import Layout from '../components/layout';
import PlantID from '../components/plantID';
import ScrollFade from '../components/scrollFade';
import Characteristics from '../components/characteristics';

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
      top: myRef.current.offsetTop + 100,
      behavior: 'smooth'
    });
  };

  const classes = {
    header: { fontSize: '3.75rem' }
  };

  const { Title } = Typography;

  return (
    <Layout home>
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
      <div ref={myRef}></div>
      <ScrollFade>
        <Title level={3}>
          1 million plant species, right at your fingertips
        </Title>
        <PlantID />
      </ScrollFade>
      <ScrollFade left>
        <Title level={3}>
          View a multitude of characteristics about each one
        </Title>
        <Characteristics />
      </ScrollFade>
    </Layout>
  );
};

export default IndexPage;
