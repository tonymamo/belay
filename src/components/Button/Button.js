import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(link, event) {
        event.preventDefault();
        this.context.router.push(link);
    }

    render() {
        let {type, to, color, icon, text, disabled, block, size, className, onClick} = this.props;

        var classList = classNames(
            'button',
            'text--truncate',
            `button--${color}`,
            {
                ['button--block']: block,
                ['disabled']: disabled,
                [`button--${size}`]: size,
                [`${className}`]: className
            }
        );

        let content;
        switch (type.toLowerCase()) {
            case 'link':
                content = (
                    <a href={to} className={classList} title={text} disabled={disabled} onClick={this.handleClick.bind(this, to)}>
                        {icon && <span className={`icon icon-${icon}`}/>}
                        {text}
                    </a>
                );
                break;
            case 'button':
            default:
                content = (
                    <button type={type} className={classList} title={text} disabled={disabled} onClick={onClick}>
                        {icon && <span className={`icon icon-${icon}`}/>}
                        {text}
                    </button>
                );
                break;
        }

        return content;
    }
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    block: PropTypes.bool
};

Button.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Button;
