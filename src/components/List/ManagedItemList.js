import React, { PropTypes } from 'react';
import Button from '../Button/Button.js';

class ManagedItemList extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTable() {
        return (
            <div className="responsive-table">
                <table className="table small table--hover">
                    <thead className="thead--default">
                        <tr>
                            { this.renderTableHeader() }
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTableBody() }
                    </tbody>
                </table>
            </div>
        );
    }

    renderTableHeader() {
        const { headers, actions, sortable } = this.props;
        let renderedHeaders = [];

        headers.forEach((header) => {
            renderedHeaders.push(
                <th>
                    <div className="text--truncate" title={header.text}>{header.text}</div>
                </th>
            );
        });

        // Add a blank labeled table header for the actions column
        if (actions) {
            renderedHeaders.push(<th></th>);
        }

        return renderedHeaders;
    }

    renderTableBody() {
        const { items } = this.props;
        let rows = [];

        // for each item, render its row
        items.forEach((item, i) => {
            rows.push(
                <tr className="managed-item" key={`managed-list-${i}`}>
                    {this.renderTableRow(item, i)}
                </tr>
            );
        });

        return rows;
    }

    getMappedValue(item, header, map) {
        let mapItem, mapValue;
        map.some((mapItem) => {
            if (mapItem.Key == item[header.property]) {
                mapValue = mapItem.Value;
                return true;
            }
        });

        // default to the actual value
        return mapValue || item[header.property];
    }

    renderTableRow(item, i) {
        const { headers, selectable, actions, hideActions } = this.props;
        let cell;
        let boolVal;
        let statusValue;
        let cols = [];

        if (selectable) {
            cols.push(<td><input type="checkbox" checked={item.selected} onChange={this.props.toggleSelectItems.bind(this, !item.selected, item)}/></td>);
        }

        // for each header, add the value from this item
        headers.forEach((header) => {
            if (header.format === 'date') {
                let dateValue = formatDate(new Date(Date.parse(item[header.property])));
                cell = (
                    <td>
                        <div className="text--truncate" title={dateValue}>{dateValue}</div>
                    </td>
                );
            } else if (header.format === 'status') {
                statusValue = item[header.property];
                var statusClass;

                switch (statusValue.toUpperCase()) {
                    case 'INFO':
                        statusClass = 'background--success';
                        break;
                    case 'WARNING':
                        statusClass = 'background--warning';
                        break;
                    case 'NOTICE':
                        statusClass = 'background--info';
                        break;
                    case 'ERROR':
                        statusClass = 'background--danger';
                        break;
                    default:
                        statusClass = '';
                        break;
                }

                cell = (
                    <td className={statusClass}>
                        <div className="text--truncate align--center text--capitalize"
                            title={item[header.property]}>{item[header.property].toLowerCase()}</div>
                    </td>
                );
            } else if (header.map) {
                let mappedValue = this.getMappedValue(item, header, header.map);
                cell = (
                    <td>
                        <div className="text--truncate"
                            title={mappedValue}>{mappedValue}</div>
                    </td>
                );
            } else if (header.format === 'bool') {
                boolVal = item[header.property] ? 'Yes' : 'No';

                cell = (
                    <td>
                        <div className="text--truncate" title={boolVal}>{boolVal}</div>
                    </td>
                );
            } else {
                cell = (
                    <td>
                        <div className="text--truncate" title={item[header.property]}>{item[header.property]}</div>
                    </td>
                );
            }
            cols.push(cell);
        });

        if (hideActions) {
            cell = <td></td>;
            cols.push(cell);
        } else if (actions) {
            // Add action buttons in the last column if they're available
            var renderedActions = [];

            actions.forEach((action) => {
                if (action.hasAccess) {
                    switch (action.type) {
                        case 'button':
                            renderedActions.push(this.createButtonAction(action, item));
                            break;
                        default:
                            renderedActions.push(this.createLinkAction(action, item));
                            break;
                    }
                }
            });

            cell = (
                <td className="align--right">
                    <div className="managed-item__actions">{renderedActions}</div>
                </td>
            );

            cols.push(cell);
        }

        return cols;
    }

    createLinkAction(action, item) {
        var route = action.route;

        // If there are parameters, string replace the :param string out with the param value from item
        if (action.params) {
            let paramValue, paramProperty;

            for (let paramString in action.params) {
                paramProperty = action.params[paramString];
                paramValue = item[paramProperty];

                // If the property isn't available on the item itself, but, is passed in through props
                if (!paramValue && this.props[paramProperty]) {
                    paramValue = this.props[paramProperty];
                }

                route = route.replace(paramString, paramValue);
            }
        }

        return (
            <a href={route} onClick={this.handleClickLink.bind(this, route)} className={`managed-item__button ${action.className}`} title={action.text}>
                <span className={`icon icon-${action.iconClass}`}/><span className="sr-only">{action.text}</span>
            </a>
        );
    }

    handleClickLink(link, event) {
        event.preventDefault();
        this.context.router.push(link);
    }

    createButtonAction(action, item) {
        let onClick, onClickHandler;

        // onClick can be passed in directly as a function or as a string representing a function passed in via props
        if (typeof action.onClick === 'function') {
            onClick = action.onClick;
        } else {
            if (typeof action.onClick === 'string' &&
                this.props[action.onClick] &&
                typeof this.props[action.onClick] === 'function') {
                    onClick = this.props[action.onClick];
                } else {
                    throw new Error('Expected onClick to be set for button action.');
                }
        }

        // pass in the whole row item as the parameter
        onClickHandler = () => {
            onClick.apply(this, [item]);
        };

        return (
            <button onClick={onClickHandler} className={`managed-item__button ${action.className}`} title={action.text}>
                <span className={`icon icon-${action.iconClass}`}/><span className="sr-only">{action.text}</span>
            </button>
        );
    }

    render() {
        const { items } = this.props;

        return (
            <div>
                {items && items.length > 0 &&
                    this.renderTable()
                }
            </div>
        );
    }
}

ManagedItemList.propTypes = {
    type: PropTypes.oneOf(['managed']).isRequired,
    items: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    actions: PropTypes.array
};

ManagedItemList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ManagedItemList;
