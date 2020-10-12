import React, { useState } from 'react';

import { Collapse, List, Button, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const SourcesPane = ({ author, bibliography, year, sources }) => {
  const [openPanels, setOpenPanels] = useState(null);
  const [allOpen, setAllOpen] = useState(false);

  const { Panel } = Collapse;
  const { Text } = Typography;

  const openAllPanels = () => {
    if (allOpen) {
      setOpenPanels(null);
    } else {
      setOpenPanels([0, 1, 2, 3]);
    }
    setAllOpen(!allOpen);
  };

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
        <Panel header='Author ✏️' key={0}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://wikipedia.com/wiki/${author}`}
          >
            {author}
          </a>
        </Panel>
        <Panel header='Bibliography 📖' key={1}>
          <Text>{bibliography}</Text>
        </Panel>
        <Panel header='First published 📜' key={2}>
          <Text>{year}</Text>
        </Panel>
        <Panel header='Citations 📎' key={3}>
          <List
            bordered
            dataSource={sources}
            renderItem={(source) => (
              <List.Item>
                <a target='_blank' rel='noopener noreferrer' href={source.url}>
                  {source.name}
                </a>
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
    </>
  );
};

export default SourcesPane;
