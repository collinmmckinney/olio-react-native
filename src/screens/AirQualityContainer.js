import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { fetchAirQuality, fetchAirQualityForecast } from '../actions/airQuality';
import AirQualityScreen from './AirQualityScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        latitude: state.Map.userLocation.coords.latitude,
        longitude: state.Map.userLocation.coords.longitude
    };
};

const mapDispatchToProps = {
    fetchAirQuality,
    fetchAirQualityForecast
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    fetchAirQuality: () => {
        dispatchProps.fetchAirQuality(stateProps.latitude, stateProps.longitude);
        dispatchProps.fetchAirQualityForecast(stateProps.latitude, stateProps.longitude);
    }
});

export default compose(
    withApollo,
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(AirQualityScreen);
