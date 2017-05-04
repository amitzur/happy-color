import React, {Component} from 'react';
import './App.css';

import SplitContainer from './SplitContainer';
import ColorPane from './ColorPane';
import tinycolor from 'tinycolor2';


class App extends Component {
    constructor(props) {
        super(props);
        this.changeLeft = this.changeLeft.bind(this);
        this.changeRight = this.changeRight.bind(this);

        this.setInitialState();

        this.pushToHistory();

        window.addEventListener("hashchange", e => {
            let hash = this.readFromHash();
            ["left", "right"].forEach(side => this.setColor(side, hash[side]));
        });
    }

    setInitialState() {
        const hashValue = this.readFromHash();
        const storageValue = this.readFromStorage();
        if (hashValue) {
            this._setInitialState(hashValue);
        } else if (storageValue) {
            this._setInitialState(storageValue);
        } else {
            this._setInitialState();
        }
    }

    _setInitialState(colorObj = {}) {
        let left,
            right,
            leftText,
            rightText;

        left = colorObj.left || "lime";
        right = colorObj.right || "salmon";
        leftText = this.getTextColor(left);
        rightText = this.getTextColor(right);

        this.state = {
            left,
            right,
            leftText,
            rightText
        };
    }

    readFromHash(hash = location.hash.slice(1)) {
        if (hash) {
            hash = hash.split("--").map(x => decodeURIComponent(x));
            return {
                left: hash[0],
                right: hash[1]
            };
        }
    }

    readFromStorage() {
        const left = localStorage.getItem("color-left");
        const right = localStorage.getItem("color-right");

        if (left || right) {
            return { left, right };
        }
    }

    pushToHistory() {
        const { left, right } = this.state;
        const state = [left, right];

        history.pushState(state, "happy-color",  `#${encodeURIComponent(left)}--${encodeURIComponent(right)}`);
    }

    getTextColor(bgColor) {
        return tinycolor.mostReadable(bgColor, ["#fff", "#000"]).toHexString()
    }

    setColor(side, color) {
        this.setState({
            [side]: color
        });

        const textProp = `${side}Text`;
        let readableText = this.state[textProp];
        if (!tinycolor.isReadable(color, this.state[textProp])) {
            console.log("not readable");
            readableText = this.getTextColor(color);
            this.setState({
                [textProp]: readableText
            });
        }

        this.setColorInStorage(side, color);
        this.pushToHistory();
    }

    setColorInStorage(side, color) {
        localStorage.setItem("color-" + side, color);
    }

    onChange(side, color) {
        const tcolor = tinycolor(color);
        if (tcolor.isValid()) {
            this.setColor(side, color)
        }
    }

    changeLeft(color) {
        this.onChange("left", color);
    }

    changeRight(color) {
        this.onChange("right", color);
    }

    render() {
        return (
            <div className="app">
                <SplitContainer>
                    <ColorPane backgroundColor={this.state.left} color={this.state.leftText} onChange={this.changeLeft}/>
                    <ColorPane backgroundColor={this.state.right} color={this.state.rightText} onChange={this.changeRight}/>
                </SplitContainer>
            </div>
        );
    }
}

export default App;
