import React, { Component, PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';

class GeoSuggest extends Component {
    constructor(props) {
        super(props);
    }

    onGeoSuggestSelect(event) {
        // note that field = location
        const { field, latitude, longitude } = this.props;

        field.onChange(event.label);

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
                placeholder="Location"
                radius="20"
                location={location}
                onSuggestSelect={this.onGeoSuggestSelect.bind(this)}
                {...field}
            />
        );
    }
}

GeoSuggest.PropTypes = {
    disabled:         PropTypes.bool,
    location:         PropTypes.object.isRequired,
    field:            PropTypes.object.isRequired,
    latitude:         PropTypes.object,
    longitude:        PropTypes.object
};

export default GeoSuggest;
