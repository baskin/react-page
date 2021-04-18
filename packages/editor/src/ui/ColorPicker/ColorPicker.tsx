import React from 'react';
import type { ColorChangeHandler } from 'react-color';
import { ChromePicker } from 'react-color';
import { Button, Popup } from 'semantic-ui-react';
import { colorToString } from './colorToString';
import type { ColorPickerProps, ColorPickerState } from './types';

class ColorPicker extends React.Component<ColorPickerProps> {
    static defaultProps: Partial<ColorPickerProps> = {
        buttonContent: 'Change color',
        icon: 'paint brush',
    };

    state: ColorPickerState = {
        isColorPickerVisible: false,
    };

    props: ColorPickerProps;

    handleClickShowColorPicker = (e: React.MouseEvent<HTMLElement>) => {
        if (this.props.onDialogOpen) {
            this.props.onDialogOpen();
        }
        this.setState({ isColorPickerVisible: !this.state.isColorPickerVisible });
    };

    onChange: ColorChangeHandler = (e) =>
        this.props.onChange && this.props.onChange(e.rgb);

    handleChangeComplete: ColorChangeHandler = (e) =>
        this.props.onChangeComplete && this.props.onChangeComplete(e.rgb);

    render() {
        return (
            <Popup
                open={this.state.isColorPickerVisible}
                trigger={
                    <Button
                        onClick={this.handleClickShowColorPicker}
                        style={
                            {
                                ...this.props.style,
                                borderColor: colorToString(this.props.color),
                                borderStyle: 'solid',
                                borderWidth: '2px',
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            } as any
                        }
                    >
                        {this.props.buttonContent}
                        {this.props.icon}
                    </Button>
                }
                onClose={this.handleClickShowColorPicker}
            >
                <div>
                    <ChromePicker
                        color={this.props.color}
                        onChange={this.onChange}
                        onChangeComplete={this.handleChangeComplete}
                    />
                </div>
            </Popup>
        );
    }
}

export default ColorPicker;
