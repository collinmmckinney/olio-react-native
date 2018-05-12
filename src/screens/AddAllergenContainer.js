import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import { addSubBubbles } from '../actions/bubbles';
import { selectAllegenType } from '../actions/map';
import AddAllergenScreen from './AddAllergenScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mapStateToProps = state => ({
    selectedBubbleId: state.Bubbles.selectedBubbleId
});

const mapDispatchToProps = {
    addSubBubbles,
    selectAllegenType
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onSave: (allergens) => {
        dispatchProps.addSubBubbles(stateProps.selectedBubbleId, allergens.map((key) => {
            if (key === 'Shellfish') {
                return {
                    onPress: () => {
                        dispatchProps.selectAllegenType(key);
                        ownProps.navigation.navigate('Map');
                    },
                    label: 'Shellfish'
                };
            } else if (key === 'Pollen') {
                return {
                    onPress: () => {
                        dispatchProps.selectAllegenType(key);
                        ownProps.navigation.navigate('Map');
                    },
                    label: 'Pollen'
                };
            } else if (key === 'TreePollen') {
                return {
                    onPress: () => {
                        dispatchProps.selectAllegenType(key);
                        ownProps.navigation.navigate('Map');
                    },
                    label: 'TreePollen'
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
