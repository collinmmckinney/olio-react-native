import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingUserInfoScreen from './OnboardingUserInfoScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onPressNext: (form) => {
            ownProps.navigation.navigate('OnboardingAllergen');
            ownProps.updateUser({
                variables: {
                    userId: ownProps.data.user.id,
                    firstName: form.firstName,
                    middleName: form.middleName,
                    lastName: form.lastName,
                    dateOfBirth: (new Date()).toISOString(),
                    pronoun: form.pronoun[0].toUpperCase() + form.pronoun.substring(1),
                    town: form.town,
                    state: form.state
                }
            });
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    graphql(gql`
        mutation($userId: ID!, $firstName: String!, $middleName: String!, $lastName: String!, $dateOfBirth: DateTime!, $pronoun: Pronoun!, $town: String!, $state: String!) {
            updateUser(id: $userId, firstName: $firstName, middleName: $middleName, lastName: $lastName, dateOfBirth: $dateOfBirth, pronoun: $pronoun, town: $town, state: $state) {
                id
            }
        }
    `, { name: 'updateUser' }),
    connect(mapStateToProps)
)(OnboardingUserInfoScreen);
