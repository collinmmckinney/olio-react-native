import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import SettingsScreen from './SettingsScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        onPressLogout: () => {
            AsyncStorage.setItem('token', '').then(() => {
                ownProps.client.resetStore();
                ownProps.navigation.navigate('HomeTab');
            });
        }
    };
};

export default compose(
    withApollo,
    connect(mapStateToProps, undefined, mergeProps)
)(SettingsScreen);
