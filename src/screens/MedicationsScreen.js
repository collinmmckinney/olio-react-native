import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    DatePickerIOS
} from 'react-native';
import { colors } from '../style';
import { TextInput } from '../components';

const purpleLung = require('../assets/purpleLung.png');

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
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 18,
        color: colors.primary,
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
});

export default class MedicationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upper}>
                    <View style={styles.circle}>
                        <Image
                            style={{
                                width: 30,
                                height: 50,
                            }}
                            source={purpleLung}
                        />
                    </View>
                    <Text style={styles.title}>Medications</Text>
                </View>
                <View style={styles.bottom}>
                    <TextInput placeholder="Medication Name" />
                    <TextInput placeholder="Type" />
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                    />
                </View>
            </View>
        );
    }
}
