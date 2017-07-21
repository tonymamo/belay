import React, { Component, PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';

class GeoSuggest extends Component {
    componentWillReceiveProps(nextProps) {
        let { field, latitude, longitude } = nextProps;

        if ( this.props.field && !this.props.field.pristine && field && field.pristine && field.onChange && this.props.field.initialValue !== field.initialValue ) {
            field.onChange(field.initialValue);
            latitude.onChange(latitude.initialValue);
            longitude.onChange(longitude.initialValue);

            this.geo.update(field.initialValue);
        }
    }

    onFocus() {
        const { field, latitude, longitude } = this.props;
        if ( field && field.onFocus ) {
            field.onFocus();
        }

        if ( latitude && latitude.onFocus ) {
            latitude.onFocus();
        }

        if ( longitude && longitude.onFocus ) {
            longitude.onFocus();
        }
    }

    onGeoSuggestSelect(event) {
        // note that field = location
        const { field, latitude, longitude } = this.props;

        if ( field && field.onChange ) {
            field.onChange(event.label);
            field.onBlur();
        }

        if ( event.location && latitude && latitude.onChange ) {
            latitude.onChange(event.location.lat);
            latitude.onBlur();
        }

        if ( event.location && longitude && longitude.onChange ) {
            longitude.onChange(event.location.lng);
            longitude.onBlur();
        }
    }

    onInputChange(value) {
        const { field, latitude, longitude } = this.props;

        if ( field && field.onChange ) {
            field.onChange(value);
            field.onBlur();
        }

        if ( latitude && latitude.onChange ) {
            latitude.onChange(null);
            latitude.onBlur();
        }

        if ( longitude && longitude.onChange ) {
            longitude.onChange(null);
            longitude.onBlur();
        }
    }

    render() {
        const { disabled, placeholder, radius, location, field, onKeyPress } = this.props;

        return (
            <Geosuggest {...field}
                        disabled={disabled}
                        placeholder={placeholder}
                        radius={radius}
                        location={location}
                        onFocus={this.onFocus.bind(this)}
                        onChange={this.onInputChange.bind(this)}
                        onSuggestSelect={this.onGeoSuggestSelect.bind(this)}
                        onKeyPress={onKeyPress}
                        ref={(geo) => this.geo = geo}/>
        );
    }
}

GeoSuggest.PropTypes = {
    placeholder: PropTypes.string,
    radius:      PropTypes.string,
    location:    PropTypes.object.isRequired,
    field:       PropTypes.object,
    latitude:    PropTypes.object,
    longitude:   PropTypes.object
};

GeoSuggest.defaultProps = {
    placeholder: 'Location',
    radius:      '25'
};

export default GeoSuggest;

