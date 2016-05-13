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
        const {field, options} = this.props;
        let renderedOptions = [];

        options.forEach((option) => {
            renderedOptions.push(this.renderSelectOption(option));
        });

        let value = field ? field.value : null;

        return (
            <select
                value={value}
                {...this.props} >
                {renderedOptions}
            </select>
        );
    }
}

SelectInput.propTypes = {
    options: PropTypes.array.isRequired,
};

export default SelectInput;
