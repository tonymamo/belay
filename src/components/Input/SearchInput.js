import React, { Component, PropTypes } from 'react';

class SearchInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {field, disabled, submit} = this.props;

        return (
            <form onSubmit={submit}>
                <input {...this.props} {...field}/>
                <div className="input-group__button">
                    <button className="button button--secondary" type="submit" disabled={disabled}><span className="icon icon-search"></span>
                    </button>
                </div>
            </form>
        );
    }
}

SearchInput.PropTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    field: PropTypes.object
};

export default SearchInput;
