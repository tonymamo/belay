import React, { Component, PropTypes } from 'react';

class CheckboxInput extends Component {
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

    renderSingleCheckboxOption() {
        const { label, option, field, className, disabled, labelClass } = this.props;

        return (
            <div {...this.props} {...field} className={'form-group ' + className}>
                <label className={labelClass}>{label}</label>
                <div className='checkbox'>
                    <label title={option}>
                        <input type='checkbox' disabled={disabled} checked={field.value}/>
                        <span>{option}</span> {/* span ensures proper spacing since react got rid of spans around loose text*/}
                    </label>
                </div>
            </div>
        );
    }

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

    renderCheckboxOptions(inline) {
        const { label, options, selectAll, disabled, field, labelClass } = this.props;
        let renderedOptions = [],
            selectAllOption,
            errorMessage;

            if (field && field.error && field.touched) {
                errorMessage = field.error;
            }

            if (selectAll) {
                selectAllOption =
                    <div className='checkbox'>
                        <label title='Select All or None'>
                            <input type='checkbox' name='selectAll' value='selectAll' onChange={this.selectAll.bind(this)} disabled={disabled}/>
                            Select {!this.state.selectAllToggled ? 'All' : 'None'}
                        </label>
                    </div>;
            }

            options.forEach((option) => {
                renderedOptions.push(this.renderCheckboxOption(option, inline));
            });

            return (
                <div {...this.props} className='form-group'>
                    <label title={label} className={labelClass}>{label}</label>
                    {selectAllOption}
                    {renderedOptions}
                    <small className='text--danger'>{errorMessage}</small>
                </div>
            );
    }

    renderCheckboxOption(option, inline = false) {
        const checked = this.props.field.value && (this.props.field.value + '').indexOf(option.Key) !== -1;
        const disabled = this.props.disabled;

        return (
            <div key={option.Key} className={`${inline ? 'checkbox--inline' : 'checkbox'}`}>
                <label title={option.Value}>
                    <input type='checkbox' name='optionsCheckboxes' value={option.Key} disabled={disabled} checked={checked} onChange={this.checkboxUpdateReduxFormValue.bind(this)}/>
                    <span>{option.Value}</span> {/* span ensures proper spacing since react got rid of spans around loose text*/}
                </label>
            </div>
        );
    }

    checkboxUpdateReduxFormValue(input) {
        let values = this.props.field.value,
            { checked, value} = input.target;
            if (!Array.isArray(values)) {
                values = [values];
            }

            if (checked) {
                values.push(value);
            } else {
                values = values.filter((item) => item !== value && item !== undefined);
            }

            return this.props.field.onChange(values);
    }

    render() {
        const { type } = this.props;
        let content;

        switch (type) {
            case 'checkbox':
                content = this.renderSingleCheckboxOption();
                break;
            case 'checkboxes':
                content = this.renderCheckboxOptions(false);
                break;
            case 'checkboxes-inline':
                content = this.renderCheckboxOptions(true);
                break;
            default:
                content = this.renderSingleCheckboxOption();
                break;
        }

        return (
            <div>{content}</div>
        );
    }
}

CheckboxInput.propTypes = {
    type:    PropTypes.string.isRequired,
    label:   PropTypes.string,
    options: PropTypes.array,
    option:  PropTypes.string
};

export default CheckboxInput;
