import React, { Component, PropTypes } from 'react';

class RadioInput extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // select the first item if it's available
        if (this.props.field && this.props.options && this.props.options.length > 0) {
            this.props.field.onChange(this.props.options[0].Key);
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
        const {inline, field: {name, value}} = this.props;

        return (
            <div className={`${inline ? 'radio--inline' : 'radio'}`} key={option.Key}>
                <label title={option.Value}>
                    <input type="radio" name={name} value={option.Key} disabled={this.props.disabled} checked={value == option.Key.toString()}/>
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
    field:   PropTypes.object,
    label:   PropTypes.string
};

export default RadioInput;
