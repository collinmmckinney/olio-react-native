import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingUserInfoScreen from './OnboardingUserInfoScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onPressNext: (form) => {
            console.log(form);
            ownProps.navigation.navigate('OnboardingAllergen');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps)
)(OnboardingUserInfoScreen);
