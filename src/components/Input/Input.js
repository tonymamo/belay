import React, { Component, PropTypes } from 'react';
import TextInput from './TextInput.js';
import Textarea from './Textarea.js';
import SearchInput from './SearchInput.js';
import RadioInput from './RadioInput.js';
import CheckboxInput from './CheckboxInput.js';
import CheckboxGroup from './CheckboxGroup.js';
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
            smallText = errorMessage;
            smallClass = 'small text--danger';
        } else if (field && !field.error && field.touched) {
            groupClassName += ' has-success';
            smallText = helpText;
            smallClass = 'small text--success';
        } else {
            smallText = helpText;
            smallClass = 'small text--muted';
        }

        const props = Object.assign({}, this.props, {
            className: inputClass
        });

        switch (type.toLowerCase()) {
            case 'text':
                content = <TextInput {...props}/> ;
                break;
            case 'textarea':
                content = <Textarea {...props}/>;
                break;
            case 'search':
                content = <SearchInput {...props}/>;
                break;
            case 'radio':
                content = <RadioInput {...props}/>;
                break;
            case 'checkbox':
                content = <CheckboxInput {...props}/>;
                break;
            case 'checkboxes':
                // Clear out onBlur, so that it doesn't affect the values
                // this.props.field.onBlur = (e) => e.preventDefault();
                content = <CheckboxGroup {...props}/>;
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
                { label && <label className={labelClass} title={label}>{label}</label>}
                {content}
                { smallText && <div className={smallClass}>{smallText}</div>}
            </div>
        );
    }
}

Input.propTypes = {
    label:    PropTypes.string,
    field:    PropTypes.object,
    type:     PropTypes.string.isRequired,
};
