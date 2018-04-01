import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { loggedInUserQuery } from '../graphql/queries';
import SignInScreen from './SignInScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        onPressSignIn: (email, password) => {
            ownProps.authenticateUser({
                variables: { email, password },
                refetchQueries: [{
                    query: loggedInUserQuery
                }],
                update: (store, { data: { authenticateUser: { token } } }) => {
                    AsyncStorage.setItem('token', token).then(() => {
                        ownProps.navigation.navigate('Home');
                    });
                }
            });
        }
    };
};

export default compose(
    graphql(gql`
        mutation($email: String!, $password: String!) {
            authenticateUser(email: $email, password: $password) {
                id
                token
            }
        }
    `, { name: 'authenticateUser' }),
    connect(mapStateToProps, undefined, mergeProps)
)(SignInScreen);
