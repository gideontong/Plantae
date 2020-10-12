import React, { memo } from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps';

import world from './world.json';
import '../styles/mapStyles.css';

const DistMap = ({ setTooltipContent, countries }) => {
  return (
    <div style={{ border: '#ccc 1px solid' }}>
      <ComposableMap
        data-tip=''
        projectionConfig={{ scale: 175, center: [15, 0] }}
      >
        <ZoomableGroup>
          <Geographies geography={world}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { NAME } = geo.properties;
                const includes = countries.includes(NAME);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (includes) setTooltipContent(`${NAME}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    style={{
                      default: {
                        fill: includes ? '#F53' : '#D6D6DA'
                      },
                      hover: {
                        fill: includes ? '#F53' : '#D6D6DA'
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(DistMap);
