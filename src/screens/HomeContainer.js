import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
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
    graphql(gql`
        query {
            loggedInUser {
                id
            }
        }
    `),
    connect(mapStateToProps, undefined, mergeProps)
)(HomeScreen);
