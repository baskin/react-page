import React from 'react';
import { Button } from 'semantic-ui-react';
import { useOptions, useUiTranslator } from '../../core/components/hooks';
import ToggleEdit from './ToggleEdit/index';
import ToggleInsert from './ToggleInsert/index';
import ToggleLayout from './ToggleLayout/index';
import TogglePreview from './TogglePreview/index';
import ToggleResize from './ToggleResize/index';
import { Undo, Redo } from './UndoRedo';

const getStickyNessstyle = (stickyness?: StickyNess): React.CSSProperties => {
  if (
    !stickyness ||
    (!stickyness.shouldStickToBottom && !stickyness.shouldStickToTop)
  ) {
    return {
      position: 'fixed',
    };
  }

  return {
    position: 'absolute',
    bottom: stickyness.shouldStickToBottom ? 0 : 'auto',
    top: stickyness.shouldStickToTop ? 0 : 'auto',
    right: -stickyness.rightOffset || 0,
  };
};

export type StickyNess = {
  shouldStickToTop: boolean;
  shouldStickToBottom: boolean;
  rightOffset: number;
  stickyElRef?: React.Ref<HTMLDivElement>;
};
export const DisplayModeToggle: React.SFC<{
  stickyNess?: StickyNess;
}> = ({ stickyNess }) => {
  const { t } = useUiTranslator();
  const defaultLabels = {
    edit: 'Edit blocks',
    insert: 'Add blocks',
    layout: 'Move blocks',
    resize: 'Resize blocks',
    preview: 'Preview page',
  };
  const addons = useOptions().components?.AdditionalButtonsSidebar || [];
  const actions = [
    // eslint-disable-next-line react/jsx-key
    { action: <Undo label="undo" /> },
    { action: <Redo label="redo" /> },
    { action: <ToggleEdit label={t(defaultLabels.edit)} /> },
    { action: <ToggleInsert label={t(defaultLabels.insert)} /> },
    { action: <ToggleLayout label={t(defaultLabels.layout)} /> },
    { action: <ToggleResize label={t(defaultLabels.resize)} /> },
    { action: <TogglePreview label={t(defaultLabels.preview)} /> },
    ...addons.map(a => ({ action: a }))
  ];
  return (
    <div
      className="react-page-controls-mode-toggle-control-group"
      style={{
        position: 'fixed',
        zIndex: 899,
        bottom: 0,
        right: 0,
        display: 'flex',
        maxHeight: '100%',
        ...getStickyNessstyle(stickyNess),
      }}
    >
        <div ref={stickyNess.stickyElRef}>
      <Button.Group vertical 
        style={{ margin: '1rem' }}
        buttons={
        actions.map(({ action }, index) => (
          <div
            key={index}
            className="react-page-controls-mode-toggle-control"
            style={{
              animationDelay: (actions.length - index) * 150 + 'ms',
            }}
          >
            {action}
            <div className="react-page-controls-mode-toggle-clearfix" />
          </div>
        ))} />
        </div>
    </div>
  );
};
