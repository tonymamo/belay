import React, { Component, PropTypes } from 'react';

class RadioInput extends Component {
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

    renderRadioOptions(inline) {
        let renderedOptions = [],
            groupClassName = 'form-group',
            {field, label, type, options} = this.props,
            errorMessage = '';

        if (field && field.error && field.touched) {
            groupClassName += ' has-error';
            errorMessage = field.error;
        } else if (field && !field.error && field.touched) {
            groupClassName += ' has-success';
        }

        options.forEach((option) => {
            renderedOptions.push(this.renderRadioOption(option, inline));
        });

        return (
            <div {...this.props} {...field} className={groupClassName}>
                <label title={label}>{label}</label>
                {renderedOptions}
                <small className="text--danger">{errorMessage}</small>
            </div>
        );
    }

    renderRadioOption(option, inline = false) {
        const {name, value} = this.props.field;

        return (
            <div className={`${inline ? 'radio--inline' : 'radio'}`} key={option.Key}>
                <label title={option.Value}>
                    <input type="radio" name={name} value={option.Key} disabled={this.props.disabled} checked={value == option.Key.toString()}/>
                    <span>{option.Value}</span> {/* span ensures proper spacing since react got rid of spans around loose text*/}
                </label>
            </div>
        );
    }

    render() {
        const { type } = this.props;
        let content;

        switch (type) {
            case 'radio':
                content = this.renderRadioOptions(false);
                break;
            case 'radio-inline':
                content = this.renderRadioOptions(true);
                break;
            default:
                content = this.renderRadioOptions(false);
                break;
        }

        return (
            <div>{content}</div>
        );
    }
}

RadioInput.propTypes = {
    type:    PropTypes.string.isRequired,
    label:   PropTypes.string,
    options: PropTypes.array,
    option:  PropTypes.string
};

export default RadioInput;
