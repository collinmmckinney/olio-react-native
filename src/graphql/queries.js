import gql from 'graphql-tag';

export const loggedInUserQuery = gql`
    query {
        user {
            id
            patient {
                id
                reports {
                    id
                    createdAt
                    fev1
                }
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
