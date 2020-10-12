import React, { useState } from 'react';

import { Collapse, List, Image, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const ImagesPane = ({ flower, fruit, leaf }) => {
  const [openPanels, setOpenPanels] = useState(null);
  const [allOpen, setAllOpen] = useState(false);

  const { Panel } = Collapse;

  const listGutter = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 3
  };

  const openAllPanels = () => {
    if (allOpen) {
      setOpenPanels(null);
    } else {
      setOpenPanels([0, 1, 2]);
    }
    setAllOpen(!allOpen);
  };

  const renderImage = (item) => (
    <List.Item>
      <Image src={item.image_url} />
    </List.Item>
  );

  return (
    <>
      <Button
        onClick={openAllPanels}
        icon={allOpen ? <MinusOutlined /> : <PlusOutlined />}
        type='link'
        style={{ maxWidth: '130px', marginBottom: '1rem' }}
      >
        {allOpen ? 'Collapse' : 'Expand'} all
      </Button>
      <Collapse activeKey={openPanels} onChange={setOpenPanels}>
        <Panel header='Flowers 🌺' key={0}>
          <List
            grid={listGutter}
            dataSource={flower}
            renderItem={renderImage}
          />
        </Panel>
        <Panel header='Fruits 🍓' key={1}>
          <List grid={listGutter} dataSource={fruit} renderItem={renderImage} />
        </Panel>
        <Panel header='Leaves 🌿' key={2}>
          <List grid={listGutter} dataSource={leaf} renderItem={renderImage} />
        </Panel>
      </Collapse>
    </>
  );
};

export default ImagesPane;
