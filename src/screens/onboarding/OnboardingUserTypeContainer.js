import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingUserTypeScreen from './OnboardingUserTypeScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
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

const mapCreateCaregiverMutationToProps = ({ mutate }) => ({
    createCaregiver: (userId) => {
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
        if (userType === 'user') {
            ownProps.createPatient(ownProps.userId);
        } else if (userType === 'helper') {
            ownProps.createCaregiver(ownProps.userId);
        }
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
    graphql(gql`
        mutation($userId: ID!) {
            createCaregiver(userId: $userId) {
                id
            }
        }
    `, { props: mapCreateCaregiverMutationToProps }),
    connect(undefined, undefined, mergeProps)
)(OnboardingUserTypeScreen);
