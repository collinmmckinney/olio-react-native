import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHttpLink } from 'apollo-link-http';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

import {
    MapContainer,
    SignInOrSignUpContainer,
    SignInContainer,
    SignUpContainer,
    DataContainer,
    SettingsContainer
} from './src/screens';

const GRAPHQL_URL = 'https://api.graph.cool/simple/v1/cjfmlnicx0evz0146b22cjekm';

// Redux
const store = createStore(
    combineReducers({ apollo: apolloReducer }),
    {}, // initial state
    composeWithDevTools(),
);

// Apollo

const reduxLink = new ReduxLink(store);
const errorLink = onError((errors) => {
    console.log(errors);
});
const httpLink = createHttpLink({ uri: GRAPHQL_URL });

// TODO Need to store token on Keychain:
const authLink = setContext((_, { headers }) => (
    AsyncStorage.getItem('token')
        .then(token => ({
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }))
));

const link = ApolloLink.from([
    reduxLink,
    authLink,
    httpLink,
    errorLink
]);

const cache = new ReduxCache({ store });

const client = new ApolloClient({
    link,
    cache
});

// First Tab

const MapStack = StackNavigator({
    Map: {
        screen: MapContainer
    }
}, { initialRouteName: 'Map' });

const SignInOrSignUpStack = StackNavigator({
    SignInOrSignUp: {
        screen: SignInOrSignUpContainer
    },
    SignIn: {
        screen: SignInContainer
    },
    SignUp: {
        screen: SignUpContainer
    }
}, { initialRouteName: 'SignInOrSignUp' });

const AuthStack = SwitchNavigator({
    Home: {
        screen: MapStack
    },
    SignInOrSignUp: {
        screen: SignInOrSignUpStack,
        navigationOptions: { tabBarVisible: false }
    }
}, {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
});

// Second Tab

const DataStack = StackNavigator({
    Data: {
        screen: DataContainer
    }
}, { initialRouteName: 'Data' });

// Third Tab

const ProfileStack = StackNavigator({
    Settings: { screen: SettingsContainer }
});


const AppNavigator = TabNavigator({
    MapTab: { screen: AuthStack, title: 'Home' },
    DataTab: { screen: DataStack, title: 'Data' },
    ProfileTab: { screen: ProfileStack, title: 'Profile' },
}, { initialRouteName: 'MapTab' });

export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <AppNavigator />
                </Provider>
            </ApolloProvider>
        );
    }
}
