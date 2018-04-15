import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { loggedInUserQuery } from '../../graphql/queries';
import { authenticateUserMutation } from '../../graphql/mutations';
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
                update: (store, { data: { authenticateUser: { id, token } } }) => {
                    AsyncStorage.setItem('token', token).then(() => {
                        ownProps.navigation.navigate('Map');
                    });
                }
            });
        }
    };
};

export default compose(
    graphql(authenticateUserMutation, { name: 'authenticateUser' }),
    connect(mapStateToProps, undefined, mergeProps)
)(SignInScreen);
