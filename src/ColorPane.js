import React, { Component } from 'react';
import './ColorPane.css';
import tinycolor from 'tinycolor2';

class ColorPane extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.backgroundColor };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setInputRef = this.setInputRef.bind(this);
    }

    onChange(e) {
        const newVal = e.target.value;
        this.setState({
            value: newVal
        });

        this.props.onChange(newVal);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.backgroundColor
        })
    }

    onClick() {
        if (!window.getSelection().toString()) {
            this.input.focus();
        }
    }

    setInputRef(input) {
        this.input = input;
    }

    render() {
        const { backgroundColor, color } = this.props;
        const tcolor = tinycolor(backgroundColor);

        return <div className="color-pane" style={{ backgroundColor, color }} onClick={this.onClick}>
            <input ref={this.setInputRef} type="text" value={this.state.value} onChange={this.onChange}/>
            <div className="color-pane-text hex">{tcolor.toHexString()}</div>
            <div className="color-pane-text rgb">{tcolor.toRgbString()}</div>
            <div className="color-pane-text hsl">{tcolor.toHslString()}</div>
            <div className="color-pane-text name">{tcolor.toName()}</div>
        </div>
    }
}

export default ColorPane;