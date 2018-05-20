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

const greenHeart = require('../assets/greenHeart.png');
const greenApple = require('../assets/greenApple.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    upper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 15
    },
    bottom: {
        flex: 2,
        justifyContent: 'space-between'
    },
    apple: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        margin: 10,
        height: 170
    },
    saveButton: {
        margin: 10,
    },
    allBottom: {
        flex: 5
    }
});

export default class MedicationsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upper}>
                    <View style={styles.circle}>
                        <Image
                            style={{
                                width: 35,
                                height: 45,
                            }}
                            source={greenHeart}
                        />
                    </View>
                    <Text style={styles.title}>#AppleADay</Text>
                </View>
                <View style={styles.allBottom}>
                    <KeyboardAwareScrollView>
                        <View style={styles.apple}>
                            <Image
                                style={{
                                    width: 90,
                                    height: 100,
                                }}
                                source={greenApple}
                            />
                        </View>
                        <View style={styles.bottom}>
                            <TextInput style={styles.topText} placeholder="What do you do to keep the doctor away?" placeholderTextColor={colors.primaryDarkest} />
                            <Button label="SAVE" onPress={this.handleSave} style={styles.saveButton} />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }
}
