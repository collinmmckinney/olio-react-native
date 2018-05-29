import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
} from 'react-native';

const screenshot = require('../assets/Data.png');

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    }
});

export default class DataScreen extends Component {
    render() {
        return (
            <Image
                style={styles.backgroundImage}
                source={screenshot}
            />
        );
    }
}
