import React from 'react';
import { Icon } from 'semantic-ui-react';
import { lazyLoad } from '@react-page/editor';

import { iconStyle } from '../common/styles';
import type { VideoHtmlRendererProps } from '../types/renderer';


// react player is big, better lazy load it.
const ReactPlayer = lazyLoad(() => import('react-player'));

const Display: React.FC<VideoHtmlRendererProps> = ({ data, readOnly }) =>
  data?.src ? (
    <div style={{ position: 'relative', height: 0, paddingBottom: '65.25%' }}>
      {readOnly ? null : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          }}
        />
      )}
      <ReactPlayer
        url={data?.src}
        height="100%"
        width="100%"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  ) : (
    <div className="react-page-plugins-content-video-placeholder">
      <Icon name='play circle outline' style={iconStyle} />
    </div>
  );

export default Display;
