import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingNetworkScreen from './OnboardingNetworkScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onPressDone: () => {
            ownProps.navigation.navigate('Map');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps)
)(OnboardingNetworkScreen);
