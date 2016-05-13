import React, { Component, PropTypes } from 'react';

class SelectInput extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.field && this.props.options && this.props.options.length > 0) {
            this.props.field.onChange(this.props.options[0].Key);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.field && JSON.stringify(this.props.options) != JSON.stringify(nextProps.options) && nextProps.options && nextProps.options.length > 0 && nextProps.type === 'select') {
            this.props.field.onChange(nextProps.options[0].Key);
        }
    }

    renderSelectOption(option) {
        return (
            <option key={option.Key} value={option.Key}>{option.Value}</option>
        );
    }

    render() {
        let renderedOptions = [],
            value,
            groupClassName = 'form-group',
            {field, label, type, options, labelClass} = this.props,
            errorMessage = '';

        var inputClass = this.props.className;

        if (field && field.error && field.touched) {
            groupClassName += ' has-error';
            errorMessage = field.error;
            inputClass += ' form-control--error';
        } else if (field && !field.error && field.touched) {
            groupClassName += ' has-success';
            inputClass += ' form-control--success';
        }

        if (options) {
            if (Array.isArray(options)) {
                options.forEach((option) => {
                    renderedOptions.push(this.renderSelectOption(option));
                });
            } else {
                if (console && console.error) {
                    console.error('[Input - SelectInput] - Expected options to be array.  Received: %s', options);
                }
            }
        }

        if (field) {
            value = field.value;
        }

        return (
            <div {...this.props} {...field} className={groupClassName}>
                <label className={labelClass} title={label}>{label}</label>
                <select
                    value={value}
                    selected={this.props.selected}
                    onChange={this.props.onChange}
                    disabled={this.props.disabled}
                    className={inputClass}>
                    {renderedOptions}
                </select>
                <small className="text--danger">{errorMessage}</small>
            </div>
        );
    }
}

SelectInput.propTypes = {
    type:    PropTypes.string.isRequired,
    label:   PropTypes.string,
    options: PropTypes.array,
    option:  PropTypes.string
};

export default SelectInput;
