import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import { setUserLocation, setMapRegion } from '../actions/location';
import MapScreen from './MapScreen';

const mapStateToProps = ({ Location }, ownProps) => {
    const isUserNull = !ownProps.data.loading && !ownProps.data.loggedInUser;
    return {
        isUserNull,
        userLocation: {
            latitude: Location.userLocation.coords.latitude,
            longitude: Location.userLocation.coords.longitude
        },
        mapRegion: Location.mapRegion,
        mapFollowsLocation: Location.mapFollowsLocation
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onNullUser: () => {
            ownProps.navigation.navigate('SignInOrSignUp');
        },
        onUserLocationChange: (location) => {
            dispatch(setUserLocation(location));
        },
        onMapRegionChange: (mapRegion) => {
            dispatch(setMapRegion(mapRegion));
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps, mapDispatchToProps)
)(MapScreen);
