import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { fetchDailyWeather, fetchHourlyWeather } from '../actions/weather';
import WeatherScreen from './WeatherScreen';

const mapStateToProps = ({ Weather, Map }, ownProps) => {
    return {
        latitude: Map.userLocation.coords.latitude,
        longitude: Map.userLocation.coords.longitude,
        forecasts: Weather.hourlyForecasts.map(forecast => ({
            date: forecast.date,
            temperature: forecast.temperature,
            humidity: forecast.humidity
        }))
    };
};

const mapDispatchToProps = {
    fetchDailyWeather,
    fetchHourlyWeather
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    fetchWeather: () => {
        dispatchProps.fetchDailyWeather(stateProps.latitude, stateProps.longitude);
        dispatchProps.fetchHourlyWeather(stateProps.latitude, stateProps.longitude);
    }
});

export default compose(
    withApollo,
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(WeatherScreen);
