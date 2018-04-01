import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
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

export default class SignUpScreen extends Component {
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string,
            username: PropTypes.string,
            password: PropTypes.string
        }),
        onPressSignUp: PropTypes.func.isRequired
    }

    static defaultProps = {
        user: {}
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
        const { onPressSignUp } = this.props;
        const { email, username, password } = this.state;
        onPressSignUp(email, username, password);
    }

    render() {
        const { user } = this.props;
        const { email, username, password } = this.state;

        return (
            <View style={styles.container}>
                <Text>{user && user.username}</Text>
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
        );
    }
}
