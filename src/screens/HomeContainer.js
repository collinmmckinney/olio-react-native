import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import HomeScreen from './HomeScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const userId = ownProps.data.loggedInUser ? ownProps.data.loggedInUser.id : null;
    const isUserNull = !ownProps.data.loading && !ownProps.data.loggedInUser;
    return {
        userId,
        isUserNull,
        onNullUser: () => {
            ownProps.navigation.navigate('SignInOrSignUp');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps, undefined, mergeProps)
)(HomeScreen);
