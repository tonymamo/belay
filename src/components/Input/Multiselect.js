import React, { Component, PropTypes } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';

class MultiselectInput extends Component {
    constructor(props) {
        super(props);
    }

    multiSelectChange(value) {
        this.props.field.onChange([...value].map((item) => item.Key));
        if (this.props.keyValueField) {
            this.props.keyValueField.onChange(value);
        }
    }

    render() {
        const { field, options } = this.props;

        return (
            <Multiselect
                data={options}
                className="form-control"
                valueField="Key"
                disabled={this.props.disabled}
                textField="Value"
                onChange={(value) => this.multiSelectChange.bind(value)}
                {...field} />
        );
    }
}

MultiselectInput.PropTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    keyValueField: PropTypes.object,
    //field: PropTypes.object.isRequired
};

export default MultiselectInput;
