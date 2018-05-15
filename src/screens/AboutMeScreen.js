import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import { colors } from '../style';
import { Button } from '../components';

const greenHeart = require('../assets/greenHeart.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottom: {
        flex: 2,
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    title: {
        fontSize: 18,
        color: colors.primary
    },
    button1: {
        backgroundColor: colors.green,
        opacity: 0.8,
        margin: 10,
    },
    button2: {
        backgroundColor: colors.green,
        opacity: 0.6,
        margin: 10,
    },
    button3: {
        backgroundColor: colors.green,
        opacity: 0.3,
        margin: 10,
    },
});

export default class AboutMeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.circle}>
                        <Image
                            style={{
                                width: 70,
                                height: 100,
                            }}
                            source={greenHeart}
                        />
                    </View>
                    <Text style={styles.title}>About Me</Text>
                </View>
                <View style={styles.bottom}>
                    <Button label="#me" onPress={this.handleSave} style={styles.button1} />
                    <Button label="#DreamBig" onPress={this.handleSave} style={styles.button2} />
                    <Button label="#AppleADay" onPress={this.handleSave} style={styles.button3} />
                </View>
            </View>
        );
    }
}
