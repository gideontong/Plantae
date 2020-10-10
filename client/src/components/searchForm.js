import React, { useState } from 'react';
import { Typography, Input, Switch, Row, Space, Checkbox, Select } from 'antd';

const SearchForm = () => {
  const [loading, setLoading] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const { Text } = Typography;
  const { Search } = Input;
  const { Option } = Select;
  return (
    <>
      <Space direction='vertical' size='middle' style={{ marginTop: '1.5rem' }}>
        <Row>
          <Space>
            <Text type={!advanced && 'secondary'}>Advanced Search</Text>
            <Switch onChange={() => setAdvanced(!advanced)} />
          </Space>
        </Row>
        <Row>
          <Search
            placeholder='Eg. coconut'
            enterButton='Search'
            onSearch={() => setLoading(!loading)}
            loading={loading}
          />
        </Row>

        {advanced && (
          <>
            <Row>
              <Space>
                <Checkbox>Edible results only</Checkbox>
                <Select
                  style={{ width: 150 }}
                  placeholder='Ligneous type'
                  key={'0'}
                >
                  <Option value='liana'>liana</Option>
                  <Option value='subshrub'>subshrub</Option>
                  <Option value='shrub'>shrub</Option>
                  <Option value='tree'>tree</Option>
                  <Option value='parasite'>parasite</Option>
                </Select>
                <Select
                  style={{ width: 150 }}
                  placeholder='Leaf texture'
                  key={'1'}
                >
                  <Option value='fine'>fine</Option>
                  <Option value='medium'>medium</Option>
                  <Option value='coarse'>coarse</Option>
                </Select>
              </Space>
            </Row>
          </>
        )}
      </Space>
    </>
  );
};

export default SearchForm;
