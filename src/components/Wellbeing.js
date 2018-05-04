import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import { colors } from '../style';

const redHeart = require('../assets/redHeart.png');
const greenHeart = require('../assets/greenHeart.png');
const yellowHeart = require('../assets/yellowHeart.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 24,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: colors.primary,
        fontSize: 24,
        flex: 1
    },
    heart: {
        flex: 1,
        flexDirection: 'row'
    }
});

export default class Wellbeing extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>My Wellbeing</Text>
                <View style={styles.heart}>
                    <ImageBackground
                        style={{
                            width: 60,
                            height: 80,
                        }}
                        source={redHeart}
                    >
                        <Image
                            style={{
                                width: 65,
                                height: 90,
                                marginLeft: 29,
                                marginTop: 13,
                            }}
                            source={yellowHeart}
                        />
                        <Image
                            style={{
                                width: 60,
                                height: 80,
                                marginLeft: 60,
                                marginTop: -104,
                            }}
                            source={greenHeart}
                        />
                    </ImageBackground>
                </View>
            </View>
        );
    }
}
