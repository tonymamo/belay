import React, { Component, PropTypes } from 'react';

class SelectInput extends Component {
    constructor(props) {
        super(props);
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

        let value = field ? field.value : '';

        return (
            <select
                value={value}
                {...this.props}
                {...field}>
                {renderedOptions}
            </select>
        );
    }
}

SelectInput.propTypes = {
    options: PropTypes.array.isRequired,
};

export default SelectInput;
