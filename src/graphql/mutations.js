import gql from 'graphql-tag';

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

export const createReportMutation = gql`
    mutation($patientId: ID!, $fev1: Float, $fvc: Float) {
        createReport(patientId: $patientId, fev1: $fev1, fvc: $fvc) {
            id
        }
    }
`;

export const createMapItemMutation = gql`
    mutation($userId: ID!, $latitude: Float!, $longitude: Float!, $allergenType: AllergenType!, $comment: String) {
        createMapItem(userId: $userId, latitude: $latitude, longitude: $longitude, allergenType: $allergenType, comment: $comment) {
            id
        }
    }
`;
