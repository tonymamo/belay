import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let groupClassName = 'form-group',
            {field, label, type, labelClass, helpText, disabled, placeholder} = this.props,
                smallText,
                smallClass,
                errorMessage = '';

                var inputClass = this.props.className;

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

                return (
                    <div {...this.props}
                        className={groupClassName}>
                        <label className={labelClass} title={label}>{label}</label>
                        <input {...this.props} type={type} {...field} className={inputClass} disabled={disabled}
                            maxLength={this.props.maxLength} placeholder={placeholder}/>
                        <small className={smallClass}>{smallText}</small>
                    </div>
                );
    }
}

TextInput.PropTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    //field: PropTypes.object.isRequired
};

export default TextInput;
