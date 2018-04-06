import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import OnboardingScreen from './OnboardingScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onPressDone: () => {
            ownProps.navigation.navigate('Map');
        }
    };
};

export default compose(
    graphql(gql`
        mutation($email: String!, $password: String!) {
            authenticateUser(email: $email, password: $password) {
                id
                token
            }
        }
    `, { name: 'authenticateUser' }),
    connect(mapStateToProps)
)(OnboardingScreen);
