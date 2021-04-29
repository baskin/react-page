import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import { useIsEditMode, useSetEditMode } from '../../../core/components/hooks';


const ToggleEdit: React.FC = (props: any) => {
    const { label, ...buttonProps }  = props;
    const isEditMode = useIsEditMode();
    const setEditMode = useSetEditMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                icon='edit'
                active={isEditMode}
                primary={isEditMode}
                onClick={setEditMode}
                {...buttonProps}
            />
        } />
    );
};

export default React.memo(ToggleEdit);
