import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingUserTypeScreen from './OnboardingUserTypeScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onSelectUserType: (userType) => {
            ownProps.createPatient({
                variables: { userId: ownProps.data.user.id }
            });
            ownProps.navigation.navigate('OnboardingUserInfo');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    graphql(gql`
        mutation($userId: ID!) {
            createPatient(userId: $userId) {
                id
            }
        }
    `, { name: 'createPatient' }),
    connect(mapStateToProps)
)(OnboardingUserTypeScreen);
