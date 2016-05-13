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
        const { type, field, label, labelClass, helpText } = this.props;
        let content;
        let groupClassName = 'form-group';
        let errorMessage = '';
        let smallText, smallClass;
        let inputClass = this.props.className;

        if (field && field.error && field.touched) {
            groupClassName += ' has-error';
            errorMessage = field.error;
            inputClass += ' form-control--error';
            smallText = errorMessage;
            smallClass = 'text--danger';
        } else if (field && !field.error && field.touched) {
            groupClassName += ' has-success';
            inputClass += ' form-control--success';
            smallText = helpText;
            smallClass = 'text--success';
        } else {
            smallText = helpText;
            smallClass = 'text--muted';
        }

        const props = Object.assign({}, this.props, {
            className: inputClass
        });

        switch (type.toLowerCase()) {
            case 'text':
                content = <TextInput {...props}/>;
                break;
            case 'search':
                content = <SearchInput {...props}/>;
                break;
            case 'radio':
            case 'radio-inline':
                content = <RadioInput {...props}/>;
                break;
            case 'checkbox':
            case 'checkboxes':
            case 'checkboxes-inline':
                // Clear out onBlur, so that it doesn't affect the values
                this.props.field.onBlur = (e) => e.preventDefault();
                content = <CheckboxInput {...props}/>;
                break;
            case 'select':
                content = <SelectInput {...props}/>;
                break;
            default:
                content = <TextInput {...props}/>;
                break;
        }

        return (
            <div className={groupClassName}>
                <label className={labelClass} title={label}>{label}</label>
                {content}
                <small className={smallClass}>{smallText}</small>
            </div>
        );
    }
}

Input.propTypes = {
    label:    PropTypes.string,
    field:    PropTypes.object,
    type:     PropTypes.string.isRequired,
    options:  PropTypes.array,
    option:   PropTypes.string
};
