import React, { useState } from 'react';
import {
  Progress,
  Card,
  Button,
  Space,
  Select,
  Typography,
  Spin,
  Divider,
  Statistic,
  Row
} from 'antd';

const IdForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState('602');
  const [foliageColor, setFoliageColor] = useState('green');
  const [flowerColor, setFlowerColor] = useState('purple');
  const [fruitColor, setFruitColor] = useState('red');

  const { Option } = Select;
  const { Title } = Typography;

  const nextClick = () => {
    if (step === questions.length - 1) {
      setLoading(true);
    } else {
      setStep(step + 1);
    }
  };

  const backClick = () => {
    setStep(step - 1);
  };

  const classes = {
    select: { width: 190, marginTop: '1rem' },
    card: { marginTop: '2rem', minHeight: '200px', paddingBottom: 0 }
  };

  const questions = [
    {
      q: 'Where was this plant located?',
      form: (
        <Select
          key='0'
          value={location}
          style={classes.select}
          onChange={setLocation}
        >
          <Option value={'602'}>North-Central USA</Option>,
          <Option value={'603'}>Northeastern USA</Option>
          <Option value={'601'}>Northwestern USA</Option>
          <Option value={'605'}>South-Central USA</Option>
          <Option value={'606'}>Southeastern USA</Option>
          <Option value={'604'}>Southwestern USA</Option>
          <Option value={'596'}>Subarctic America</Option>
        </Select>
      )
    },
    {
      q: 'What color is the foliage?',
      form: (
        <Select
          key='1'
          value={foliageColor}
          style={classes.select}
          onChange={setFoliageColor}
        >
          <Option value={'green'}>Green</Option>,
          <Option value={'red'}>Red</Option>,
          <Option value={'blue'}>Blue</Option>,
          <Option value={'purple'}>Purple</Option>,
          <Option value={'orange'}>Orange</Option>,
          <Option value={'brown'}>Brown</Option>,
          <Option value={'yellow'}>Yellow</Option>
        </Select>
      )
    },
    {
      q: 'What color are the flowers?',
      form: (
        <Select
          key='2'
          value={flowerColor}
          style={classes.select}
          onChange={setFlowerColor}
        >
          <Option value={'green'}>Green</Option>,
          <Option value={'red'}>Red</Option>,
          <Option value={'blue'}>Blue</Option>,
          <Option value={'purple'}>Purple</Option>,
          <Option value={'orange'}>Orange</Option>,
          <Option value={'brown'}>Brown</Option>,
          <Option value={'yellow'}>Yellow</Option>
        </Select>
      )
    },
    {
      q: 'What color is the fruit?',
      form: (
        <Select
          key='3'
          value={fruitColor}
          style={classes.select}
          onChange={setFruitColor}
        >
          <Option value={'green'}>Green</Option>,
          <Option value={'red'}>Red</Option>,
          <Option value={'blue'}>Blue</Option>,
          <Option value={'purple'}>Purple</Option>,
          <Option value={'orange'}>Orange</Option>,
          <Option value={'brown'}>Brown</Option>,
          <Option value={'yellow'}>Yellow</Option>
        </Select>
      )
    },
    {
      q: 'Please verify the plant information.',
      form: (
        <Space direction='vertical'>
          <Row>
            <Statistic title='Location' value={`Zone ${location}`} />
          </Row>
          <Row>
            <Statistic title='Foliage color' value={foliageColor} />
          </Row>
          <Row>
            <Statistic title='Flower color' value={flowerColor} />
          </Row>
          <Row>
            <Statistic title='Fruit color' value={fruitColor} />
          </Row>
        </Space>
      )
    }
  ];

  const ExtraButtons = () => {
    return (
      <Space
        style={{
          marginTop: '2rem'
        }}
      >
        <Button loading={loading} type='primary' onClick={nextClick}>
          {step === questions.length - 1 ? 'Submit' : 'Next'}
        </Button>
        {step > 0 && (
          <Button type='default' onClick={backClick} disabled={loading}>
            Back
          </Button>
        )}
      </Space>
    );
  };

  const title = questions[step].q;
  const percent = (step / (questions.length - 1)) * 100;

  return (
    <>
      <Progress percent={percent} style={{ marginTop: '1rem' }} />
      <Card style={classes.card}>
        <Title level={3}>{title}</Title>
        <Divider />
        {questions[step].form}
        <br />
        <ExtraButtons />
      </Card>
    </>
  );
};

export default IdForm;
