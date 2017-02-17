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
        latitude.onChange(event.location.lat);
        longitude.onChange(event.location.lng);
    }

    render() {
        const {
            disabled,
            placeholder,
            radius,
            location,
            field
        } = this.props;

        let googleLocation;

        if ( !location ) {
            googleLocation = new google.maps.LatLng(41.8333908, -88.0130256);
        } else {
            googleLocation = location;
        }

        return (
            <Geosuggest
                disabled={disabled}
                placeholder="Location"
                radius="20"
                location={googleLocation}
                onSuggestSelect={this.onGeoSuggestSelect.bind(this)}
                className="form-control"
                {...field}
            />
        );
    }
}

GeoSuggest.PropTypes = {
    disabled:         PropTypes.bool,
    location:         PropTypes.object,
    field:            PropTypes.object.isRequired,
    latitude:         PropTypes.object.isRequired,
    longitude:        PropTypes.object.isRequired,
};

export default GeoSuggest;
