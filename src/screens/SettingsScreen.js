import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default class SettingsScreen extends Component {
    static propTypes = {
        onPressLogout: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handlePressLogout = this.handlePressLogout.bind(this);
    }

    handlePressLogout() {
        const { onPressLogout } = this.props;
        onPressLogout();
    }

    render() {
        return (
            <View style={styles.container}>
                <Button label="Log Out" onPress={this.handlePressLogout} />
            </View>
        );
    }
}
