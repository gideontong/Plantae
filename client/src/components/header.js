import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { PageHeader, Button } from 'antd';

const Header = ({ sub }) => {
  const [width, setWidth] = useState(null);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => setWidth(window.innerWidth), []);

  return (
    <PageHeader
      title={'Plantae 🌱'}
      subTitle={sub}
      onBack={goBack}
      extra={[
        <Link to='/search'>
          <Button type='primary'>Search</Button>
        </Link>,
        <Link to='/'>
          <Button type='default'>Home</Button>
        </Link>,
        width > 500 && (
          <Button type='default'>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://github.com/gideontong/kiwi-hackathon'
            >
              GitHub
            </a>
          </Button>
        )
      ]}
    />
  );
};

export default Header;
