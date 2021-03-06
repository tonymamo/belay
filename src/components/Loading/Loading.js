import React, { Component } from 'react';
import classNames from 'classnames';

class Loading extends Component {
    render() {
        const { inline, fullScreen, muted, className } = this.props;

        var classList = classNames(
            'loading',
            {
                'loading--inline':     inline,
                'loading--fullscreen': fullScreen,
                [`${className}`]:      className
            }
        );

        var fillType = classNames(
            'loading__bubble',
            { 'loading__bubble--muted': muted }
        );

        return (
            <div className={classList}>
                <svg width='32px' height='32px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
                    <path d="M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z" className={fillType}></path>
                    <circle cx="30" cy="47" r="5" className="loading__dot"/>
                    <circle cx="50" cy="47" r="5" className="loading__dot"/>
                    <circle cx="70" cy="47" r="5" className="loading__dot"/>
                </svg>
                {
                    this.props.children &&
                    <div className="loading__text">{this.props.children}</div>
                }
            </div>
        );
    }
}

export default Loading;
