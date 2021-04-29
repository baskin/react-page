import React from 'react';
import { Button, Transition } from 'semantic-ui-react';
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
        undo: 'Undo',
        redo: 'Redo',
        edit: 'Edit blocks',
        insert: 'Add blocks',
        layout: 'Move blocks',
        resize: 'Resize blocks',
        preview: 'Preview page',
    };
    const addons = useOptions().components?.AdditionalButtonsSidebar || [];
    const actions: { [key: string]: any } = {
        undo: Undo, redo: Redo, edit: ToggleEdit, insert: ToggleInsert,
        layout: ToggleLayout, resize: ToggleResize, preview: TogglePreview
    }

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
                <Transition transitionOnMount animation='fade left'>
                    <Button.Group vertical size='huge'
                        style={{ margin: '1rem' }}
                        buttons={[
                            ...Object.entries(actions).map(([name, Component], index) => (
                                <Component
                                    key={index}
                                    label={t(defaultLabels[name])}
                                    className="react-page-controls-mode-toggle-control"
                                />
                            )),
                            ...addons
                        ]} />
                </Transition>
            </div>
        </div>
    );
};
