import React from 'react';
import { Popup, Button } from 'semantic-ui-react';
import { useRemoveCell, useUiTranslator } from '../../core/components/hooks';
import { DuplicateButton } from '../DuplicateButton';
import { I18nTools } from '../I18nTools';
import { SelectParentButton } from '../SelectParentButton';
import { BottomToolbarToolsProps } from './types';

export { BottomToolbarToolsProps };
export const BottomToolbarTools: React.FC<BottomToolbarToolsProps> = React.memo(
    ({ nodeId }) => {
        const { t } = useUiTranslator();
        const removeCell = useRemoveCell(nodeId);
        return (
            <Button.Group floated='right'>
                <I18nTools nodeId={nodeId} />
                {/* <DraftSwitch nodeId={nodeId} /> */}
                <DuplicateButton nodeId={nodeId} />
                <SelectParentButton nodeId={nodeId} />

                <Popup inverted content={t('Remove block')} trigger={
                    <Button aria-label="delete" icon='trash' onClick={() => removeCell()} />}
                />
            </Button.Group>
        );
    }
);
