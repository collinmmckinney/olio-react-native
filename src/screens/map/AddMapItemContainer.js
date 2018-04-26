import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery, allMapItemsQuery } from '../../graphql/queries';
import { createMapItemMutation } from '../../graphql/mutations';
import AddMapItemScreen from './AddMapItemScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mapCreateMapItemMutationToProps = ({ mutate }) => ({
    createMapItem: (userId, latitude, longitude, allergenType, comment) => {
        mutate({
            variables: {
                userId,
                latitude,
                longitude,
                allergenType,
                comment
            },
            refetchQueries: [{ query: allMapItemsQuery }]
        });
    }
});

const mapStateToProps = ({ Location }) => ({
    userLocation: {
        latitude: Location.userLocation.coords.latitude,
        longitude: Location.userLocation.coords.longitude
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onSubmit: (allergenType, comment) => {
        const { userId, navigation } = ownProps;
        const { latitude, longitude } = stateProps.userLocation;
        ownProps.createMapItem(userId, latitude, longitude, allergenType, comment);
        navigation.goBack();
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(createMapItemMutation, { props: mapCreateMapItemMutationToProps }),
    connect(mapStateToProps, undefined, mergeProps)
)(AddMapItemScreen);
