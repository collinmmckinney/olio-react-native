import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import { addBubbles } from '../actions/bubbles';
import AddBubbleScreen from './AddBubbleScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mapStateToProps = state => ({
    bubbles: Object.keys(state.Bubbles.byId).map(id => state.Bubbles.byId[id])
});

const mapDispatchToProps = {
    addBubbles
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onSave: (bubbles) => {
        dispatchProps.addBubbles(bubbles.map((key) => {
            if (key === 'allergen') {
                return {
                    label: 'Allergen-Induced',
                    subBubbles: [
                        { label: '+', onPress: () => ownProps.navigation.navigate('AddAllergen'), image: null }
                    ],
                    image: null
                };
            } else if (key === 'weather') {
                return {
                    label: 'Weather-Induced',
                    onPress: () => ownProps.navigation.navigate('Weather'),
                    image: null
                };
            } else if (key === 'airQuality') {
                return {
                    label: 'Air Quality',
                    onPress: () => ownProps.navigation.navigate('AirQuality'),
                    image: null
                };
            } else if (key === 'flow') {
                return {
                    label: 'Spirometry',
                    onPress: () => ownProps.navigation.navigate('Spirometry'),
                    image: null
                };
            } else if (key === 'home') {
                return {
                    label: 'Household',
                    onPress: () => ownProps.navigation.navigate('Home'),
                    image: null
                };
            }
            return {};
        }));
        ownProps.navigation.goBack();
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(AddBubbleScreen);
