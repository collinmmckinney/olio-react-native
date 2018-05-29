import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

const screenshot = require('../assets/Home.png');

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    }
});

export default class HomeScreen extends Component {
    render() {
        return (
            <Image
                style={styles.backgroundImage}
                source={screenshot}
            />
        );
    }
}
