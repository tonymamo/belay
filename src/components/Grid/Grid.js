import React from 'react';

class Grid extends React.Component {
    render() {
        return (
            <div className="grid">
                {this.props.children}
            </div>
        );
    }
}

export default Grid;
