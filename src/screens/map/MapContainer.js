import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery, allMapItemsQuery } from '../../graphql/queries';
import { setUserLocation, setMapRegion } from '../../actions/location';
import MapScreen from './MapScreen';

const mapStateToProps = ({ Location }, ownProps) => {
    return {
        userLocation: {
            latitude: Location.userLocation.coords.latitude,
            longitude: Location.userLocation.coords.longitude
        },
        mapRegion: Location.mapRegion
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUserLocationChange: (location) => {
            dispatch(setUserLocation(location));
        },
        onMapRegionChange: (mapRegion) => {
            dispatch(setMapRegion(mapRegion));
        },
        onPressAdd: () => {
            ownProps.navigation.navigate('AddMapItem');
        },
        onPressFilters: () => {
            ownProps.navigation.navigate('MapFilters');
        }
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        mapItems: ownProps.data.allMapItems
    };
};

export default compose(
    graphql(loggedInUserQuery),
    graphql(allMapItemsQuery),
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(MapScreen);
