import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingUserInfoScreen from './OnboardingUserInfoScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading && !user ? null : user.id
});

const mapUpdateUserMutationToProps = ({ mutate }) => ({
    updateUser: (userId, args) => {
        mutate({
            variables: {
                userId,
                firstName: args.firstName,
                lastName: args.lastName,
                age: args.age,
                avatar: args.avatar,
                pronoun: ''
            }
        });
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressNext: (form) => {
        ownProps.navigation.navigate('OnboardingNetwork');
        ownProps.updateUser(ownProps.userId, {
            firstName: form.firstName,
            lastName: form.lastName,
            age: parseInt(form.age, 10),
            avatar: parseInt(form.avatar, 10)
        });
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(gql`
        mutation($userId: ID!, $firstName: String!, $lastName: String!, $age: Int!, $pronoun: Pronoun!) {
            updateUser(id: $userId, firstName: $firstName, lastName: $lastName, age: $age, pronoun: $pronoun) {
                id
            }
        }
    `, { props: mapUpdateUserMutationToProps }),
    connect(undefined, undefined, mergeProps)
)(OnboardingUserInfoScreen);
