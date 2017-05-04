import React, { Component } from 'react';
import './SplitConainer.css';

class SplitContainer extends Component {
    createItem(el) {
        return <div className="split-container-item">
            {el}
        </div>
    }

    render() {
        return <div className="split-container">
            {React.Children.map(this.props.children, this.createItem) }
        </div>
    }
}

export default SplitContainer;