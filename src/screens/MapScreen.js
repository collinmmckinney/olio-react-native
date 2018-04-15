import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default class MapScreen extends Component {
    static propTypes = {
        userLocation: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number
        }),
        mapRegion: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            latitudeDelta: PropTypes.number,
            longitudeDelta: PropTypes.number
        }),
        onUserLocationChange: PropTypes.func.isRequired,
        onMapRegionChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        userLocation: {
            latitude: null,
            longitude: null
        },
        mapRegion: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null
        }
    };

    constructor(props) {
        super(props);

        this.handleMapRegionChange = this.handleMapRegionChange.bind(this);
    }

    componentWillMount() {
        navigator.geolocation.requestAuthorization();
        this.locationWatchId = navigator.geolocation.watchPosition((location) => {
            this.handleUserLocationChange(location);
        }, (error) => {
            console.log(error);
        }, { enableHighAccuracy: true });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.locationWatchId);
    }

    handleUserLocationChange(location) {
        const { mapRegion, onUserLocationChange, onMapRegionChange } = this.props;
        onUserLocationChange(location);
        if (mapRegion.latitude === null) {
            onMapRegionChange({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01
            });
        }
    }

    handleMapRegionChange(mapRegion) {
        this.props.onMapRegionChange(mapRegion);
    }

    render() {
        const { userLocation, mapRegion } = this.props;

        return (
            <View style={styles.container}>
                { !!userLocation.latitude && !!mapRegion.latitude &&
                    <MapView
                        provider="google"
                        showsUserLocation
                        showsMyLocationButton
                        initialRegion={mapRegion}
                        onRegionChange={this.handleMapRegionChange}
                        style={styles.container}
                    />
                }
            </View>
        );
    }
}
