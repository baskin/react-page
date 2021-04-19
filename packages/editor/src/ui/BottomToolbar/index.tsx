import React from 'react';
import { Label } from 'semantic-ui-react';
// import { darkTheme, ThemeProvider } from '../ThemeProvider';
import { BottomToolbarDrawer } from './Drawer';
import { BottomToolbarMainBar } from './NodeTools';
// import { ScaleButton } from './ScaleButton';
import type { BottomToolbarProps } from './types';
export * from './types';
export * from './Drawer';
export * from './NodeTools';
export * from './Tools';

export const BottomToolbar: React.FC<BottomToolbarProps> = React.memo(
    ({
        open = false,
        className,
        dark = false,
        theme,
        anchor = 'bottom',
        pluginControls,
        nodeId,
        actionsLeft,
        style,
        children,
    }) => {
        const [scale, setScale] = React.useState(1);
        const [collapsed, setCollapsed] = React.useState(false);

        return (
            //   <ThemeProvider theme={theme ? theme : dark ? darkTheme : null}>
            <BottomToolbarDrawer
                className={className}
                open={open}
                anchor={anchor}
                scale={scale}
                dark={dark}
                style={style}
            >
                <Label corner='right' icon={collapsed ? 'window maximize' : 'window minimize'}
                    onClick={() => setCollapsed(!collapsed)}
                />
                {children}
                {collapsed ? null : pluginControls}
                <BottomToolbarMainBar
                    nodeId={nodeId}
                    actionsLeft={[
                        //   <ScaleButton
                        //     key="scalebutton"
                        //     scale={scale}
                        //     setScale={setScale}
                        //   />,
                        ...React.Children.toArray(actionsLeft),
                    ]}
                />
            </BottomToolbarDrawer>
            //   </ThemeProvider>
        );
    }
);
