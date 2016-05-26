import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {color, icon, text, disabled, block, size, className} = this.props;

        var classList = classNames(
            'button',
            `button--${color}`,
            {
                'button--block': block,
                [`button--${size}`]: size,
                [`${className}`]: className
            }
        );

        return (
            <button {...this.props} className={classList} title={text} disabled={disabled}>
                {icon && <span className={`icon icon-${icon}`}></span>}
                {text}
            </button>
        );
    }
}

Button.propTypes = {
    type: PropTypes.string, // TODO: a switch for toggling between <button> and <Link>
    color: PropTypes.string.isRequired,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    block: PropTypes.bool
};

export default Button;
