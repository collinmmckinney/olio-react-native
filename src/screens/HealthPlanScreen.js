import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors } from '../style';
import { TextInput, Button } from '../components';

const yellowHeart = require('../assets/yellowHeart.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    upper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    bottom: {
        flex: 3,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        color: colors.primaryDarkest,
        opacity: 0.7,
        margin: 10
    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    topText: {
        flex: 1,
        fontSize: 12,
        margin: 10
    },
    midText: {
        flex: 2,
        fontSize: 12,
        margin: 10,
        height: 100
    },
    bottomText: {
        flex: 2,
        fontSize: 12,
        margin: 10,
        height: 100,
        backgroundColor: colors.primary
    },
    saveButton: {
        margin: 10,
    },
});

export default class MedicationsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upper}>
                    <View style={styles.circle}>
                        <Image
                            style={{
                                width: 30,
                                height: 45,
                            }}
                            source={yellowHeart}
                        />
                    </View>
                    <Text style={styles.title}>Your Health Plan</Text>
                </View>
                <View style={styles.bottom}>
                    <KeyboardAwareScrollView>
                        <TextInput style={styles.topText} placeholder="What matters to you?" placeholderTextColor={colors.primaryDarkest} />
                        <TextInput style={styles.midText} placeholder="What is your #1 CONCERN about asthma?" placeholderTextColor={colors.primaryDarkest} />
                        <TextInput style={styles.midText} placeholder="What is your #1 GOAL about asthma?" placeholderTextColor={colors.primaryDarkest} />
                        <TextInput style={styles.bottomText} placeholder="Plan with your doctor:" placeholderTextColor="white" />
                        <Button label="SAVE" onPress={this.handleSave} style={styles.saveButton} />
                    </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }
}
