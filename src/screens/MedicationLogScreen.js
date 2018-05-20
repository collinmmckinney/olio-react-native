import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors } from '../style';
import { Button } from '../components';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8,
        backgroundColor: 'white'
    },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topText: {
        fontSize: 24,
        color: colors.primary
    },
    bottom: {
        flex: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowOffset: { width: 4, height: 4, },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        margin: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
    },
    purpleCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#9a65cd',
        margin: 10
    },
    blueCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#7cd5c3',
        margin: 10
    },
    greenCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#82a936',
        margin: 10
    },
    rowText: {
        margin: 10,
        color: colors.primaryDarkest,
        opacity: 0.7,
        fontSize: 16
    },
    save: {
        flex: 1
    },
    saveButton: {
        margin: 10,
    },
});

export default class MedicationLogScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.topText}>Click to Log Medicine</Text>
                </View>
                <View style={styles.bottom}>
                    <KeyboardAwareScrollView>
                        <View style={styles.row}>
                            <View style={styles.purpleCircle} />
                            <Text style={styles.rowText}>Emergency Inhaler</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.blueCircle} />
                            <Text style={styles.rowText}>Long-acting Inhaler</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.greenCircle} />
                            <Text style={styles.rowText}>Vitamins</Text>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.save}>
                    <Button label="I TOOK IT!" onPress={this.handleSave} style={styles.saveButton} />
                </View>
            </View>
        );
    }
}
