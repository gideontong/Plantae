import React from 'react';
import { Link, navigate } from 'gatsby';
import { PageHeader, Button } from 'antd';
import useMobile from '../hooks/useMobile';

const Header = ({ sub }) => {
  const mobile = useMobile();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageHeader
      title={'Plantae 🌱'}
      subTitle={sub}
      onBack={goBack}
      extra={[
        <Link to='/id'>
          <Button type='primary'>Identify</Button>
        </Link>,
        <Link to='/'>
          <Button type='default'>Home</Button>
        </Link>,
        !mobile && (
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
