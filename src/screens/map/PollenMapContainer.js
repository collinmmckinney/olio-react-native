import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import { setMapRegion } from '../../actions/map';
import { fetchDailyWeather, fetchHourlyWeather } from '../../actions/weather';
import PollenMapScreen from './PollenMapScreen';

const mapStateToProps = ({ Map, Weather }) => ({
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
    windDirection: Weather.dailyForecasts[0] ?
        Weather.dailyForecasts[0].windDirection.charAt(0) : null,
    severity: Weather.dailyForecasts[0] ? Weather.dailyForecasts[0].grass : null,
    selectedAllergenType: Map.selectedAllergenType
});

const mapDispatchToProps = {
    setMapRegion,
    fetchDailyWeather,
    fetchHourlyWeather
};

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    onMapRegionChange: (mapRegion) => {
        dispatchProps.setMapRegion(mapRegion);
    },
    fetchPollen: () => {
        const { latitude, longitude } = stateProps.userLocation;
        dispatchProps.fetchDailyWeather(latitude, longitude);
        dispatchProps.fetchHourlyWeather(latitude, longitude);
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(PollenMapScreen);
