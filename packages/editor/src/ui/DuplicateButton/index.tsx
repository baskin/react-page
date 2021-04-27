import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import { useDuplicateCell, useUiTranslator } from '../../core/components/hooks';

export const DuplicateButton: React.FC<{ nodeId: string }> = React.memo(
    ({ nodeId }) => {
        const duplicateCell = useDuplicateCell(nodeId);
        const { t } = useUiTranslator();
        return (
            <Popup inverted content={t('Duplicate block')} trigger={
                <Button icon='copy' onClick={() => duplicateCell()} />}
            />
        );
    }
);
