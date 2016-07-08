import React, { Component, PropTypes } from 'react';

class RadioInput extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // select the first item if it's available and nothing is selected yet
        if (this.props.field && !this.props.field.value && this.props.options && this.props.options.length > 0) {
            this.props.field.onChange(this.props.options[0].Key.toString());
        }
    }

    renderRadioOptions() {
        const { options } = this.props;
        let renderedOptions = [];

        options.forEach((option) => {
            renderedOptions.push(this.renderRadioOption(option));
        });

        return renderedOptions;
    }

    renderRadioOption(option) {
        const {inline, field: {value}} = this.props;
        let keyValue = option.Key.toString();

        return (
            <div className={`${inline ? 'radio radio--inline' : 'radio'}`} key={keyValue}>
                <label title={option.Value}>
                    <input type="radio" {...this.props} {...this.props.field} value={keyValue} checked={value === keyValue}/>
                    <span>{option.Value}</span>
                </label>
            </div>
        );
    }

    render() {
        return (
            <div>{this.renderRadioOptions()}</div>
        );
    }
}

RadioInput.propTypes = {
    type:    PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    field:   PropTypes.object.isRequired,
    label:   PropTypes.string
};

export default RadioInput;
