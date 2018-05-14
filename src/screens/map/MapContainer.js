import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery, allMapItemsQuery } from '../../graphql/queries';
import { setMapRegion } from '../../actions/map';
import MapScreen from './MapScreen';

const mapStateToProps = ({ Map }) => ({
    userLocation: {
        latitude: Map.userLocation.coords.latitude,
        longitude: Map.userLocation.coords.longitude
    },
    mapRegion: Map.mapRegion.latitude ? Map.mapRegion : {
        latitude: Map.userLocation.coords.latitude,
        longitude: Map.userLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01
    },
    selectedAllergenType: Map.selectedAllergenType
});

const mapDispatchToProps = {
    setMapRegion
};

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mapAllMapItemsQueryToProps = ({ data: { loading, allMapItems } }) => ({
    mapItems: loading ? [] : allMapItems
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    mapItems: ownProps.mapItems
        .filter(mapItem => mapItem.allergenType === stateProps.selectedAllergenType)
        .map(mapItem => ({
            ...mapItem,
            isOwnedByUser: mapItem.user.id === ownProps.userId
        })),
    onMapRegionChange: (mapRegion) => {
        dispatchProps.setMapRegion(mapRegion);
    },
    onPressAdd: () => {
        ownProps.navigation.navigate('AddMapItem');
    },
    onPressFilters: () => {
        ownProps.navigation.navigate('MapFilters');
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(allMapItemsQuery, { props: mapAllMapItemsQueryToProps }),
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(MapScreen);
