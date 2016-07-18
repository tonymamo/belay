import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { field } = this.props;
        return (
            <input {...this.props} {...this.props.field} className="form-control"/>
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
