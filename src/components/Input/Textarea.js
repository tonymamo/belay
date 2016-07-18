import React, { Component, PropTypes } from 'react';

class Textarea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { field } = this.props;
        return (
            <textarea {...this.props} {...this.props.field}/>
        );
    }
}

Textarea.PropTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    //field: PropTypes.object.isRequired
};

export default Textarea;
