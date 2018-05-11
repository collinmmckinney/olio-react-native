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
        dispatchProps.addBubbles(bubbles.map((bubbleLabel) => {
            if (bubbleLabel === 'Allergen-Induced') {
                return {
                    label: bubbleLabel,
                    subBubbles: [
                        { label: '+', onPress: () => ownProps.navigation.navigate('AddAllergen') }
                    ]
                };
            } else if (bubbleLabel === 'Weather-Induced') {
                return {
                    label: bubbleLabel,
                    subBubbles: [
                        { label: '+', onPress: () => ownProps.navigation.navigate('AddAllergen') }
                    ]
                };
            } else if (bubbleLabel === 'Exercise-Induced') {
                return {
                    label: bubbleLabel,
                    subBubbels: [
                        { label: '+', onPress: () => ownProps.navigation.navigate('AddAllergen') }
                    ]
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
