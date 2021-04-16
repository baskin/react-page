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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Tab menu={{ fluid: false, vertical: true, tabular: false }}
        panes={controls.map(t => ({ 
            key: t.title,
            menuItem: t.title,
            render: () => <Tab.Pane>
                <Controls controls={t.controls} componentProps={componentProps} />
            </Tab.Pane> })
        )}
      >
      </Tab>
    </div>
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
  return <div style={{ overflow: 'visible', flex: 1 }}>{pluginControls}</div>;
});

const PluginControls: React.FC<{
  controls: ControlsDef<unknown>;
  componentProps: CellPluginComponentProps<unknown>;
}> = ({ controls, componentProps }) => {
  return (
    <div
      style={{
        maxHeight: '50vh',
        // if it has tabs, stretch to avoid jumping tabs
        width: Array.isArray(controls) ? '100vw' : undefined,
        maxWidth: '100%',
        display: 'flex',
      }}
    >
      <Controls controls={controls} componentProps={componentProps} />
    </div>
  );
};

export default React.memo(PluginControls);
