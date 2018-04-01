import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
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

import { HomeContainer, SignInContainer, SignUpContainer } from './src/screens';

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

let token;
const authLink = setContext((_, { headers }) => {
    // If we already have the token, return it:
    console.log(token);
    if (token) {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        };
    }

    return AsyncStorage.getItem('token')
        .then((storedToken) => {
            token = storedToken;
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : ''
                }
            };
        });
});

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

const AppNavigator = StackNavigator({
    Home: {
        screen: HomeContainer
    },
    SignIn: {
        screen: SignInContainer
    },
    SignUp: {
        screen: SignUpContainer
    }
}, { initialRouteName: 'Home' });

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
