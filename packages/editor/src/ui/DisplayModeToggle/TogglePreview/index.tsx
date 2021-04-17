import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useIsPreviewMode,
    useSetPreviewMode,
} from '../../../core/components/hooks';

type Props = {
    label: string;
};

const TogglePreview: React.FC<Props> = ({ label }) => {
    const isPreviewMode = useIsPreviewMode();
    const setIsPreviewMode = useSetPreviewMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                size='huge'
                // circular
                icon='laptop'
                active={isPreviewMode}
                primary={isPreviewMode}
                onClick={setIsPreviewMode}
            />}
        />
    );
};

export default React.memo(TogglePreview);
