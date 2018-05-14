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

export default class AsthmaCareScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Asthma care</Text>
            </View>
        );
    }
}
