import React, { Component, PropTypes } from 'react';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revealed: false
        };
    }

    toggleVisibility() {
        this.setState({
            revealed: !this.state.revealed
        });
    }

    render() {
        const { field } = this.props;
        const { revealed } = this.state;

        return (
            <div className="input-group">
                <input {...this.props} {...this.props.field} type={ revealed ? 'text' : 'password'} className="form-control"/>
                <span className="input-group__button">
                    <button 
                        className={`button button--${revealed ? 'danger' : 'success'}`}
                        type="button" 
                        onClick={this.toggleVisibility.bind(this)}
                        title={ revealed ? 'Hide Password' : 'Show Password'}>
                            <small className="text--uppercase">{revealed ? 'Hide' : 'Show'}</small>
                    </button>
                </span>
            </div>
        );
    }
}

Password.PropTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    //field: PropTypes.object.isRequired
};

export default Password;
