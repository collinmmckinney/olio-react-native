import gql from 'graphql-tag';

export const loggedInUserQuery = gql`
    query {
        loggedInUser {
            id
        }
    }
`;
