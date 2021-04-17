import classNames from 'classnames';
import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import { useIsLayoutMode, useTrashDrop } from '../../core/components/hooks';

export const Trash: React.FC = React.memo(() => {
    const isLayoutMode = useIsLayoutMode();
    const [{ isHovering }, ref] = useTrashDrop();
    return (
        <div
            ref={ref}
            className={classNames('react-page-controls-trash', {
                'react-page-controls-trash-active': isLayoutMode,
            })}
        >
            <Button icon='trash' secondary disabled={!isHovering} />
            <Popup inverted content='Drag block to trash' trigger={
                <sub style={{ color: 'grey', textAlign: 'center' }}>Trash</sub>}
            />
        </div>
    );
});
