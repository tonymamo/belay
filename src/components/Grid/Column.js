import React, { PropTypes } from 'react';

class Column extends React.Component {
    render() {
        const { span, extrasmall, small, medium, large, extralarge, offset } = this.props;

        let colClass = '';

        if (extrasmall) {
            colClass += `grid__xs-${extrasmall}`;
        }

        if (small) {
            colClass += ` grid__sm-${small}`;
        }

        if (medium) {
            colClass += ` grid__md-${medium}`;
        }

        if (large) {
            colClass += ` grid__lg-${large}`;
        }

        if (extralarge) {
            colClass += ` grid__xl-${large}`;
        }

        // todo: offsets
        //colClass = offset ? `${colClass} grid__xs-offset-${span} grid__sm-offset-${span} grid__md-offset-${span} grid__lg-offset-${span}` : colClass;

        return (
            <div className={colClass}>
                {this.props.children}
            </div>
        );
    }
}

Column.propTypes = {
    span: PropTypes.string,
    extrasmall: PropTypes.string,
    small: PropTypes.string,
    medium: PropTypes.string,
    large: PropTypes.string,
    extralarge: PropTypes.string,
    offset: PropTypes.string
};

export default Column;
