import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Alert extends Component {
    close() {
        this.props.opened = false;
        this.forceUpdate();
    }

    getTypeIcon() {
        switch( this.props.type ) {
            case 'danger':
            case 'warning':
                return 'warning';
            case 'info':
                return 'info-circle';
            case 'success':
                return 'check-circle';
            default:
                return 'info-circle';
        }
    }

    render() {
        const { children, undoAction, close, dismissable, alertNumber, alertNumberTotal, type, className } = this.props;

        var classList = classNames(
            'alert',
            `alert--${type}`,
            className,
            { 'alert--dismissable': dismissable }
        );

        var iconClass = classNames(
            'icon',
            `icon-${this.getTypeIcon()}`
        );

        return (
            <div className={classList}>
                {
                    dismissable &&
                    <button onClick={close || this.close} className="alert__close" type="button" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                    </button>
                }
                <div>
                    <span className={iconClass}/>

                    {
                        alertNumber && alertNumberTotal && alertNumberTotal > 1 &&
                        <small>
                            <em>Message {alertNumber} of {alertNumberTotal}: </em>
                        </small>
                    }
                    {children}
                    {
                        (undoAction && typeof undoAction === 'function') &&
                        <a href="" className="alert__link" onClick={undoAction}><span className="icon icon-undo"/>Undo</a>
                    }
                </div>
            </div>
        );
    }
}

Alert.propTypes = {
    dismissable: PropTypes.bool,
    type:        PropTypes.string.isRequired,
    undoAction:  PropTypes.func
};

export default Alert;
