import React, { Component, PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';

class GeoSuggest extends Component {
    constructor(props) {
        super(props);
    }

    onGeoSuggestSelect(event) {
        // note that field = location
        const { field, latitude, longitude } = this.props;

        if ( field && field.onChange ) {
            field.onChange(event.label);
        }

        if ( latitude && latitude.onChange ) {
            latitude.onChange(event.location.lat);
        }

        if ( longitude && longitude.onChange ) {
            longitude.onChange(event.location.lng);
        }
    }

    render() {
        const {
            disabled,
            placeholder,
            radius,
            location,
            field
        } = this.props;

        return (
            <Geosuggest
                disabled={disabled}
                placeholder={placeholder}
                radius={radius}
                location={location}
                onSuggestSelect={this.onGeoSuggestSelect.bind(this)}
                {...field}
            />
        );
    }
}

GeoSuggest.PropTypes = {
    placeholder:      PropTypes.string,
    radius:           PropTypes.string,
    location:         PropTypes.object.isRequired,
    field:            PropTypes.object,
    latitude:         PropTypes.object,
    longitude:        PropTypes.object
};

GeoSuggest.defaultProps = {
    placeholder: 'Location',
    radius:      '25'
};

export default GeoSuggest;

