import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { PageHeader } from 'antd';

const Header = ({ home, title }) => {
  return <PageHeader title={!home && title} />;
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
