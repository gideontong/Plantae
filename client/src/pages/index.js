import React, { useRef } from 'react';
import Layout from '../components/layout';
import PlantID from '../components/plantID';
import ScrollFade from '../components/scrollFade';
import Characteristics from '../components/characteristics';
import SearchIdentify from '../components/searchIdentify.js';
import TweenOne from 'rc-tween-one';

import { DownOutlined } from '@ant-design/icons';
import { Button, Space, Typography, Divider } from 'antd';
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
      <TweenOne
        animation={{
          opacity: 1,
          duration: 1000,
          delay: 800
        }}
        style={{ opacity: 0 }}
      >
        <Title style={classes.header}>{data?.site?.siteMetadata?.title}</Title>
      </TweenOne>
      <TweenOne
        animation={{
          opacity: 1,
          duration: 1000,
          delay: 2000
        }}
        style={{ opacity: 0 }}
      >
        <Title level={2}>{data?.site?.siteMetadata?.description}</Title>
      </TweenOne>

      <TweenOne
        animation={{
          opacity: 1,
          duration: 1000,
          delay: 3000
        }}
        style={{ opacity: 0 }}
      >
        <Divider />
        <Space>
          <Link to='/id'>
            <Button type='primary'>Get Started</Button>
          </Link>
          <Button onClick={executeScroll}>
            Learn More
            <DownOutlined />
          </Button>
        </Space>
      </TweenOne>

      <div ref={myRef}></div>
      <ScrollFade>
        <Title level={3}>
          1 million plant species, right at your fingertips
        </Title>
        <Divider />
        <PlantID />
      </ScrollFade>
      <ScrollFade left>
        <Title level={3}>View a multitude of information about each one</Title>
        <Divider />
        <Characteristics />
      </ScrollFade>
      <SearchIdentify />
      <Space style={{ justifyContent: 'center' }}>
        <Link to='/id'>
          <Button type='primary' size='large'>
            Start Learning
          </Button>
        </Link>
      </Space>
    </Layout>
  );
};

export default IndexPage;
