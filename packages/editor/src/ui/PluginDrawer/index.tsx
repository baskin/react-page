import React from 'react';
import { Input, List, Header, TransitionablePortal, Label, Divider } from 'semantic-ui-react';
import {
  useIsInsertMode,
  useUiTranslator,
  useDisplayModeReferenceNodeId,
  useAllCellPluginsForNode,
  useSetEditMode
} from '../../core/components/hooks';
import type { CellPlugin } from '../../core/types';
import Item from './Item/index';

export interface PluginDrawerLabels {
    noPluginFoundContent: string;
    searchPlaceholder: string;
    insertPlugin: string;
    dragMe: string;
}

const getPluginTitle = (plugin: CellPlugin) =>
    (plugin.title || plugin.text) ?? '';

const TAGS = ['All', 'Basic', 'Layout', 'Composite'];

export const PluginDrawer: React.FC = React.memo(() => {
  const defaultLabels: PluginDrawerLabels = {
    noPluginFoundContent: 'No blocks found',
    searchPlaceholder: 'Search for blocks',
    insertPlugin: 'Add blocks',
    dragMe: 'Drag me!',
  };
  const nodeId = useDisplayModeReferenceNodeId();
  const plugins = useAllCellPluginsForNode(nodeId);

  const { t } = useUiTranslator();
  
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchTag, setSearchTag] = React.useState<string>('All');

  const searchFilter = React.useCallback(
    (plugin: CellPlugin) => {
      const id = plugin.id;
      const title = getPluginTitle(plugin);
      const tags: string[] = (plugin as any).tags || [];
      return (
        plugin &&
        id &&
        !plugin.hideInMenu &&
        (searchTag === 'All' || tags.includes(searchTag)) &&
        (id.toLowerCase().startsWith(searchText?.toLowerCase()) ||
          (plugin.description &&
            plugin.description
              .toLowerCase()
              .startsWith(searchText?.toLowerCase())) ||
          (title && title.toLowerCase().startsWith(searchText?.toLowerCase())))
      );
    },
    [searchText, searchTag]
  );

    const onSearch = React.useCallback(
        (e: React.ChangeEvent) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
                setSearchText(target.value);
            }
        },
        [setSearchText]
    );
    const isInsertMode = useIsInsertMode();
    const setEditMode = useSetEditMode();
    const inputRef = React.useRef<HTMLInputElement>();
    React.useEffect(() => {
        let handle;
        if (inputRef.current && isInsertMode) {
            handle = setTimeout(() => {
                const e = inputRef.current.querySelector('input');
                if (e) {
                    e.focus();
                }
            }, 100);
        }

        return () => {
            clearTimeout(handle);
        };
    }, [inputRef.current, isInsertMode]);

    const filteredPlugins = plugins.filter(searchFilter);

    return (
        <TransitionablePortal
            closeOnDocumentClick={false}
            closeOnEscape={false}
            transition={{ animation: 'fade right', duration: 300 }}
            className="react-page-plugin-drawer"
            open={isInsertMode}
        >
            <div style={{
                top: 0, left: 0, width: '320px', position: 'fixed',
                height: '100%', borderRightStyle: 'groove', overflowX: 'scroll',
                display: 'flex', maxHeight: '100%',
                // z-index of tooltip popup is 1900
                margin: 0, padding: '1rem', zIndex: 1899, background: 'white'
            }}>
            <List relaxed='very'>
                <Label corner='right' icon='close' onClick={setEditMode} />
                <List.Item>
                    <Header as='h2' content={t(defaultLabels.insertPlugin)} />
                </List.Item>
                <List.Item>
                    <Input fluid icon='search' inputref={inputRef}
                        placeholder={t(defaultLabels.searchPlaceholder)}
                        onChange={onSearch}
                    />
                </List.Item>
                <List.Item>
                    <Label.Group>
                        {TAGS.map(tag => 
                            <Label as='a' basic={searchTag !== tag} key={tag} content={tag} 
                                onClick={() => setSearchTag(tag)} />
                        )}
                    </Label.Group>
                </List.Item>
                <Divider />
                </List>
                <List animated selection divided relaxed='very'>
                {filteredPlugins.length === 0 && (
                    <List.Item>
                        <Header as='h3' content={t(defaultLabels.noPluginFoundContent)} />
                    </List.Item>
                )}
                {filteredPlugins.length > 0 && (
                    <>
                        {filteredPlugins.map((plugin: CellPlugin, k: number) => {
                            return (
                                <Item
                                    translations={defaultLabels}
                                    plugin={plugin}
                                    key={k.toString()}
                                    insert={{
                                        plugin: plugin.id,
                                    }}
                                />
                            );
                        })}
                    </>
                )}
            </List>
            </div>
        </TransitionablePortal>
    );
});
