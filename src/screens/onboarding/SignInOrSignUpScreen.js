import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        backgroundColor: 'white'
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        height: 210,
        paddingTop: 20,
        paddingBottom: 60
    }
});

export default class SignInOrSignUpScreen extends Component {
    static propTypes = {
        onPressSignIn: PropTypes.func.isRequired,
        onPressSignUp: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handlePressSignIn = this.handlePressSignIn.bind(this);
        this.handlePressSignUp = this.handlePressSignUp.bind(this);
    }

    handlePressSignIn() {
        const { onPressSignIn } = this.props;
        onPressSignIn();
    }

    handlePressSignUp() {
        const { onPressSignUp } = this.props;
        onPressSignUp();
    }

    render() {
        return (
            <View style={styles.container}>
                <View />
                <View style={styles.buttonsContainer}>
                    <Button label="SIGN IN" onPress={this.handlePressSignIn} />
                    <Button label="SIGN UP" onPress={this.handlePressSignUp} />
                </View>
            </View>
        );
    }
}
