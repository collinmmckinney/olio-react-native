import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingPeakFlowScreen from './OnboardingPeakFlowScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onPressNext: () => {
            ownProps.navigation.navigate('OnboardingNetwork');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps)
)(OnboardingPeakFlowScreen);
