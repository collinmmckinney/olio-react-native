import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';
import { Forecast } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    keyContainer: {
        flexDirection: 'column'
    },
    keyRow: {
        flexDirection: 'row',
        marginBottom: 25
    },
    goodIndicator: {
        height: 20,
        width: 20,
        borderRadius: 20,
        backgroundColor: colors.green
    },
    badIndicator: {
        height: 20,
        width: 20,
        borderRadius: 20,
        backgroundColor: colors.red
    },
    townText: {
        fontSize: 22,
        marginBottom: 11
    },
    temperatureText: {
        fontSize: 18,
        color: colors.grayText
    },
    townContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class WeatherScreen extends Component {
    static propTypes = {
        town: PropTypes.string,
        forecasts: PropTypes.arrayOf(PropTypes.shape({
            time: PropTypes.string,
            temperature: PropTypes.number,
            humidity: PropTypes.number
        })),
        fetchWeather: PropTypes.func.isRequired
    };

    static defaultProps = {
        town: null,
        forecasts: []
    };

    componentWillMount() {
        this.props.fetchWeather();
    }

    render() {
        const { town, forecasts } = this.props;
        const temperatureEntries = forecasts.map(forecast => ({
            topText: forecast.time,
            color: (forecast.temperature > 77 && forecast.temperature < 86)
                ? colors.red : colors.green,
            bottomText: `${forecast.temperature}º`
        }));
        const humidityEntries = forecasts.map(forecast => ({
            topText: forecast.time,
            color: (forecast.humidity > 5 && forecast.temperature < 10)
                ? colors.red : colors.green,
            bottomText: `${forecast.humidity}%`
        }));
        return (
            <View style={styles.container}>
                <View style={styles.keyContainer}>
                    <View style={styles.keyRow}>
                        <View style={styles.goodIndicator} />
                        <Text>{"Feelin' Good"}</Text>
                    </View>
                    <View style={styles.keyRow}>
                        <View style={styles.badIndicator} />
                        <Text>Critical Range: 77-86ºF, 5 - 10%</Text>
                    </View>
                </View>
                <View style={styles.townContainer}>
                    <Text style={styles.townText}>{town}</Text>
                    <Text style={styles.temperatureText}>{forecasts.length > 0 ? `${forecasts[0].temperature}ºF` : 'Loading...'}</Text>
                </View>
                <Forecast entries={temperatureEntries} title="Today (ºF)" />
                <Forecast entries={humidityEntries} title="Today (%)" />
            </View>
        );
    }
}
