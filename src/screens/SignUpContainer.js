import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import SignUpScreen from './SignUpScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        onPressSignUp: (email, username, password) => {
            ownProps.signupUser({
                variables: { email, username, password },
                refetchQueries: [{
                    query: gql`
                        query {
                            loggedInUser {
                                id
                            }
                        }
                    `
                }],
                update: (store, { data: { signupUser: { token } } }) => {
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
        mutation($email: String!, $username: String!, $password: String!) {
            signupUser(email: $email, username: $username, password: $password) {
                id
                token
            }
        }
    `, { name: 'signupUser' }),
    connect(mapStateToProps, undefined, mergeProps)
)(SignUpScreen);
