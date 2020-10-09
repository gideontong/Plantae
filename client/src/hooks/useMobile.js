import { useState, useEffect } from 'react';

const useMobile = () => {
  const [width, setWidth] = useState(null);

  useEffect(() => setWidth(window.innerWidth), []);
  return width < 550;
};

export default useMobile;
