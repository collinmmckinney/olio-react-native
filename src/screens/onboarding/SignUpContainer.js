import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { loggedInUserQuery } from '../../graphql/queries';
import { signupUserMutation } from '../../graphql/mutations';
import SignUpScreen from './SignUpScreen';

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressSignUp: (email, username, password) => {
        ownProps.signupUser({
            variables: { email, username, password },
            refetchQueries: [{
                query: loggedInUserQuery
            }],
            update: (store, { data: { signupUser: { token } } }) => {
                AsyncStorage.setItem('token', token).then(() => {
                    ownProps.navigation.navigate('OnboardingUserType');
                });
            }
        });
    }
});

export default compose(
    graphql(signupUserMutation, { name: 'signupUser' }),
    connect(undefined, undefined, mergeProps)
)(SignUpScreen);
