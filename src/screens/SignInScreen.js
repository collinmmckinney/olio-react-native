import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    input: {
        height: 48,
        fontSize: 24,
        borderWidth: 1
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
        );
    }
}
