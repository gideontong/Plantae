import React from 'react';
import PropTypes from 'prop-types';
import SEO from './seo';
import Header from './header';
import '../styles/antd.css';

import { useStaticQuery, graphql } from 'gatsby';
import { BackTop, Typography } from 'antd';

const Layout = ({ children, home, sub }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const classes = {
    main: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
      minHeight: '100vh',
      maxWidth: '680px',
      paddingTop: '5rem',
      paddingBottom: '2rem',
      paddingLeft: '3rem',
      paddingRight: '3rem'
    },
    footer: {
      padding: '1rem',
      marginTop: 'auto',
      backgroundColor: '#eeeeee',
      textAlign: 'center'
    }
  };

  const Copyright = () => (
    <Typography variant='body2' color='textSecondary'>
      {'Copyright © '}
      <a
        color='inherit'
        rel='noreferrer'
        target='_blank'
        href='https://github.com/gideontong/kiwi-hackathon'
      >
        Kosher Kiwis
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );

  const headerProps = { sub };

  return (
    <>
      <BackTop />
      <SEO title={data?.site?.siteMetadata?.title} />
      {!home && <Header {...headerProps} />}
      <main style={classes.main}>{children}</main>
      <footer style={classes.footer}>
        <Copyright />
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
