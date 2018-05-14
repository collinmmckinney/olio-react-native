import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { fetchAirQuality, fetchAirQualityForecast } from '../actions/airQuality';
import AirQualityScreen from './AirQualityScreen';

const mapStateToProps = ({ AirQuality, Map }, ownProps) => {
    return {
        latitude: Map.userLocation.coords.latitude,
        longitude: Map.userLocation.coords.longitude,
        currentAirQuality: AirQuality.current.quality,
        forecasts: AirQuality.forecasts
    };
};

const mapDispatchToProps = {
    fetchAirQuality,
    fetchAirQualityForecast
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    fetchAirQuality: () => {
        dispatchProps.fetchAirQuality(stateProps.latitude, stateProps.longitude);
        dispatchProps.fetchAirQualityForecast(stateProps.latitude, stateProps.longitude);
    }
});

export default compose(
    withApollo,
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(AirQualityScreen);
