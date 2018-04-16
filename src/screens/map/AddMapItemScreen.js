import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    }
});

export default class AddMapItemScreen extends Component {
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
