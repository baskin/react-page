import React from 'react';
import { Checkbox, Popup } from 'semantic-ui-react';
import {
    useCellProps,
    useLang,
    useSetDraft,
    useUiTranslator,
} from '../../core/components/hooks';

const DraftSwitch = ({ nodeId, lang }: { nodeId: string; lang?: string }) => {
    const { t } = useUiTranslator();
    const cell = useCellProps(nodeId, (c) => ({
        isDraft: c.isDraft,
        isDraftI18n: c.isDraftI18n,
    }));
    const setDraft = useSetDraft(nodeId);
    const currentLang = useLang();
    if (!cell) {
        return null;
    }
    const theLang = lang ?? currentLang;
    const hasI18n = Boolean(cell.isDraftI18n);
    const isDraft = cell?.isDraftI18n?.[theLang] ?? cell?.isDraft; // fallback to legacy
    const title = t(isDraft ? 'Content is hidden' : 'Content is visible');
    return cell ? (
        <Popup content={title + (hasI18n ? ' in ' + theLang : '')} trigger={
            <Checkbox
                label={isDraft ? 'Hidden' : 'Visible'}
                toggle
                style={{ marginRight: 5 }}
                checked={!isDraft}
                onChange={() => setDraft(!isDraft, theLang)}
            />}
        />
    ) : null;
};

export default DraftSwitch;
