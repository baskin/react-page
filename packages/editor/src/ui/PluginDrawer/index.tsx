import React from 'react';
import { Input, List, Header, TransitionablePortal, Label } from 'semantic-ui-react';
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

export const PluginDrawer: React.FC = React.memo(() => {
  const defaultLabels: PluginDrawerLabels = {
    noPluginFoundContent: 'No blocks found',
    searchPlaceholder: 'Search for blocks',
    insertPlugin: 'Add blocks to page',
    dragMe: 'Drag me!',
  };
  const nodeId = useDisplayModeReferenceNodeId();
  const plugins = useAllCellPluginsForNode(nodeId);

  const { t } = useUiTranslator();
  const [searchText, setSearchText] = React.useState<string>('');
  const searchFilter = React.useCallback(
    (plugin: CellPlugin) => {
      const id = plugin.id;
      const title = getPluginTitle(plugin);
      return (
        plugin &&
        id &&
        !plugin.hideInMenu &&
        (id.toLowerCase().startsWith(searchText?.toLowerCase()) ||
          (plugin.description &&
            plugin.description
              .toLowerCase()
              .startsWith(searchText?.toLowerCase())) ||
          (title && title.toLowerCase().startsWith(searchText?.toLowerCase())))
      );
    },
    [searchText]
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
            <List selection divided relaxed style={{
                top: 0, left: 0, width: '320px', position: 'fixed',
                height: '100%', borderRightStyle: 'groove', overflowX: 'scroll',
                display: 'flex', maxHeight: '100%',
                // z-index of tooltip popup is 1900
                margin: 0, padding: '1rem', zIndex: '1899', background: 'white'
            }}
            >
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
        </TransitionablePortal>
    );
});
