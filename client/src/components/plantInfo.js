import React from 'react';
import DetailsPane from './detailsPane';
import ImagesPane from './imagesPane';
import SourcesPane from './sourcesPane';

import { Divider, Typography, Row, Tabs } from 'antd';

const PlantInfo = ({ plant }) => {
  const { Title, Text } = Typography;
  const { TabPane } = Tabs;

  const { common_name, scientific_name, family_common_name, family } = plant;

  return (
    <>
      <Row>
        <Title>
          {common_name} {'🌱'}
        </Title>
      </Row>
      <Title type='secondary' level={4}>
        <i>{scientific_name}</i>
      </Title>
      <Text>{`Part of the ${family_common_name || family + ' family'}`}</Text>
      <a
        target='_blank'
        rel='noreferrer noopener'
        href={`https://wikipedia.com/wiki/${scientific_name}`}
      >
        Wikipedia
      </a>
      <Divider />
      <Tabs defaultActiveKey={0}>
        <TabPane tab='Details' key={0}>
          <DetailsPane {...plant} />
        </TabPane>
        <TabPane tab='Images' key={1}>
          <ImagesPane {...plant.images} />
        </TabPane>
        <TabPane tab='Sources' key={2}>
          <SourcesPane {...plant} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default PlantInfo;
