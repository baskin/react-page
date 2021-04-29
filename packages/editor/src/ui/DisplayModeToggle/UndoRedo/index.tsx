import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useRedo,
    useCanUndo,
    useCanRedo,
    useUndo
} from '../../../core/components/hooks';


export const Undo: React.FC = React.memo((props: any) => {
    const { label, ...buttonProps }  = props;
    const undo = useUndo();
    const canUndo = useCanUndo();
    return (
        <Popup inverted content={label} trigger={
            <Button
                active
                icon='undo alternate'
                onClick={undo}
                // primary={canUndo}
                disabled={!canUndo}
                {...buttonProps}
            />}
        />
    );
});

export const Redo: React.FC = React.memo((props: any) => {
    const { label, ...buttonProps }  = props;
    const canRedo = useCanRedo();
    const redo = useRedo();
    return (
        <Popup inverted content={label} trigger={
            <Button
                active
                icon='redo alternate'
                onClick={redo}
                // primary={canRedo}
                disabled={!canRedo}
                {...buttonProps}
            />}
        />
    );
});
