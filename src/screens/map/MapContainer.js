import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery, allMapItemsQuery } from '../../graphql/queries';
import { setUserLocation, setMapRegion } from '../../actions/location';
import MapScreen from './MapScreen';

const mapStateToProps = ({ Location }) => ({
    userLocation: {
        latitude: Location.userLocation.coords.latitude,
        longitude: Location.userLocation.coords.longitude
    },
    mapRegion: Location.mapRegion
});

const mapDispatchToProps = {
    setUserLocation,
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
    mapItems: ownProps.mapItems.map(mapItem => ({
        ...mapItem,
        isOwnedByUser: mapItem.user.id === ownProps.userId
    })),
    onUserLocationChange: (location) => {
        dispatchProps.setUserLocation(location);
    },
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
