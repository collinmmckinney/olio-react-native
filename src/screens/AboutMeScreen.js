import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default class AboutMeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Apple A Day</Text>
            </View>
        );
    }
}
