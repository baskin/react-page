import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useIsPreviewMode,
    useSetPreviewMode,
} from '../../../core/components/hooks';


const TogglePreview: React.FC = (props: any) => {
    const { label, ...buttonProps }  = props;
    const isPreviewMode = useIsPreviewMode();
    const setIsPreviewMode = useSetPreviewMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                icon='laptop'
                active={isPreviewMode}
                primary={isPreviewMode}
                onClick={setIsPreviewMode}
                {...buttonProps}
            />}
        />
    );
};

export default React.memo(TogglePreview);
