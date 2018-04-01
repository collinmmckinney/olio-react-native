import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import SignInOrSignUpScreen from './SignInOrSignUpScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressSignIn: () => {
        ownProps.navigation.navigate('SignIn');
    },
    onPressSignUp: () => {
        ownProps.navigation.navigate('SignUp');
    }
});

export default compose(
    graphql(gql`
        query {
            loggedInUser {
                id
            }
        }
    `),
    connect(mapStateToProps, undefined, mergeProps)
)(SignInOrSignUpScreen);
