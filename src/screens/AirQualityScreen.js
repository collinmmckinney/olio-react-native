import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';
import { Forecast } from '../components';

const QUALITY_TO_COLOR = {
    Good: colors.green,
    Moderate: colors.yellow,
    Unhealthy: colors.red,
    Hazardous: colors.red
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingTop: 112,
        paddingBottom: 80
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        borderRadius: 200,
        backgroundColor: '#a94fce',
        alignSelf: 'center'
    },
    currentQualityText: {
        color: 'white',
        fontSize: 24
    }
});

export default class AirQualityScreen extends Component {
    static propTypes = {
        forecasts: PropTypes.arrayOf(PropTypes.shape({
            dayOfTheWeek: PropTypes.string,
            quality: PropTypes.oneOf(['Good', 'Moderate', 'Unhealthy', 'Hazardous'])
        })),
        fetchAirQuality: PropTypes.func.isRequired
    };

    static defaultProps = {
        forecasts: []
    }

    componentWillMount() {
        this.props.fetchAirQuality();
    }

    render() {
        const { forecasts } = this.props;
        const entries = forecasts.map(forecast => ({
            topText: forecast.dayOfTheWeek,
            color: QUALITY_TO_COLOR[forecast.quality],
            bottomText: forecast.quality
        }));
        return (
            <View style={styles.container}>
                <View style={styles.indicator}>
                    <Text style={styles.currentQualityText}>{forecasts.length > 0 ? forecasts[0].quality : 'Loading...'}</Text>
                </View>
                <Forecast entries={entries} title="THIS WEEK" />
            </View>
        );
    }
}
