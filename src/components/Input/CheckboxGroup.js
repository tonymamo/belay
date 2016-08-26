import React, { Component, PropTypes } from 'react';

class CheckboxGroup extends Component {
    selectAll(e) {
        if (e.target.checked) {
            let v = this.props.options.map((item) => item.Key);
            this.props.field.onChange(v);
        } else {
            this.props.field.onChange([]);
        }

        return this.setState({
            selectAllToggled: !this.state.selectAllToggled
        });
    }

    renderCheckboxOption(option) {
        const checked = this.props.field.value && (this.props.field.value + '').indexOf(option.Key) !== -1;
        const { inline, disabled } = this.props;

        return (
            <div key={option.Key} className={`${inline ? 'checkbox checkbox--inline' : 'checkbox'}`}>
                <label title={option.Value}>
                    <input type='checkbox' name='optionsCheckboxes' value={option.Key} disabled={disabled} checked={checked} onChange={this.checkboxUpdateReduxFormValue.bind(this)}/>
                    <span>{option.Value}</span>
                </label>
            </div>
        );
    }

    checkboxUpdateReduxFormValue(input) {
        let values = this.props.field.value;
        const { checked, value } = input.target;

        if (!Array.isArray(values)) {
            values = [values];
        }

        if (checked) {
            values.push(value);
        } else {
            values = values.filter((item) => item !== value && item !== undefined);
        }

        values = values.filter(item => !!item);

        this.props.field.onFocus();
        this.props.field.onChange(values);
        return this.props.field.onBlur();
    }

    render() {
        const { options, selectAll, disabled } = this.props;
        let renderedOptions = [], selectAllOption;

        if (selectAll) {
            selectAllOption = (
                <div className='checkbox'>
                    <label title='Select All or None'>
                        <input type='checkbox'
                               name='selectAll'
                               value='selectAll'
                               onChange={this.selectAll.bind(this)}
                               disabled={disabled}/>
                        Select {!this.state.selectAllToggled ? 'All' : 'None'}
                    </label>
                </div>
            );
        }

        options.forEach((option) => {
            renderedOptions.push(this.renderCheckboxOption(option));
        });

        return (
            <div>
                {selectAllOption}
                {renderedOptions}
            </div>
        );
    }
}

CheckboxGroup.propTypes = {
    type:      PropTypes.string.isRequired,
    field:     PropTypes.object.isRequired,
    label:     PropTypes.string,
    selectAll: PropTypes.bool,
    disabled:  PropTypes.bool,
    options:   PropTypes.array.isRequired,
};

export default CheckboxGroup;
