import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Button, TextInput } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        paddingHorizontal: 18,
        paddingTop: '50%',
        backgroundColor: 'white'
    },
    inputsContainer: {
        alignItems: 'stretch'
    },
    input: {
        marginBottom: '5%'
    }
});

export default class SignUpScreen extends Component {
    static propTypes = {
        onPressSignUp: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: ''
        };

        this.handlePressSignUp = this.handlePressSignUp.bind(this);
    }

    handlePressSignUp() {
        if (this.state.username.length === 0) {
            Alert.alert('Username must exceed 0 characters');
        } else if (this.state.password.length === 0) {
            Alert.alert('Password must exceed 0 characters');
        } else if (!this.validate(this.state.email)) {
            Alert.alert('Please enter a valid email');
        } else {
            // TODO: if the email (or whatever the primary key is) already exists get an error
            const { onPressSignUp } = this.props;
            const { email, username, password } = this.state;
            onPressSignUp(email, username, password);
        }
    }

    validate = (text) => {
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        }
        return true;
    }

    render() {
        const { email, username, password } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.inputsContainer}>
                    <TextInput
                        value={email}
                        onChangeText={value => this.setState({ email: value })}
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="email"
                        style={styles.input}
                    />
                    <TextInput
                        value={username}
                        onChangeText={value => this.setState({ username: value })}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="username"
                        style={styles.input}
                    />
                    <TextInput
                        value={password}
                        onChangeText={value => this.setState({ password: value })}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry
                        placeholder="password"
                        style={styles.input}
                    />
                    <Button label="Sign Up" onPress={this.handlePressSignUp} />
                </View>
            </View>
        );
    }
}
