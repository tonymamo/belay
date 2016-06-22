import React, { Component, PropTypes } from 'react';

class Textarea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { field } = this.props;
        return (
            <div>
                <textarea {...this.props} {...this.props.field}/>
                { field && field.touched && <span className="validation-icon float-right"></span>}
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
