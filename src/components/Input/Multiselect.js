import React, { Component, PropTypes } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';

class MultiselectInput extends Component {
    render() {
        const { field, options } = this.props;

        return (
            <Multiselect data={options}
                         className="form-control"
                         valueField="Key"
                         disabled={this.props.disabled}
                         textField="Value"
                         {...field}/>
        );
    }
}

MultiselectInput.PropTypes = {
    className: PropTypes.string,
    type:      PropTypes.string.isRequired,
    label:     PropTypes.string.isRequired,
    options:   PropTypes.object.isRequired,
    field:     PropTypes.object.isRequired
};

export default MultiselectInput;
