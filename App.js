import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHttpLink } from 'apollo-link-http';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import Icon from 'react-native-vector-icons/Entypo';
import Octicon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { AirQuality, Bubbles, Map, Weather } from './src/reducers';
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
    MedicationsContainer,
    AsthmaCareContainer,
    AboutMeContainer,
    EvalsContainer,
    NowContainer,
    AddBubbleContainer,
    AddAllergenContainer,
    MapContainer,
    AddMapItemContainer,
    MapFiltersContainer,
    PollenMapContainer,
    AirQualityContainer,
    HomeContainer,
    SpirometryContainer,
    WeatherContainer,
    DataContainer,
    SettingsContainer
} from './src/screens';

const GRAPHQL_URL = 'https://api.graph.cool/simple/v1/cjg6t4f9f0j5l0137824h9apr';

// Redux
const store = createStore(
    combineReducers({
        apollo: apolloReducer,
        Bubbles,
        Map,
        Weather
    }),
    applyMiddleware(thunkMiddleware)
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
    AboutMe: {
        screen: AboutMeContainer
    },
    Evals: {
        screen: EvalsContainer
    },
    Now: {
        screen: NowContainer
    },
    CarePlan: {
        screen: CarePlanContainer
    },
    Medications: {
        screen: MedicationsContainer
    },
    AsthmaCare: {
        screen: AsthmaCareContainer
    },
    AddBubble: {
        screen: AddBubbleContainer
    },
    AddAllergen: {
        screen: AddAllergenContainer
    },
    Map: {
        screen: MapContainer
    },
    PollenMap: {
        screen: PollenMapContainer
    },
    AirQuality: {
        screen: AirQualityContainer
    },
    Home: {
        screen: HomeContainer
    },
    Spirometry: {
        screen: SpirometryContainer
    },
    Weather: {
        screen: WeatherContainer,
    },
    AddMapItem: {
        screen: AddMapItemContainer
    },
    MapFilters: {
        screen: MapFiltersContainer
    }
}, {
    initialRouteName: 'Avatar',
    mode: 'modal'
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
    ProfileTab: {
        screen: ProfileStack,
        title: 'Profile',
        navigationOptions: {
            tabBarIcon: <Icon name="network" size={40} color={colors.primary} />
        }
    },
    AvatarTab: {
        screen: AuthStack,
        title: 'Avatar',
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
