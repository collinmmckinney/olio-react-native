import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';
import { Button } from '.';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 24,
        justifyContent: 'space-between'
    },
    userButton: {
        backgroundColor: colors.primary
    },
    helperButton: {
        backgroundColor: colors.primaryDarker
    },
    doctorButton: {
        backgroundColor: colors.primaryDarkest
    }
});

export default class UserTypeSelect extends Component {
    static propTypes = {
        onSelectUserType: PropTypes.func
    }

    static defaultProps = {
        onSelectUserType: () => {}
    }

    render() {
        const { onSelectUserType } = this.props;

        return (
            <View style={styles.container}>
                <Button label="USER" onPress={() => { onSelectUserType('user'); }} style={styles.userButton} />
                <Button label="HELPER" onPress={() => { onSelectUserType('helper'); }} style={styles.helperButton} />
                <Button label="DOCTOR" onPress={() => { onSelectUserType('doctor'); }} style={styles.doctorButton} />
            </View>
        );
    }
}
