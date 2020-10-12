import React, { useState } from 'react';
import DistMap from '../components/distMap';
import ReactTooltip from 'react-tooltip';

import { Collapse, List, Button, Typography, Modal, Space } from 'antd';

import {
  MinusOutlined,
  PlusOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const DetailsPane = ({
  distribution,
  edible_part,
  fruit_or_seed,
  flower,
  foliage,
  duration,
  common_names,
  specifications,
  genus
}) => {
  const [content, setContent] = useState('');
  const [openPanels, setOpenPanels] = useState(null);
  const [allOpen, setAllOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { Title, Text, Paragraph } = Typography;
  const { Panel } = Collapse;

  const openAllPanels = () => {
    if (allOpen) {
      setOpenPanels(null);
    } else {
      setOpenPanels([0, 1, 2, 3, 4, 5, 6, 7, 8]);
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
        <Panel header='Native Distribution 🌎' key={0}>
          <DistMap
            setTooltipContent={setContent}
            countries={distribution.native}
          />
          <ReactTooltip>{content}</ReactTooltip>
        </Panel>
        <Panel header='Edible Parts 🍽️' key={1}>
          {edible_part ? (
            <List
              bordered
              dataSource={edible_part}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          ) : (
            <Text>None</Text>
          )}
        </Panel>
        <Panel header='Fruit 🍓' key={2}>
          <Title level={5}>Visible:</Title>
          <Text>{fruit_or_seed.conspicuous ? 'Yes' : 'No'}</Text>
          {fruit_or_seed.conspicuous && (
            <>
              <Title level={5}>Color(s):</Title>
              <List
                bordered
                dataSource={fruit_or_seed.color}
                renderItem={(color) => <List.Item>{color}</List.Item>}
              />
              {fruit_or_seed.shape && (
                <>
                  <Title level={5}>Shape:</Title>
                  <Text>{fruit_or_seed.shape}</Text>
                </>
              )}
            </>
          )}
        </Panel>
        <Panel header='Flower 🌺' key={3}>
          <Title level={5}>Visible:</Title>
          <Text>{flower.conspicuous ? 'Yes' : 'No'}</Text>
          {flower.conspicuous && (
            <>
              <Title level={5}>Color(s):</Title>
              <List
                bordered
                dataSource={flower.color}
                renderItem={(color) => <List.Item>{color}</List.Item>}
              />
            </>
          )}
        </Panel>
        <Panel header='Leaves 🌿' key={4}>
          <Title level={5}>Texture:</Title>
          <Text>{foliage.texture || 'N/A'}</Text>
          <Title level={5}>Retained all year:</Title>
          <Text>{foliage.leaf_retention ? 'Yes' : 'No'}</Text>
          <Title level={5}>Color(s):</Title>
          {foliage.color ? (
            <List
              bordered
              dataSource={foliage.color}
              renderItem={(color) => <List.Item>{color}</List.Item>}
            />
          ) : (
            <Text>N/A</Text>
          )}
        </Panel>
        <Panel header='Toxicity 💀' key={5}>
          <Space>
            <Button
              danger
              icon={<ExclamationCircleOutlined />}
              onClick={() => setModalVisible(true)}
            >
              DISCLAIMER
            </Button>
            <Text>{specifications.toxicity || 'No data'}</Text>
          </Space>
        </Panel>
        <Panel header='Seasonal lifecycle 📅' key={6}>
          {duration ? (
            <List
              bordered
              dataSource={duration}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          ) : (
            <Text>None</Text>
          )}
        </Panel>
        <Panel header={'Genus 🧬'} key={7}>
          <Text>
            <i>{genus}</i>
          </Text>
        </Panel>
        <Panel
          header={`Alternate names 🌐 (${common_names.eng.length})`}
          key={8}
        >
          <List
            bordered
            dataSource={common_names.eng}
            renderItem={(key) => <List.Item>{key}</List.Item>}
          />
        </Panel>
      </Collapse>
      <Modal
        title={
          <>
            <Space>
              <ExclamationCircleOutlined />
              <Text>Toxicity Warning</Text>
            </Space>
          </>
        }
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <Paragraph>
          We are not professional botanists or toxicologists. Take any
          information displayed in this application with a grain of salt. The
          authors, any contributors, and any images or infographics used are not
          responsible if you hurt yourself or others. Plantae is primarily an
          educational resource and not a survival guide to edible plants. Just
          because this application states a plant is not toxic to eat does not
          mean you should eat it. Stay safe and use common sense.
        </Paragraph>
      </Modal>
    </>
  );
};

export default DetailsPane;
