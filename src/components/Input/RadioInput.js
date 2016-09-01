import React, { Component, PropTypes } from 'react';

class RadioInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            freeformSelected: false
        };
    }

    componentDidMount() {
        // select the first item if it's available and nothing is selected yet
        if ( this.props.field && !this.props.field.value && this.props.options && this.props.options.length > 0 ) {
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

    freeformLabelClick() {
        // Set the field value to the ref. This lets the value be set if a user just clicks the radio button or label
        this.props.field.onChange(this.freeform.value);
        this.setState({
            freeformSelected: true
        });
    }

    freeformChange(e) {
        e.stopPropagation();
        this.setState({
            freeformSelected: true
        });

        this.props.field.onFocus();
        // have to grab the value via ref because we could be clicking on radio, label, or input
        this.props.field.onChange(this.freeform.value);
        return this.props.field.onBlur();
    }

    renderRadioOption(option) {
        const { inline, field } = this.props;
        let { value, label } = field,
            key = option.Key.toString();

        return (
            <div className={`${inline ? 'radio radio--inline' : 'radio'}`} key={key}>
                {
                    !option.Type &&
                    <label title={option.Value} onClick={() => this.setState({ freeformSelected: false })}>
                        <input type="radio" {...this.props} {...this.props.field} value={key} checked={value === key}/>
                        <span>{option.Value}</span>
                    </label>
                }
                {
                    option.Type && option.Type.toLowerCase() === 'text' &&
                    <label title={option.Value} onClick={this.freeformLabelClick.bind(this)}>
                        <input type="radio" value={key} checked={this.state.freeformSelected}/>
                        <input maxLength="30"
                               ref={(input) => this.freeform = input}
                               onClick={this.freeformChange.bind(this)}
                               onChange={this.freeformChange.bind(this)}
                               onBlur={this.freeformChange.bind(this)}
                               className="form-control"/>
                    </label>
                }
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
