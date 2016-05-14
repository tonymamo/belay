import React, { Component, PropTypes } from 'react';

class SearchInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {field, disabled, submit} = this.props;

        return (
            <form onSubmit={submit}>
                <div className="input-group">
                    <input {...this.props} {...field} className="form-control"/>
                    <div className="input-group__button">
                        <button className="button button--secondary" type="submit" disabled={disabled}>
                            <span className="icon icon-search"></span>
                        </button>
                    </div>
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
