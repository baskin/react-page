import React from 'react';
import { Icon, Image, List, Popup } from 'semantic-ui-react';
import type { PluginDrawerLabels } from '..';
import {
    useDisplayModeReferenceNodeId,
    useInsertNew,
    useUiTranslator,
} from '../../../core/components/hooks';
import type { CellPlugin, InsertNewCell } from '../../../core/types';
import Draggable from '../Draggable/index';

type ItemProps = {
    plugin: CellPlugin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    insert: InsertNewCell;
    translations: PluginDrawerLabels;
};

const Item: React.FC<ItemProps> = ({ plugin, insert }) => {
    const title = plugin.title ?? plugin.text;
    const { t } = useUiTranslator();
    if (!plugin.icon && !title) {
        return null;
    }

  const referenceNodeId = useDisplayModeReferenceNodeId();
  const insertNew = useInsertNew(referenceNodeId);
  const insertIt = React.useCallback(() => insertNew(insert), [
    insertNew,
    referenceNodeId,
    insert,
  ]);

    return (
        <Popup inverted
            mouseEnterDelay={1000}
            content={t('Click to add or drag and drop it somewhere on your page')}
            trigger={
                <List.Item onClick={insertIt}>
                    <Draggable insert={insert}>
                        {plugin.icon ? (
                                typeof plugin.icon === 'string' ? 
                                    <Icon size='large' style={{ float: 'left' }} circular name={plugin.icon as any} /> : plugin.icon
                            ) : 
                            <Image size='mini' floated='left' avatar src={`https://ui-avatars.com/api/?bold=true&name=${title}`} />
                        }
                        <List.Content>
                            <List.Header>{t(title)}</List.Header>
                            <List.Description>{t(plugin.description)}</List.Description>
                        </List.Content>
                    </Draggable>
                </List.Item>
            }
        />
    );
};

export default Item;
