import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';
import { TextInput, ScrollView, Button } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingTop: 90,
        backgroundColor: 'white'
    },
    reportInput: {
        marginBottom: 36
    },
    reportsContainer: {
        marginBottom: 18
    },
    reportRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8
    },
    reportText: {
        fontSize: 22
    }
});

export default class SpirometryScreen extends Component {
    static propTypes = {
        reports: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            fev1: PropTypes.number,
            date: PropTypes.string
        })),
        onPressSave: PropTypes.func
    };

    static defaultProps = {
        reports: [],
        onPressSave: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            fev1: ''
        };
    }

    render() {
        const { reports, onPressSave } = this.props;
        const { fev1 } = this.state;

        const reportElements = reports.map(report => (
            <View key={report.id} style={styles.reportRow}>
                <Text style={styles.reportText}>{report.fev1}</Text>
                <Text style={styles.reportText}>{report.date}</Text>
            </View>
        ));

        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={value => this.setState({ fev1: value })}
                    value={fev1}
                    placeholder="FEV1"
                    style={styles.reportInput}
                />
                <ScrollView style={styles.reportsContainer}>{reportElements}</ScrollView>
                <Button label="SAVE" onPress={() => onPressSave(fev1)} />
            </View>
        );
    }
}
