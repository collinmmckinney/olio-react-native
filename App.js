import React, { Component } from 'react';
import { View } from 'react-native';
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

import { HomeContainer } from './src/screens';

const URL = 'localhost:8080';

// Redux
const store = createStore(
    combineReducers({ apollo: apolloReducer }),
    {}, // initial state
    composeWithDevTools(),
);

// Apollo
const cache = new ReduxCache({ store });
const reduxLink = new ReduxLink(store);
const errorLink = onError((errors) => {
    console.log(errors);
});
const httpLink = createHttpLink({ uri: `http://${URL}/graphql` });
const link = ApolloLink.from([
    reduxLink,
    errorLink,
    httpLink,
]);
const client = new ApolloClient({
    link,
    cache,
});

const AppNavigator = StackNavigator({
    HomeScreen: {
        screen: HomeContainer
    },
}, { initialRouteName: 'HomeScreen' });

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
