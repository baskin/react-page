import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import {
    useIsInsertMode,
    useSetInsertMode,
} from '../../../core/components/hooks';


const ToggleInsert: React.FC = (props: any) => {
    const { label, ...buttonProps }  = props;
    const isInsertMode = useIsInsertMode();
    const setInsertMode = useSetInsertMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                icon='add'
                active={isInsertMode}
                primary={isInsertMode}
                onClick={setInsertMode}
                {...buttonProps}
            />}
        />
    );
};

export default React.memo(ToggleInsert);
