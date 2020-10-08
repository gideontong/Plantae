import React from 'react';
import { Parallax } from 'rc-scroll-anim';

const classes = {
  paraCont: { marginTop: '5rem', paddingTop: '4rem' }
};

const ScrollFade = ({ children, left }) => {
  const transX = 50;
  return (
    <div style={classes.paraCont}>
      <Parallax
        animation={{
          x: 0,
          opacity: 1,
          playScale: [0.4, 0.9]
        }}
        style={{
          transform: `translateX(${left ? transX * -1 : transX}px)`,
          opacity: 0
        }}
      >
        {children}
      </Parallax>
    </div>
  );
};

export default ScrollFade;
