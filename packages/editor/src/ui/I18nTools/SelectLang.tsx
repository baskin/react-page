import React, { memo } from 'react';
import { Select } from 'semantic-ui-react';
import { useLang, useOptions, useSetLang } from '../../core/components/hooks';

const SelectLang = () => {
    const options = useOptions();
    const lang = useLang();
    const setLang = useSetLang();
    if (options.languages?.length > 0) {
        return (
            <Select
                text='Set Default'
                style={{ float: 'right' }}
                compact
                options={options.languages.map((l) => ({ key: l.lang, value: l.lang, text: l.label }))}
                value={lang || ''}
                onChange={(e, { value }) => setLang(value as string)}
            />
        );
    }
    return null;
};

export default memo(SelectLang);
