import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {type, to, color, icon, text, disabled, block, size, className} = this.props;
        let content;

        var classList = classNames(
            'button',
            'text--truncate',
            `button--${color}`,
            {
                'button--block': block,
                [`button--${size}`]: size,
                [`${className}`]: className
            }
        );

        switch (type.toLowerCase()) {
            case 'button':
                content =   <button {...this.props} className={classList} title={text} disabled={disabled}>
                                {icon && <span className={`icon icon-${icon}`}/>}
                                {text}
                            </button>;
                break;
            case 'link':
                content =   <Link {...this.props} className={classList} title={text}>
                                {icon && <span className={`icon icon-${icon}`}/>}
                                {text}
                            </Link>;
                break;
            default:
                content =   <button {...this.props} className={classList} title={text} disabled={disabled}>
                                {icon && <span className={`icon icon-${icon}`}/>}
                                {text}
                            </button>;
                break;
        }

        return content;
    }
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    block: PropTypes.bool
};

export default Button;
