import React, { useState } from 'react';
import { Typography, Input, Switch, Row, Space, Checkbox, Select } from 'antd';

const TOKEN = '';

const SearchForm = ({ callback }) => {
  const [loading, setLoading] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [error, setError] = useState(null);
  const { Text } = Typography;
  const { Search } = Input;
  const { Option } = Select;

  const search = (query) => {
    setError(null);
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }
    setLoading(true);
    fetch(`https://trefle.io/api/v1/species/search?q=${query}&token=${TOKEN}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        callback(json.data);
        setLoading(false);
      });
  };

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
            maxLength={40}
            disabled={loading}
            placeholder='Eg. coconut'
            enterButton='Search'
            onSearch={search}
            loading={loading}
          />
        </Row>
        <Text type='danger'>{error}</Text>

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
