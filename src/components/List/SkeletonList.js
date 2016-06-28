import React from 'react';
import Loading from '../Loading/Loading.js';

class SkeletonList extends React.Component {
    render() {
    	var skeletonItem = { height: '38px' };
        
        return (
            <div className="list-group">
                <div className="list-group__item">
                    <div className="skeleton-text"/>
                </div>
                <div className="list-group__item">
                    <div className="skeleton-text"/>
                </div>
                <div className="list-group__item">
                    <div className="skeleton-text"/>
                </div>
                <div className="list-group__item">
                    <div className="skeleton-text"/>
                </div>
                <div className="list-group__item">
                    <div className="skeleton-text"/>
                </div>
            </div>
        );
    }
}

export default SkeletonList;
