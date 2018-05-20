import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingNetworkScreen from './OnboardingNetworkScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    patientId: loading || !user ? null : user.patient.id
});

const mapCaregiversQueryToProps = ({ data: { refetch } }) => ({
    refetchCaregiverQuery: refetch
});

const mapAddCaregiverMutationToProps = ({ mutate }) => ({
    addCaregivers: (patientId, caregiversIds) => {
        mutate({
            variables: { patientId, caregiversIds }
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
        if (form.doctorEmail !== '') {
            ownProps.createDoctor(
                ownProps.patientId,
                form.doctorEmail,
                form.doctorFirstName,
                form.doctorLastName
            );
        }
        if (form.caregiver1Email !== '' && form.caregiver2Email !== '') {
            ownProps.refetchCaregiverQuery({ emails: [form.caregiver1Email, form.caregiver2Email] })
                .then(({ data }) => {
                    const caregiversIds = data.allUsers.map(user => user.caregiver.id);
                    ownProps.addCaregivers(ownProps.patientId, caregiversIds);
                });
        }
        ownProps.navigation.navigate('Avatar');
    },
    onPressBack: ownProps.navigation.goBack
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(gql`
        query($emails: [String!]) {
            allUsers(filter: { email_in: $emails }) {
                caregiver {
                    id
                }
            }
        }
    `, { props: mapCaregiversQueryToProps }),
    graphql(gql`
        mutation($patientId: ID!, $caregiversIds: [ID!]!) {
            updatePatient(id: $patientId, caregiversIds: $caregiversIds) {
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
