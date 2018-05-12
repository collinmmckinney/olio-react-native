import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import { addSubBubbles } from '../actions/bubbles';
import AddAllergenScreen from './AddAllergenScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mapStateToProps = state => ({
    selectedBubbleId: state.Bubbles.selectedBubbleId
});

const mapDispatchToProps = {
    addSubBubbles
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onSave: (allergens) => {
        dispatchProps.addSubBubbles(stateProps.selectedBubbleId, allergens.map((key) => {
            if (key === 'shellfish') {
                return {
                    onPress: () => ownProps.navigation.navigate('Map')
                };
            } else if (key === 'pollen') {
                return {
                    onPress: () => ownProps.navigation.navigate('Map')
                };
            } else if (key === 'treePollen') {
                return {
                    onPress: () => ownProps.navigation.navigate('Map')
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
)(AddAllergenScreen);
