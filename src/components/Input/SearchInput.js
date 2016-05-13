import React, { Component, PropTypes } from 'react';

class SearchInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let groupClassName = 'form-group',
            {field, label, type, labelClass, helpText, disabled, placeholder, submit} = this.props,
            smallText,
            smallClass,
            errorMessage = '';

        var inputClass = this.props.className;

        if (field && field.error && field.touched) {
            groupClassName += ' has-error';
            errorMessage = field.error;
            inputClass += ' form-control form-control--error';
            smallText = errorMessage;
            smallClass = 'text--danger';
        } else if (field && !field.error && field.touched) {
            groupClassName += ' has-success';
            inputClass += ' form-control form-control--success';
            smallText = helpText;
            smallClass = 'text--success';
        } else {
            smallText = helpText;
            smallClass = 'text--muted';
            inputClass = 'form-control';
        }

        return (
            <div {...this.props}
                className={groupClassName}>
                <label className={labelClass} title={label}>{label}</label>
                <form onSubmit={submit}>
                    <div className="input-group">
                        <input {...this.props} type={type} {...field} className={inputClass} disabled={disabled} maxLength={this.props.maxLength} placeholder={placeholder}/>
                        <div className="input-group__button">
                            <button className="button button--secondary" type="submit" onClick={submit}
                                    disabled={disabled}><span className="icon icon-search"></span>
                            </button>
                        </div>
                    </div>
                </form>
                <small className={smallClass}>{smallText}</small>
            </div>
        );
    }
}

SearchInput.PropTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    //field: PropTypes.object.isRequired    
};

export default SearchInput;
