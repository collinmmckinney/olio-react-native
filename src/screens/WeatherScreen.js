import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8
    }
});

export default class WeatherScreen extends Component {
    static propTypes = {
        forecasts: PropTypes.arrayOf(PropTypes.shape({
            time: PropTypes.string,
            temperature: PropTypes.string,
            humidity: PropTypes.string
        })),
        fetchWeather: PropTypes.func.isRequired
    };

    static defaultProps = {
        forecasts: []
    };

    componentWillMount() {
        this.props.fetchWeather();
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
