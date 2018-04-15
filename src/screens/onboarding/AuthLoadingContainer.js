import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import AuthLoadingScreen from './AuthLoadingScreen';

const mapStateToProps = (state, ownProps) => {
    const isUserNull = !ownProps.data.loading && !ownProps.data.user;
    const isUserAuthenticated = !ownProps.data.loading && !!ownProps.data.user;
    return {
        isUserNull,
        isUserAuthenticated,
        onNullUser: () => {
            ownProps.navigation.navigate('SignInOrSignUp');
        },
        onAuthenticatedUser: () => {
            ownProps.navigation.navigate('Map');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps)
)(AuthLoadingScreen);
