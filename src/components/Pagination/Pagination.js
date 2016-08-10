import React, { PropTypes} from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePageNumber: this.props.activePageNumber
        };
    }

    componentDidUpdate(previousProps, previousState) {
        if (this.props.activePageNumber != previousProps.activePageNumber) {
            this.setState({
               activePageNumber: this.props.activePageNumber
            });
        }
    }

    onEllipsisClick(e) {
        e.preventDefault();
    }

    getOnClickHandler() {
        return this.props.onChangePage || this.onChangePage;
    }

    onChangePage(i, e) {
        e.preventDefault();
        this.setState({
            activePageNumber: i
        });
        console.log(this.state.activePageNumber);
    }

    renderEllipsis(key) {
        return (
            <li className="pagination__item pagination__item--disabled" key={key}>
                <a href="" onClick={this.onEllipsisClick.bind(this)}>
                    <span aria-hidden="true">&hellip;</span>
                </a>
            </li>
        );
    }

    renderPageItems() {
        const { numberOfPages, useEllipsis, showFirstLast } = this.props;
        const { activePageNumber } = this.state;

        let items = [],
            i,
            itemClass,
            ellipsisPages = this.props.ellipsisPages % 2 === 0 ? this.props.ellipsisPages + 1: this.props.ellipsisPages, // if the ellipsis pages number is even, then add one to make it an odd number
            ellipsisPagesPerSide = Math.floor(ellipsisPages / 2),
            startingPageNumber = 1,
            endingPageNumber = numberOfPages,
            useLeftEllipsis = false,
            useRightEllipsis = false;

        if (useEllipsis && numberOfPages > ellipsisPages) {
            // When the active page is in the start zone, we won't need the left ellipsis
            let startZone = 1 + ellipsisPagesPerSide + (showFirstLast ? 1 : 0);
            let endZone = numberOfPages - ellipsisPagesPerSide - (showFirstLast ? 1 : 0);

            // determine start and end page numbers based on the above "zones"
            if (activePageNumber <= startZone) {
                // if the next page was going to be the end or the ellipsis is only going to cover a single page, then don't worry about ellipsis
                if (ellipsisPages + 2 >= numberOfPages) {
                    endingPageNumber = numberOfPages;
                } else {
                    endingPageNumber = ellipsisPages;
                    useRightEllipsis = true;
                }
            } else if (activePageNumber >= endZone) {
                startingPageNumber = numberOfPages - ellipsisPages + 1;
                endingPageNumber = numberOfPages;
                useLeftEllipsis = true;

                if (startingPageNumber - 2 <= 1) {
                    useLeftEllipsis = false;
                    startingPageNumber = 1;
                }
            } else {
                startingPageNumber = activePageNumber - ellipsisPagesPerSide;
                endingPageNumber = activePageNumber + ellipsisPagesPerSide;
                useLeftEllipsis = true;
                useRightEllipsis = true;

                // if the ellipsis is only covering a single page, again we won't need the left ellipsis
                if (startingPageNumber - 2 <= 1) {
                    useLeftEllipsis = false;
                    startingPageNumber = 1;
                }

                if (endingPageNumber + 2 >= numberOfPages) {
                    useRightEllipsis = false;
                    endingPageNumber = numberOfPages;
                }

            }
        }

        if (useLeftEllipsis) {
            if (showFirstLast) {
                items.push(
                    <li className="pagination__item" key="firstPaginationItem">
                        <a href="" aria-label="First" onClick={this.getOnClickHandler().bind(this, 1)}>
                            1
                        </a>
                    </li>
                );
            }

            items.push(this.renderEllipsis('leftEllipsis'));
        }

        for (i = startingPageNumber; i <= endingPageNumber; i++) {
            itemClass = i == activePageNumber ? 'pagination__item pagination__item--active' : 'pagination__item';
            items.push(<li className={itemClass} key={i}><a href="" onClick={this.getOnClickHandler().bind(this, i)}>{i}</a></li>);
        }

        if (useRightEllipsis) {
            items.push(this.renderEllipsis('rightEllipsis'));

            if (showFirstLast) {
                items.push(
                    <li className="pagination__item" key="lastPaginationItem">
                        <a href="" aria-label="Last" onClick={this.getOnClickHandler().bind(this, numberOfPages)}>
                            {numberOfPages}
                        </a>
                    </li>
                );
            }
        }

        return items;
    }

    render() {
        const { numberOfPages, showPreviousNext } = this.props;
        const { activePageNumber } = this.state;
        let previousPage, nextPage, disablePrevious = false, disableNext = false;

        // Set previous page buttons disabled flag and page #
        if (activePageNumber > 1) {
            previousPage = activePageNumber - 1;
        } else {
            previousPage = 1;
            disablePrevious = true;
        }

        // Set previous page buttons disabled flag and page #
        if (activePageNumber < numberOfPages) {
            nextPage = activePageNumber + 1;
        } else {
            nextPage = numberOfPages;
            disableNext = true;
        }

        return (
            <nav className="align--center pagination-container">
                <ul className="pagination pagination--sm">
                    { showPreviousNext &&
                        <li className={`pagination__item${disablePrevious ? ' pagination__item--disabled' : ''}`} key="previousPaginationItem">
                            <a href="" aria-label="Previous" onClick={this.getOnClickHandler().bind(this, previousPage)}>
                                <span aria-hidden="true">&lsaquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                    }
                    { this.renderPageItems() }
                    { showPreviousNext &&
                        <li className={`pagination__item${disableNext ? ' pagination__item--disabled' : ''}`} key="nextPaginationItem">
                            <a href="" aria-label="Next" onClick={this.getOnClickHandler().bind(this, nextPage)}>
                                <span aria-hidden="true">&rsaquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    }
                </ul>
            </nav>
        );
    }
}

Pagination.proptypes = {
    onChangePage: PropTypes.func.isRequired,
    showPreviousNext: PropTypes.bool,
    showFirstLast: PropTypes.bool,
    useEllipsis: PropTypes.bool,
    ellipsisPages: PropTypes.number,
    numberOfPages: PropTypes.number.isRequired,
    activePageNumber: PropTypes.number.isRequired
};

Pagination.defaultProps = {
    showPreviousNext: true,
    showFirstLast: true,
    useEllipsis: true,
    ellipsisPages: 5,
    activePageNumber: 1
};

export default Pagination;
