import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useIsInsertMode,
    useSetInsertMode,
} from '../../../core/components/hooks';

type Props = {
    label: string;
};

const ToggleInsert: React.FC<Props> = ({ label }) => {
    const isInsertMode = useIsInsertMode();
    const setInsertMode = useSetInsertMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                size='huge'
                // circular
                icon='add'
                active={isInsertMode}
                primary={isInsertMode}
                onClick={setInsertMode}
            />}
        />
    );
};

export default React.memo(ToggleInsert);
