import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button, TextInput } from '../components';

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
        height: 48,
        fontSize: 24,
        borderWidth: 1,
        marginBottom: '5%'
    }
});

export default class SignInScreen extends Component {
    static propTypes = {
        onPressSignIn: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handlePressSignIn = this.handlePressSignIn.bind(this);
    }

    handlePressSignIn() {
        const { onPressSignIn } = this.props;
        const { email, password } = this.state;
        onPressSignIn(email, password);
    }

    render() {
        const { email, password } = this.state;

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
                        value={password}
                        onChangeText={value => this.setState({ password: value })}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry
                        placeholder="password"
                        style={styles.input}
                    />
                    <Button label="Sign In" onPress={this.handlePressSignIn} />
                </View>
            </View>
        );
    }
}
