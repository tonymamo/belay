import React, { PropTypes } from 'react';

class List extends React.Component {

    constructor(props) {
        super(props);
    }

    handleNavClick(link, event) {
        event.preventDefault();
        this.context.router.push(link);
    }

    renderNavList() {
        const { items, linkText, linkMap } = this.props;
        const renderedNavItems = [];

        // :variable regex
        let regex = /\:([A-Za-z]+)/g;

        items.forEach((item) => {
            let link = linkMap.replace(regex, (str, p1) => {
                return item[p1];
            });

            let text = linkText.replace(regex, (str, p1) => {
                return item[p1];
            });

            let activeClass = (link === window.location.pathname) ? 'list-group__item--active' : '';

            renderedNavItems.push((
                <a className={`list-group__item ${activeClass}`}
                    href={link}
                    onClick={this.handleNavClick.bind(this, link)}>{text}</a>
            ));
        });

        return renderedNavItems;
    }

    render() {
        return (
            <div>
                {'nav' === this.props.type &&
                    <nav className="list-group">
                        {this.renderNavList()}
                    </nav>
                }

                {'managed' === this.props.type &&
                    <div>
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}

List.propTypes = {
    type: PropTypes.oneOf(['nav', 'managed']).isRequired,
    items: PropTypes.array.isRequired,

    // {format: '/test/:property/thing'} | uses item[property]
    linkMap: PropTypes.string,

    linkText: PropTypes.string
};

// todo: need to split this off in the nav link component only
List.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default List;
