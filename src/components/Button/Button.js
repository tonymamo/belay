import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {type, color, icon, text, disabled, block, clickFunc, size} = this.props;

        var classList = classNames(
            'button',
            `button--${color}`,
            {
                'button--block': block,
                [`button--${size}`]: size
            }
        );

        return (
            <button {...this.props} className={classList} title={text} onClick={clickFunc} disabled={disabled}>
                {icon && <span className={`icon icon-${icon}`}></span>}
                <span>{text}</span> {/* span is there to add spacing with .icon + span selector */}
            </button>
        );
    }
}

Button.propTypes = {
    clickFunc: PropTypes.func, // TODO: make required for <button>s, but not for <Link>s
    type: PropTypes.string, // TODO: a switch for toggling between <button> and <Link>
    color: PropTypes.string.isRequired,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    block: PropTypes.bool
};

export default Button;
