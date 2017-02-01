import React, { Component, PropTypes } from 'react';
import TextInput from './TextInput.js';
import Textarea from './Textarea.js';
import SearchInput from './SearchInput.js';
import RadioInput from './RadioInput.js';
import CheckboxInput from './CheckboxInput.js';
import CheckboxGroup from './CheckboxGroup.js';
import SelectInput from './SelectInput.js';
import Password from './Password.js';
import MultiselectInput from './Multiselect.js';
import RichTextEditor from './RichTextEditor.js';

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
            case 'password':
                content = <Password {...props}/> ;
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
            case 'multiselect':
                // Clear out onBlur, so that it doesn't affect the values
                field.onBlur = (e) => e.preventDefault();
                content = <MultiselectInput {...props}/>;
                break;
            case 'richtext':
                content = <RichTextEditor {...props}/>;
                break;
            default:
                content = <TextInput {...props}/>;
                break;
        }

        return (
            <div className={groupClassName}>
                { label && <label className={labelClass} title={label}>{label}</label>}
                {content}
                { field && field.touched && <span className="validation-icon float-right"></span> }
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
