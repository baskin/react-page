import React from 'react';
import { Table } from 'semantic-ui-react';
import {
    useCellDataI18nRaw,
    useLang,
    useOptions
} from '../../core/components/hooks';
import DraftSwitch from '../DraftSwitch';

const I18nDialog = ({ nodeId } : { nodeId: string }) => {
    const currentLang = useLang();
    const options = useOptions();
    const dataI18n = useCellDataI18nRaw(nodeId);

    const tableData = options.languages;
    const renderBodyRow = ({ lang, label }, i) => {
        const data = dataI18n?.[lang];
        const isCurrent = currentLang === lang;
        const hasData = Boolean(data);

        return {
            key: lang,
            cells: [
                { 
                    key: 'label', content: label + (isCurrent ? ' (default)' : ''),  width: 8,
                    style: { textDecoration: isCurrent ? 'underline' : undefined } 
                },
                { key: 'state', content: <DraftSwitch nodeId={nodeId} lang={lang} /> },
                { key: 'hasdata', content: hasData ? '✔️' : ' ' }
            ],
        }
    }
    return <Table compact basic='very' renderBodyRow={renderBodyRow} tableData={tableData} />;
};

export default I18nDialog;
