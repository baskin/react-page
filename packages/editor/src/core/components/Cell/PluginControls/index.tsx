import React from 'react';
import { Tab } from 'semantic-ui-react';
import { AutoformControls } from '../../../../ui';
import type {
  CellPluginComponentProps,
  ControlsDef,
  ControlsDefList,
} from '../../../types';

const ControlsList: React.FC<{
  controls: ControlsDefList<unknown>;
  componentProps: CellPluginComponentProps<unknown>;
}> = React.memo(({ controls, componentProps }) => {
  return (
      <Tab grid={{ paneWidth: 13, tabWidth: 3 }}
        menu={{ fluid: true, vertical: true, tabular: false, pointing: true }}
        panes={controls.map(t => ({ 
            key: t.title,
            menuItem: t.title,
            render: () => <Tab.Pane>
                <Controls controls={t.controls} componentProps={componentProps} />
            </Tab.Pane> })
        )}
      >
      </Tab>
  );
});

const Controls: React.FC<{
  controls: ControlsDef<unknown>;
  componentProps: CellPluginComponentProps<unknown>;
}> = React.memo(({ controls, componentProps }) => {
  let pluginControls = null;
  if (Array.isArray(controls)) {
    return <ControlsList componentProps={componentProps} controls={controls} />;
  }

  if (controls?.type === 'custom') {
    const { Component } = controls;
    pluginControls = <Component {...componentProps} {...controls} />;
  } else if (controls?.type === 'autoform') {
    pluginControls = <AutoformControls {...componentProps} {...controls} />;
  }
  return pluginControls
});

const PluginControls: React.FC<{
  controls: ControlsDef<unknown>;
  componentProps: CellPluginComponentProps<unknown>;
}> = ({ controls, componentProps }) => {
  return (
    <div
      style={{
        maxHeight: '75vh', // TODO overflow?
        // if it has tabs, stretch to avoid jumping tabs
        overflow: 'hidden auto',
        width: Array.isArray(controls) ? '100vw' : undefined,
        maxWidth: '100%',
      }}
    >
      <Controls controls={controls} componentProps={componentProps} />
    </div>
  );
};

export default React.memo(PluginControls);
