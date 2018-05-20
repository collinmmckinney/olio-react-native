import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { DAY_ARRAY } from '../util';
import { fetchDailyWeather, fetchHourlyWeather } from '../actions/weather';
import AirQualityScreen from './AirQualityScreen';

const mapStateToProps = ({ Weather, Map }, ownProps) => {
    return {
        latitude: Map.userLocation.coords.latitude,
        longitude: Map.userLocation.coords.longitude,
        forecasts: Weather.dailyForecasts.map(forecast => ({
            dayOfTheWeek: DAY_ARRAY[new Date(forecast.date).getDay()],
            quality: forecast.airQuality
        }))
    };
};

const mapDispatchToProps = {
    fetchDailyWeather,
    fetchHourlyWeather
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    fetchAirQuality: () => {
        dispatchProps.fetchDailyWeather(stateProps.latitude, stateProps.longitude);
        dispatchProps.fetchHourlyWeather(stateProps.latitude, stateProps.longitude);
    }
});

export default compose(
    withApollo,
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(AirQualityScreen);
