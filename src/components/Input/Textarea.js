import React, { Component, PropTypes } from 'react';

class Textarea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea {...this.props} {...this.props.field}/>
                <span className="validation-icon float-right"></span>
            </div>
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
