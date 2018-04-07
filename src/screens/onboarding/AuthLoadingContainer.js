import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import AuthLoadingScreen from './AuthLoadingScreen';

const mapStateToProps = (state, ownProps) => {
    const isUserNull = !ownProps.data.loading && !ownProps.data.loggedInUser;
    const isUserAuthenticated = !ownProps.data.loading && !!ownProps.data.loggedInUser;
    return {
        isUserNull,
        isUserAuthenticated,
        onNullUser: () => {
            console.log("NULL USER");
            ownProps.navigation.navigate('SignInOrSignUp');
        },
        onAuthenticatedUser: () => {
            console.log("AUTHENTIC USER")
            ownProps.navigation.navigate('Map');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps)
)(AuthLoadingScreen);
