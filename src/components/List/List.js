import React, { PropTypes, Component } from 'react';
import NavList from './NavList.js';
import ManagedItemList from './ManagedItemList.js';
import SkeletonList from './SkeletonList.js';
import Pagination from '../Pagination/Pagination.js';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePageNumber: 1
        };
    }

    componentDidUpdate(previousProps, previousState) {
        // If the previous amount of items were greater, and the current page is now empty, then we need to go back a page
        if (
            this.state.activePageNumber > 1 &&
            previousProps && previousProps.items && this.props && this.props.items &&
            previousProps.items.length > this.props.items.length &&
            this.getItemsStart() >= this.props.items.length
        ) {
            const currentPage = this.state.activePageNumber;

            if ( currentPage > 1 ) {
                this.setState({
                    activePageNumber: currentPage - 1
                });
            }

            const maxPages = Math.ceil(this.props.items.length / this.props.itemsPerPage);

            if ( currentPage > maxPages ) {
                this.setState({
                    activePageNumber: maxPages
                });
            }
        }
    }

    setActivePageNumber(pageNumber, e) {
        e.preventDefault();

        this.setState({
            activePageNumber: pageNumber
        });
    }

    getItemsStart() {
        const { itemsPerPage, activePageNumber } = this.props,
            currentPage = this.state.activePageNumber;

        return Number(itemsPerPage) * (currentPage - 1);
    }

    getPageItems() {
        let { items, usePagination, itemsPerPage } = this.props;
        let pageItems = items;

        // If pagination is enabled, set the items we're looping over to the current page's items
        if ( usePagination && itemsPerPage ) {
            itemsPerPage = Number(itemsPerPage);
            pageItems = [];
            let itemStart = this.getItemsStart();
            let itemEnd = itemStart + itemsPerPage;

            // Keep item end bound to the end of the list
            if ( itemEnd > items.length ) {
                itemEnd = items.length;
            }

            for(let i = itemStart; i < itemEnd; i++) {
                pageItems.push(items[i]);
            }
        }

        return pageItems;
    }

    render() {
        const { items, itemsPerPage, usePagination, isLoading, type } = this.props;
        let content = [];

        if ( isLoading ) {
            content.push(<SkeletonList/>);
        } else {
            let pageItems = this.getPageItems();
            let newProps = Object.assign({}, this.props, {
                items: pageItems
            });

            switch( type ) {
                case 'nav':
                    content.push(<NavList key={type} {...newProps}/>);
                    break;
                case 'managed':
                    content.push(<ManagedItemList key={type} {...newProps}/>);
                    break;
                default:
                    content.push(<div key={type}>List type must be set</div>);
                    break;
            }

            if (
                usePagination &&
                items &&
                items.length > 0 &&
                items.length > itemsPerPage
            ) {
                let numberOfPages = Math.ceil(items.length / itemsPerPage);

                content.push(
                    <Pagination key="pagination"
                                numberOfPages={numberOfPages}
                                activePageNumber={this.state.activePageNumber}
                                onChangePage={this.setActivePageNumber.bind(this)}
                    />
                );
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
    type:          PropTypes.oneOf(['nav', 'managed']).isRequired,
    items:         PropTypes.array.isRequired,
    itemsPerPage:  PropTypes.number,
    usePagination: PropTypes.bool
};

List.defaultProps = {
    itemsPerPage: 10
};

export default List;
