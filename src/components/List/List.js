import React, { PropTypes } from 'react';
import NavList from './NavList.js';

class List extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { type } = this.props;
        let content;

        switch (type) {
            case 'nav':
                content = <NavList {...this.props}/>;
                break;
            case 'managed':
                content = <NavList {...this.props}/>;
                break;
            default:
                content = <div>List type must be set</div>;
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

List.propTypes = {
    type: PropTypes.oneOf(['nav', 'managed']).isRequired,
    items: PropTypes.array.isRequired,

};

export default List;
