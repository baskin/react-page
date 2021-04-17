import React, { useState } from 'react';
import I18nDialog from './I18nDialog';
import { useOptions, useUiTranslator } from '../../core/components/hooks';
import { Button, Icon, Modal, Popup } from 'semantic-ui-react';
import SelectLang from './SelectLang';

export const I18nTools: React.FC<{
    nodeId: string;
}> = React.memo(({ nodeId }) => {
    const options = useOptions();
    const { t } = useUiTranslator();

    const [showI18nDialog, setShowI18nDialog] = useState(false);
    const hasI18n = options.languages?.length > 0;
    const onClose = () => setShowI18nDialog(false);
    if (!hasI18n) {
        return null;
    }

    return (
        <>
            <Modal open={showI18nDialog} onClose={onClose}>
                <Modal.Header><Icon name='translate' /><SelectLang /></Modal.Header>
                <Modal.Content><I18nDialog nodeId={nodeId} /></Modal.Content>
            </Modal>
            <Popup inverted content={t('i18n')} trigger={
                <Button aria-label="i18n" icon='translate' onClick={() => setShowI18nDialog(true)} />}
            />
        </>
    );
});
