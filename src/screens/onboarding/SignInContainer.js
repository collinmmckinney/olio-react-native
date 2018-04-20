import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { loggedInUserQuery } from '../../graphql/queries';
import { authenticateUserMutation } from '../../graphql/mutations';
import SignInScreen from './SignInScreen';

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressSignIn: (email, password) => {
        ownProps.authenticateUser({
            variables: { email, password },
            refetchQueries: [{
                query: loggedInUserQuery
            }],
            update: (store, { data: { authenticateUser: { token } } }) => {
                AsyncStorage.setItem('token', token).then(() => {
                    ownProps.navigation.navigate('Avatar');
                });
            }
        });
    }
});

export default compose(
    graphql(authenticateUserMutation, { name: 'authenticateUser' }),
    connect(undefined, undefined, mergeProps)
)(SignInScreen);
