import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import AuthLoadingScreen from './AuthLoadingScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    isUserNull: !loading && !user,
    isUserAuthenticated: !loading && !!user
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    onNullUser: () => {
        ownProps.navigation.navigate('SignInOrSignUp');
    },
    onAuthenticatedUser: () => {
        ownProps.navigation.navigate('Avatar');
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    connect(undefined, undefined, mergeProps)
)(AuthLoadingScreen);
