import React, { Component, PropTypes } from 'react';

import TextInput from './TextInput';
import Textarea from './Textarea';
import SearchInput from './SearchInput';
import RadioInput from './RadioInput';
import CheckboxInput from './CheckboxInput';
import CheckboxGroup from './CheckboxGroup';
import SelectInput from './SelectInput';
import Password from './Password';
import MultiselectInput from './Multiselect';
import GeoSuggest from './GeoSugggest';

export default class Input extends Component {
    render() {
        const { type, field, label, labelClass, helpText, component } = this.props;
        let content,
            groupClassName = 'form-group',
            errorMessage = '',
            smallText,
            smallClass,
            inputClass = this.props.className;

        if ( field && field.error && field.touched ) {
            groupClassName += ' has-error';
            errorMessage = field.error;
            smallText = errorMessage;
            smallClass = 'small text--danger';
        } else if ( field && !field.error && field.touched ) {
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

        switch( type.toLowerCase() ) {
            case 'text':
                content = <TextInput {...props}/>;
                break;
            case 'password':
                content = <Password {...props}/>;
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
            case 'geo':
            case 'geosuggest':
                content = <GeoSuggest {...props} />;
                break;
            case 'component':
                content = component;
                break;
            default:
                content = <TextInput {...props}/>;
                break;
        }

        return (
            <div className={groupClassName}>
                { label && <label className={labelClass} title={label}>{label}</label>}
                {content}
                { field && field.touched && <span className="validation-icon float-right"/> }
                { smallText && <div className={smallClass}>{smallText}</div>}
            </div>
        );
    }
}

Input.propTypes = {
    label: PropTypes.string,
    field: PropTypes.object,
    type:  PropTypes.string.isRequired,
};
