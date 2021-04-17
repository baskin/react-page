import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import { useIsEditMode, useSetEditMode } from '../../../core/components/hooks';

type Props = {
    label: string;
};

const ToggleEdit: React.FC<Props> = ({ label }) => {
    const isEditMode = useIsEditMode();
    const setEditMode = useSetEditMode();
    return (
        <Popup inverted content={label} trigger={
            <Button
                size='huge'
                // circular
                icon='edit'
                active={isEditMode}
                primary={isEditMode}
                onClick={setEditMode}
            />
        } />
    );
};

export default React.memo(ToggleEdit);
