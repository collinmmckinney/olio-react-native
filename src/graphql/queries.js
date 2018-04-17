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

export const allMapItemsQuery = gql`
    query {
        allMapItems {
            id
            user {
                id
            }
            latitude
            longitude
            allergenType
            comment
        }
    }
`;
