import React, { Component, PropTypes } from 'react';

class CheckboxInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { option, field } = this.props;

        return (
            <div className='checkbox'>
                <label title={option}>
                    <input {...this.props} {...field}/>
                    <span>{option}</span>
                </label>
            </div>
        );
    }
}

CheckboxInput.propTypes = {
    type:    PropTypes.string.isRequired,
    field:   PropTypes.object,
    label:   PropTypes.string,
    option:  PropTypes.string.isRequired
};

export default CheckboxInput;
