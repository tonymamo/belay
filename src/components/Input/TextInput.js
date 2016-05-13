import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input {...this.props}/>
        );
    }
}

TextInput.PropTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    //field: PropTypes.object.isRequired
};

export default TextInput;
