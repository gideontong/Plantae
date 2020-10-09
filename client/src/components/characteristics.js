import React from 'react';
import { Typography } from 'antd';
import useMobile from '../hooks/useMobile';

const data = [
  {
    emoji: '📒',
    title: 'Common name',
    summ:
      "Don't speak Latin? Neither do we. See the common plant name in plain english."
  },
  {
    emoji: '🍇',
    title: 'Fruit color and shape',
    summ:
      'Certain fruit can sometimes be hard to identify. Your harvest will be bountiful once you know what to look for.'
  },
  {
    emoji: '💀',
    title: 'Toxicity level',
    summ:
      "It is HIGHLY recommended that you stay away from any toxic or poisonous plants. Please don't use this in a survival situation."
  },
  {
    emoji: '🌎',
    title: 'Native distribution',
    summ:
      'Where the plant can most commonly be found around the world. They really get around even without legs.'
  },
  {
    emoji: '📋',
    title: 'And many more...',
    summ: 'I ran out of emojis, just trust us. '
  }
];

const Characteristics = () => {
  const mobile = useMobile();
  const { Title, Text } = Typography;

  const classes = {
    emoji: {
      fontSize: '5rem',
      flex: 1,
      marginRight: '1rem',
      textAlign: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: mobile ? 'column' : 'row',
      alignItems: 'center',
      marginBottom: '1rem'
    }
  };

  return (
    <>
      {data.map(({ emoji, title, summ }) => (
        <div style={classes.container}>
          <div style={{ flex: 3 }}>
            <Title level={5} style={{ marginBottom: 0 }}>
              {title}
            </Title>
            <Text type='secondary'>{summ}</Text>
          </div>
          <Typography style={classes.emoji}>{emoji}</Typography>
        </div>
      ))}
    </>
  );
};

export default Characteristics;
