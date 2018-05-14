import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { AddButton } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addButton: {
        position: 'absolute',
        top: 13,
        right: 13
    },
    marker: {
        width: 10,
        height: 10,
        borderRadius: 10
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
        mapItems: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            allergenType: PropTypes.string,
            comment: PropTypes.string
        })),
        onMapRegionChange: PropTypes.func.isRequired,
        onPressAdd: PropTypes.func.isRequired,
        onPressFilters: PropTypes.func.isRequired
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
        },
        mapItems: []
    };

    constructor(props) {
        super(props);

        this.handleMapRegionChange = this.handleMapRegionChange.bind(this);
    }

    handleMapRegionChange(mapRegion) {
        this.props.onMapRegionChange(mapRegion);
    }

    render() {
        const {
            userLocation,
            mapRegion,
            mapItems,
            onPressAdd,
            onPressFilters
        } = this.props;

        const markers = mapItems.map(mapItem => (
            <Marker
                key={mapItem.id}
                title={mapItem.allergenType}
                description={mapItem.comment}
                pinColor={mapItem.isOwnedByUser ? 'green' : 'red'}
                draggable={mapItem.isOwnedByUser}
                coordinate={{ latitude: mapItem.latitude, longitude: mapItem.longitude }}
                onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
            />
        ));

        return (
            <View style={styles.container}>
                { !!userLocation.latitude && !!mapRegion.latitude &&
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation
                        showsMyLocationButton
                        initialRegion={mapRegion}
                        onRegionChange={this.handleMapRegionChange}
                        style={styles.container}
                    >
                        {markers}
                    </MapView>
                }
                <View style={styles.addButton}>
                    <AddButton onAddPress={onPressAdd} />
                </View>
            </View>
        );
    }
}
