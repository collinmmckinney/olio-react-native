import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingAllergenScreen from './OnboardingAllergenScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    patientId: loading ? null : user.patient.id
});

const mapCreateAllergenMutationToProps = ({ mutate }) => ({
    createAllergen: (patientId, allergenType) => {
        mutate({
            variables: {
                patientId,
                allergenType
            }
        });
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressNext: (allergensSelected) => {
        ownProps.navigation.navigate('OnboardingPeakFlow');
        allergensSelected.forEach((allergenType) => {
            ownProps.createAllergen(ownProps.patientId, allergenType);
        });
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(gql`
        mutation($patientId: ID!, $allergenType: AllergenType!) {
            createAllergen(patientId: $patientId, type: $allergenType) {
                id
            }
        }
    `, { props: mapCreateAllergenMutationToProps }),
    connect(undefined, undefined, mergeProps)
)(OnboardingAllergenScreen);
