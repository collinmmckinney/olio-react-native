import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingUserInfoScreen from './OnboardingUserInfoScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id,
    patientId: loading || !user.patient ? null : user.patient.id,
});

const mapUpdateUserMutationToProps = ({ mutate }) => ({
    updateUser: (userId, args) => {
        mutate({
            variables: {
                userId,
                firstName: args.firstName,
                lastName: args.lastName,
                age: args.age,
                avatar: args.avatar
            }
        });
    }
});

const mapUpdatePatientMutationToProps = ({ mutate }) => ({
    updatePatient: (patientId, avatar) => {
        mutate({
            variables: { patientId, avatar }
        });
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressNext: (form) => {
        ownProps.navigation.navigate('OnboardingNetwork');
        ownProps.updateUser(ownProps.userId, {
            firstName: form.firstName,
            lastName: form.lastName,
            age: parseInt(form.age, 10)
        });
        ownProps.updatePatient(ownProps.patientId, parseInt(form.avatar, 10));
    },
    onPressBack: ownProps.navigation.goBack
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(gql`
        mutation($userId: ID!, $firstName: String!, $lastName: String!, $age: Int!) {
            updateUser(id: $userId, firstName: $firstName, lastName: $lastName, age: $age) {
                id
            }
        }
    `, { props: mapUpdateUserMutationToProps }),
    graphql(gql`
        mutation($patientId: ID!, $avatar: Int!) {
            updatePatient(id: $patientId, avatar: $avatar) {
                id
            }
        }
    `, { props: mapUpdatePatientMutationToProps }),
    connect(undefined, undefined, mergeProps)
)(OnboardingUserInfoScreen);
