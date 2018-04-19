import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingNetworkScreen from './OnboardingNetworkScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    patientId: loading || !user ? null : user.patient.id
});

const mapCaregiverQueryToProps = ({ data: { loading, User, refetch } }) => ({
    caregiverId: loading || !User ? null : User.caregiver.id,
    refetchCaregiverQuery: refetch
});

const mapAddCaregiverMutationToProps = ({ mutate }) => ({
    addCaregiver: (patientId, caregiverId) => {
        mutate({
            variables: { patientId, caregiverId }
        });
    }
});

const mapCreateDoctorMutationToProps = ({ mutate }) => ({
    createDoctor: (patientId, email, firstName, lastName) => {
        mutate({
            variables: {
                patientId,
                email,
                firstName,
                lastName
            }
        });
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressDone: (form) => {
        ownProps.createDoctor(
            ownProps.patientId,
            form.doctorEmail,
            form.doctorFirstName,
            form.doctorLastName
        );
        ownProps.refetchCaregiverQuery({ email: form.caregiverEmail }).then(({ data }) => {
            if (data.User) {
                ownProps.addCaregiver(ownProps.patientId, data.User.caregiver.id);
            }
            ownProps.navigation.navigate('Map');
        });
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(gql`
        query($email: String) {
            User(email: $email) {
                caregiver {
                    id
                }
            }
        }
    `, { props: mapCaregiverQueryToProps }),
    graphql(gql`
        mutation($patientId: ID!, $caregiverId: ID!) {
            updatePatient(id: $patientId, caregiversIds: [$caregiverId]) {
                id
            }
        }
    `, { props: mapAddCaregiverMutationToProps }),
    graphql(gql`
        mutation($patientId: ID!, $email: String!, $firstName: String!, $lastName: String!) {
            createDoctor(patientsIds: [$patientId],  email: $email, firstName: $firstName, lastName: $lastName) {
                id
            }
        }
    `, { props: mapCreateDoctorMutationToProps }),
    connect(undefined, undefined, mergeProps)
)(OnboardingNetworkScreen);
