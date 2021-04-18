import React from 'react';
import { Grid, Image, Header, Icon } from 'semantic-ui-react';
import { usePluginOfCell, useUiTranslator } from '../../core/components/hooks';
import { BottomToolbarTools } from './Tools';

export type BottomToolbarMainBarProps = {
    nodeId: string;
    actionsLeft: React.ReactNode;
};

export const BottomToolbarMainBar: React.FC<BottomToolbarMainBarProps> = React.memo(
    ({ nodeId, actionsLeft }) => {
        const { title, icon } = usePluginOfCell(nodeId) ?? {};
        const { t } = useUiTranslator();
        return (
            <Grid container={true}>
                <Grid.Column>
                    {icon ? (typeof icon === 'string' ? 
                            <Icon circular name={icon as any} /> : icon) :
                        <Image avatar src={`https://ui-avatars.com/api/?bold=true&name=${title}`} />
                    }
                </Grid.Column>
                <Grid.Column width='6'>
                    {t(title)}   
                </Grid.Column>
                {React.Children.map(actionsLeft, (action, index) => (
                    <Grid.Column key={index}>
                        {action}
                    </Grid.Column>
                ))}
                <Grid.Column floated='right'>
                    <BottomToolbarTools nodeId={nodeId} />
                </Grid.Column>
            </Grid>
        );
    }
);
