import React, { PropTypes } from 'react';
import NavList from './NavList.js';
import Loading from '../Loading/Loading.js';

class List extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { isLoading, type } = this.props;
        let content;

        if (isLoading) {
            content = <Loading />;
        } else {
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
