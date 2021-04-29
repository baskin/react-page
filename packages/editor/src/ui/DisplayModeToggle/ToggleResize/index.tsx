import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useIsResizeMode,
    useSetResizeMode,
} from '../../../core/components/hooks';


const ToggleResize: React.FC = (props: any) => {
    const { label, ...buttonProps }  = props;
    const isResizeMode = useIsResizeMode();
    const setResizeMode = useSetResizeMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                icon='expand arrows alternate'
                active={isResizeMode}
                primary={isResizeMode}
                onClick={setResizeMode}
                {...buttonProps}
            />}
        />
    );
};

export default React.memo(ToggleResize);
