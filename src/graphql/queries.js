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
