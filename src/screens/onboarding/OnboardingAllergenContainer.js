import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingAllergenScreen from './OnboardingAllergenScreen';

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        onPressNext: (allergensSelected) => {
            ownProps.navigation.navigate('OnboardingPeakFlow');
            allergensSelected.forEach((allergenType) => {
                ownProps.addEmptyAllergen({
                    variables: {
                        patientId: ownProps.data.user.patient.id,
                        allergenType
                    }
                });
            });
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    graphql(gql`
        mutation($patientId: ID!, $allergenType: AllergenType!) {
            createAllergen(patientId: $patientId, type: $allergenType) {
                id
            }
        }
    `, { name: 'addEmptyAllergen' }),
    connect(mapStateToProps)
)(OnboardingAllergenScreen);
