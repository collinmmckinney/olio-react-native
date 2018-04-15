import gql from 'graphql-tag';

export const loggedInUserQuery = gql`
    query {
        user {
            id
            patient {
                id
            }
            caregiver {
                id
            }
            doctor {
                id
            }
        }
    }
`;

export const signupUserMutation = gql`
    mutation($email: String!, $username: String!, $password: String!) {
        signupUser(email: $email, username: $username, password: $password) {
            id
            token
        }
    }
`;

export const authenticateUserMutation = gql`
    mutation($email: String!, $password: String!) {
        authenticateUser(email: $email, password: $password) {
            id
            token
        }
    }
`;
