import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
});

export default class MapFiltersScreen extends Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
