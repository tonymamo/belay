import React, { PropTypes } from 'react';

class NavList extends React.Component {
    handleNavClick(link, event) {
        event.preventDefault();
        this.context.router.push(link);
    }

    renderNavList() {
        const { items, linkText, linkMap, location } = this.props;
        const renderedNavItems = [];

        items.forEach((item, index) => {
            // :variable regex
            let regex = /\:(\w+)/g;

            let link = linkMap.replace(regex, (str, p1) => {
                return item[p1];
            });

            let text = linkText.replace(regex, (str, p1) => {
                return item[p1];
            });

            let activeClass = (link === location.pathname) ? 'list-group__item--active' : '';
            // If there was an overriden function to render this item, call it
            if ( this.props.renderItem ) {
                renderedNavItems.push(
                    this.props.renderItem({
                        item,
                        link,
                        text,
                        activeClass,
                        index
                    })
                );
            } else {
                renderedNavItems.push(this.renderDefault(text, link, activeClass, index));
            }
        });

        return renderedNavItems;
    }

    renderDefault(text, link, activeClass, index) {
        return (
            <a className={`list-group__item ${activeClass}`}
               href={link}
               key={index}
               onClick={this.handleNavClick.bind(this, link)}>{text}</a>
        );
    }

    render() {
        return (
            <nav className="list-group">
                {this.renderNavList()}
            </nav>
        );
    }
}

NavList.propTypes = {
    type:  PropTypes.oneOf(['nav']).isRequired,
    items: PropTypes.array.isRequired,

    // format: '/test/:property/thing' --  uses item[property]
    linkMap: PropTypes.string.isRequired,

    // format: ':firstName :lastName' --  uses item[firstName] and item[lastName]
    linkText: PropTypes.string.isRequired,

    usePagination: PropTypes.bool
};

NavList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default NavList;
