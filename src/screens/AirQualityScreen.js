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

export default class AirQualityScreen extends Component {
    static propTypes = {
        forecasts: PropTypes.arrayOf(PropTypes.shape({
            dayOfTheWeek: PropTypes.string,
            quality: PropTypes.string
        }))
    };

    static defaultProps = {
        forecasts: []
    }

    componentWillMount() {
        this.props.fetchAirQuality();
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
