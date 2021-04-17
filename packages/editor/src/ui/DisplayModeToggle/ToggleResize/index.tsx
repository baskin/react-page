import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useIsResizeMode,
    useSetResizeMode,
} from '../../../core/components/hooks';

type Props = {
    label: string;
};

const ToggleResize: React.FC<Props> = ({ label }) => {
    const isResizeMode = useIsResizeMode();
    const setResizeMode = useSetResizeMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                size='huge'
                // circular
                icon='expand arrows alternate'
                active={isResizeMode}
                primary={isResizeMode}
                onClick={setResizeMode}
            />}
        />
    );
};

export default React.memo(ToggleResize);
