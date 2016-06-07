import React, { PropTypes } from 'react';
import classNames from 'classnames';

class GridItem extends React.Component {
    render() {
        const { xs, sm, md, lg, xl, xsOffset, smOffset, mdOffset, lgOffset, xlOffset } = this.props;

        var classList = classNames({
            [`grid__xs-${xs}`]: xs,
            [`grid__sm-${sm}`]: sm,
            [`grid__md-${md}`]: md,
            [`grid__lg-${lg}`]: lg,
            [`grid__xl-${xl}`]: xl,
            [`grid__xs--offset-${xsOffset}`]: xsOffset,
            [`grid__sm--offset-${smOffset}`]: smOffset,
            [`grid__md--offset-${mdOffset}`]: mdOffset,
            [`grid__lg--offset-${lgOffset}`]: lgOffset,
            [`grid__xl--offset-${xlOffset}`]: xlOffset
        });

        return (
            <div className={classList}>
                {this.props.children}
            </div>
        );
    }
}

GridItem.propTypes = {
    xs: PropTypes.string,
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
    xl: PropTypes.string,
    xsOffset: PropTypes.string,
    smOffset: PropTypes.string,
    mdOffset: PropTypes.string,
    lgOffset: PropTypes.string,
    xlOffset: PropTypes.string,
};

export default GridItem;
