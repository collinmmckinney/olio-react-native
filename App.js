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
import Icon from 'react-native-vector-icons/Entypo';
import Octicon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Location, Bubbles } from './src/reducers';
import { colors } from './src/style';
import {
    AuthLoadingContainer,
    SignInOrSignUpContainer,
    SignInContainer,
    SignUpContainer,
    OnboardingUserTypeContainer,
    OnboardingUserInfoContainer,
    OnboardingAllergenContainer,
    OnboardingPeakFlowContainer,
    OnboardingNetworkContainer,
    AvatarContainer,
    WellbeingContainer,
    CarePlanContainer,
    AddBubbleContainer,
    MapContainer,
    AddMapItemContainer,
    MapFiltersContainer,
    DataContainer,
    SettingsContainer
} from './src/screens';

const GRAPHQL_URL = 'https://api.graph.cool/simple/v1/cjg6t4f9f0j5l0137824h9apr';

// Redux
const store = createStore(
    combineReducers({
        apollo: apolloReducer,
        Location,
        Bubbles
    }),
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

const AvatarStack = StackNavigator({
    Avatar: {
        screen: AvatarContainer
    },
    Wellbeing: {
        screen: WellbeingContainer
    },
    CarePlan: {
        screen: CarePlanContainer
    },
    AddBubble: {
        screen: AddBubbleContainer
    },
    Map: {
        screen: MapContainer
    },
    AddMapItem: {
        screen: AddMapItemContainer
    },
    MapFilters: {
        screen: MapFiltersContainer
    }
}, {
    initialRouteName: 'Avatar',
    mode: 'modal',
    cardStyle: { backgroundColor: 'transparent' },
    transitionConfig: () => ({
        containerStyle: {
        }
    })
});

const SignInOrSignUpStack = StackNavigator({
    SignInOrSignUp: {
        screen: SignInOrSignUpContainer,
        navigationOptions: { header: null }
    },
    SignIn: {
        screen: SignInContainer
    },
    SignUp: {
        screen: SignUpContainer
    },
    OnboardingUserType: {
        screen: OnboardingUserTypeContainer,
        navigationOptions: { header: null }
    },
    OnboardingUserInfo: {
        screen: OnboardingUserInfoContainer,
        navigationOptions: { header: null }
    },
    OnboardingAllergen: {
        screen: OnboardingAllergenContainer,
        navigationOptions: { header: null }
    },
    OnboardingPeakFlow: {
        screen: OnboardingPeakFlowContainer,
        navigationOptions: { header: null }
    },
    OnboardingNetwork: {
        screen: OnboardingNetworkContainer,
        navigationOptions: { header: null }
    }
}, { initialRouteName: 'SignInOrSignUp' });

const AuthStack = SwitchNavigator({
    AuthLoading: {
        screen: AuthLoadingContainer,
        navigationOptions: { header: null, tabBarVisible: false }
    },
    Avatar: {
        screen: AvatarStack
    },
    SignInOrSignUp: {
        screen: SignInOrSignUpStack,
        navigationOptions: { tabBarVisible: false }
    }
}, {
    initialRouteName: 'AuthLoading',
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
    AvatarTab: {
        screen: AuthStack,
        title: 'Avatar',
        navigationOptions: {
            tabBarIcon: <Icon name="network" size={40} color={colors.primary} />,
            showIcon: true,
        }
    },
    ProfileTab: {
        screen: ProfileStack,
        title: 'Profile',
        navigationOptions: {
            tabBarIcon: <MaterialIcon name="bubble-chart" size={45} color={colors.primary} />,
            showIcon: true,
        }
    },
    DataTab: {
        screen: DataStack,
        title: 'Data',
        navigationOptions: {
            tabBarIcon: <Octicon name="graph" size={40} color={colors.primary} />,
            showIcon: true,
        }
    },
}, {
    initialRouteName: 'AvatarTab',
    tabBarOptions: {
        showLabel: false,
        style: {
            height: 60,
        }
    },
});

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
