import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useIsLayoutMode,
    useSetLayoutMode,
} from '../../../core/components/hooks';

type Props = {
    label: string;
};

const ToggleLayout: React.FC<Props> = ({ label }) => {
    const isLayoutMode = useIsLayoutMode();
    const setLayoutMode = useSetLayoutMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                size='huge'
                // circular
                icon='block layout'
                active={isLayoutMode}
                primary={isLayoutMode}
                onClick={setLayoutMode}
            />}
        />
    );
};

export default React.memo(ToggleLayout);
