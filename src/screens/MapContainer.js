import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import { setLocation } from '../actions/location';
import MapScreen from './MapScreen';

const mapStateToProps = ({ Location }, ownProps) => {
    const userId = ownProps.data.loggedInUser ? ownProps.data.loggedInUser.id : null;
    const isUserNull = !ownProps.data.loading && !ownProps.data.loggedInUser;
    return {
        userId,
        isUserNull,
        latitude: Location.location.coords.latitude,
        longitude: Location.location.coords.longitude
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    navigator.geolocation.getCurrentPosition((location) => {
        dispatch(setLocation(location));
    }, (error) => {
        console.log(error);
    });

    return {
        onNullUser: () => {
            ownProps.navigation.navigate('SignInOrSignUp');
        },
        requestLocationPermission: () => {
            navigator.geolocation.requestAuthorization();
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps, mapDispatchToProps)
)(MapScreen);
