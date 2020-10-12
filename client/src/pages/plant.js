import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import PlantInfo from '../components/plantInfo';
import config from '../config';

import { Skeleton, Space } from 'antd';
import { navigate } from 'gatsby';

const TOKEN = config.token;

const Plant = (props) => {
  const [plant, setPlant] = useState(null);
  const plantID = props.params['*'];

  useEffect(() => {
    fetch(`https://trefle.io/api/v1/species/${plantID}?token=${TOKEN}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPlant(json.data);
      })
      .catch(() => {
        navigate('/404/');
      });
  }, [plantID]);

  console.log(plant);

  return (
    <Layout>
      {plant ? (
        <PlantInfo plant={plant} />
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
