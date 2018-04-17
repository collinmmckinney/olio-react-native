import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingUserTypeScreen from './OnboardingUserTypeScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading && !user ? null : user.id
});

const mapCreatePatientMutationToProps = ({ mutate }) => ({
    createPatient: (userId) => {
        mutate({
            variables: { userId },
            refetchQueries: [{
                query: loggedInUserQuery
            }]
        });
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onSelectUserType: (userType) => {
        ownProps.createPatient(ownProps.userId);
        ownProps.navigation.navigate('OnboardingUserInfo');
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(gql`
        mutation($userId: ID!) {
            createPatient(userId: $userId) {
                id
            }
        }
    `, { props: mapCreatePatientMutationToProps }),
    connect(undefined, undefined, mergeProps)
)(OnboardingUserTypeScreen);
