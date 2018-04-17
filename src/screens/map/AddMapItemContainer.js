import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery, allMapItemsQuery } from '../../graphql/queries';
import { createMapItemMutation } from '../../graphql/mutations';
import AddMapItemScreen from './AddMapItemScreen';

const mapStateToProps = ({ Location }, ownProps) => {
    return {
        userLocation: {
            latitude: Location.userLocation.coords.latitude,
            longitude: Location.userLocation.coords.longitude
        }
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        onSubmit: (allergenType, comment) => {
            const { latitude, longitude } = stateProps.userLocation;
            ownProps.createMapItem({
                variables: {
                    userId: ownProps.data.user.id,
                    latitude,
                    longitude,
                    allergenType,
                    comment
                },
                refetchQueries: [{ query: allMapItemsQuery }]
            });
            ownProps.navigation.goBack();
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    graphql(createMapItemMutation, { name: 'createMapItem' }),
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(AddMapItemScreen);
