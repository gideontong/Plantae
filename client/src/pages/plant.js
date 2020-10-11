import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { Typography, Skeleton, Space } from 'antd';
import { navigate } from 'gatsby';

const TOKEN = '';

const Plant = (props) => {
  const plantID = props.params['*'];
  const { Title } = Typography;
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    fetch(`https://trefle.io/api/v1/species/${plantID}?token=${TOKEN}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPlant(json.data);
      })
      .catch(() => {
        navigate('/404');
      });
  }, []);

  return (
    <Layout>
      {plant ? (
        <>
          <Title style={{ marginBottom: 0 }}>{plant.common_name}</Title>
          <Title type='secondary' level={4}>
            <i>{plant.scientific_name}</i>
          </Title>
        </>
      ) : (
        <Space direction='vertical'>
          <Skeleton.Input active size='large' style={{ width: 350 }} />
          <Skeleton paragraph={{ rows: 4 }} active />
          <Skeleton paragraph={{ rows: 5 }} active />
        </Space>
      )}
    </Layout>
  );
};

export default Plant;
