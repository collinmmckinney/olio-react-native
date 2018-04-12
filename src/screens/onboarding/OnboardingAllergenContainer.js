import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingAllergenScreen from './OnboardingAllergenScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onPressNext: () => {
            ownProps.navigation.navigate('OnboardingPeakFlow');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps)
)(OnboardingAllergenScreen);
