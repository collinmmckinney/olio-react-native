import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import OnboardingScreen from './OnboardingScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onPressDone: () => {
            ownProps.navigation.navigate('Map');
        },
        onSelectPatient: () => {
            ownProps.createPatient({
                variables: { userId: ownProps.data.loggedInUser.id }
            });
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
)(OnboardingScreen);
