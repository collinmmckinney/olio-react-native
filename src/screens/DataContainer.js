import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import DataScreen from './DataScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const userId = ownProps.data.user ? ownProps.data.user.id : null;
    const isUserNull = !ownProps.data.loading && !ownProps.data.user;
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
)(DataScreen);
