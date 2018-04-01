import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
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
import gql from 'graphql-tag';

import {
    HomeContainer,
    SignInOrSignUpContainer,
    SignInContainer,
    SignUpContainer
} from './src/screens';

const GRAPHQL_URL = 'https://api.graph.cool/simple/v1/cjfg0gyqm0kw60103ql11s2vc';

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

// client.mutate({
//     mutation: gql`
//         mutation {
//             signupUser(email: "test@test.com", username: "test", password: "testing") {
//                 id
//                 token
//             }
//         }
//     `
// })
//     .then(({ data }) => {
//         console.log(data);
//         AsyncStorage.setItem('token', data.signupUser.token).then(() => {
//             client.query({
//                 query: gql`
//                     query {
//                         loggedInUser {
//                             id
//                         }
//                     }
//                 `
//             })
//                 .then((result) => {
//                     console.log(result);
//                 })
//                 .catch(error => console.error(error));
//         });
//     })
//     .catch(error => console.error(error));

// Cards Tab

const HomeStack = StackNavigator({
    Home: {
        screen: HomeContainer
    }
}, { initialRouteName: 'Home' });

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
        screen: HomeStack
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

const AppNavigator = AuthStack;

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
