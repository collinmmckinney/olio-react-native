import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default class MapScreen extends Component {
    static propTypes = {
        userId: PropTypes.string,
        isUserNull: PropTypes.bool,
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
        mapFollowsLocation: PropTypes.bool,
        onNullUser: PropTypes.func,
        onUserLocationChange: PropTypes.func.isRequired,
        onMapRegionChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        userId: '',
        isUserNull: false,
        onNullUser: () => {},
        userLocation: {
            latitude: null,
            longitude: null
        },
        mapRegion: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null
        },
        mapFollowsLocation: false
    };

    componentWillMount() {
        navigator.geolocation.requestAuthorization();
        this.locationWatchId = navigator.geolocation.watchPosition((location) => {
            this.handleUserLocationChange(location);
        }, (error) => {
            console.log(error);
        }, { enableHighAccuracy: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUserNull) {
            nextProps.onNullUser();
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.locationWatchId);
    }

    handleUserLocationChange(location) {
        const { mapFollowsLocation, onUserLocationChange, onMapRegionChange } = this.props;
        onUserLocationChange(location);
        if (mapFollowsLocation) {
            onMapRegionChange({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0121
            });
        }
    }

    render() {
        const { userLocation, mapRegion } = this.props;

        return (
            <View style={styles.container}>
                { !!userLocation.latitude && !!mapRegion.latitude &&
                    <MapView
                        region={mapRegion}
                        style={styles.container}
                    />
                }
            </View>
        );
    }
}
