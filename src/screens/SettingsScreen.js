import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../components';

const screenshot = require('../assets/Network.png');

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'flex-end'
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
            <ImageBackground
                style={styles.backgroundImage}
                source={screenshot}
            >
                <Button label="Log Out" onPress={this.handlePressLogout} />
            </ImageBackground>
        );
    }
}
