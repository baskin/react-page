import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useRedo,
    useCanUndo,
    useCanRedo,
    useUndo
} from '../../../core/components/hooks';

type Props = {
    label: string;
};

export const Undo: React.FC<Props> = React.memo(({ label }) => {
    const undo = useUndo();
    const canUndo = useCanUndo();
    return (
        <Popup inverted content={label} trigger={
            <Button
                size='huge'
                circular
                active
                icon='undo'
                onClick={undo}
                basic={!canUndo}
            />}
        />
    );
});

export const Redo: React.FC<Props> = React.memo(({ label }) => {
    const canRedo = useCanRedo();
    const redo = useRedo();
    return (
        <Popup inverted content={label} trigger={
            <Button
                size='huge'
                circular
                active
                icon='redo'
                onClick={redo}
                basic={!canRedo}
            />}
        />
    );
});
