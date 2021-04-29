import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useIsLayoutMode,
    useSetLayoutMode,
} from '../../../core/components/hooks';


const ToggleLayout: React.FC = (props: any) => {
    const { label, ...buttonProps }  = props;
    const isLayoutMode = useIsLayoutMode();
    const setLayoutMode = useSetLayoutMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                icon='block layout'
                active={isLayoutMode}
                primary={isLayoutMode}
                onClick={setLayoutMode}
                {...buttonProps}
            />}
        />
    );
};

export default React.memo(ToggleLayout);
