import React, { Component, PropTypes } from 'react';
import TextInput from './TextInput.js';
import SearchInput from './SearchInput.js';
import RadioInput from './RadioInput.js';
import CheckboxInput from './CheckboxInput.js';
import SelectInput from './SelectInput.js';

export default class Input extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type } = this.props;
        let content;

        switch (type.toLowerCase()) {
            case 'text':
                content = <TextInput {...this.props}/>;
                break;
            case 'search':
                content = <SearchInput {...this.props}/>;
                break;
            case 'radio':
            case 'radio-inline':
                content = <RadioInput {...this.props}/>;
                break;
            case 'checkbox':
            case 'checkboxes':
            case 'checkboxes-inline':
                // Clear out onBlur, so that it doesn't affect the values
                this.props.field.onBlur = (e) => e.preventDefault();
                content = <CheckboxInput {...this.props}/>;
                break;
            case 'select':
                content = <SelectInput {...this.props}/>;
                break;
            default:
                content = <TextInput {...this.props}/>;
                break;
        }
        return content;
    }
}

Input.propTypes = {
    label:    PropTypes.string,
    field:    PropTypes.object,
    type:     PropTypes.string.isRequired,
    options:  PropTypes.array,
    option:   PropTypes.string
};
