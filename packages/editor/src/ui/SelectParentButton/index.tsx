import React from 'react';
import { Popup, Button } from 'semantic-ui-react';
import {
    useFocusCell,
    useParentCellId,
    useUiTranslator,
} from '../../core/components/hooks';

export const SelectParentButton: React.FC<{
    nodeId: string;
}> = React.memo(({ nodeId }) => {
    const parentCellId = useParentCellId(nodeId);
    const { t } = useUiTranslator();
    const focusParent = useFocusCell(parentCellId);

    return parentCellId ? (
        <Popup inverted content={t('Select parent block')} trigger={
            <Button icon='arrow circle up' onClick={() => focusParent()} />}
        />) : null;
});
