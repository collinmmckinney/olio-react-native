import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import SignUpScreen from './SignUpScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log(stateProps);
    console.log(dispatchProps);
    console.log(ownProps);
    return {
        onPressSignUp: (email, username, password) => {
            ownProps.signupUser({ variables: { email, username, password } });
        }
    };
};

export default compose(
    graphql(gql`
        query {
            loggedInUser {
                id
            }
        }
    `),
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
