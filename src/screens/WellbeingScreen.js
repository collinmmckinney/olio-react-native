import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../style';
import { Wellbeing } from '../components';

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

export default class WellbeingScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Wellbeing />
            </View>
        );
    }
}
