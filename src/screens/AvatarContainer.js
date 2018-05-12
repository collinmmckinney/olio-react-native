import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import {
    deleteBubble,
    setArrangeMode,
    updateBubbleLocation,
    resizeBubble,
    selectBubble
} from '../actions/bubbles';
import AvatarScreen from './AvatarScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mapStateToProps = state => ({
    bubbles: Object.keys(state.Bubbles.byId).map((id) => {
        const bubble = Object.assign({}, state.Bubbles.byId[id]);
        bubble.showSubBubbles = id === state.Bubbles.selectedBubbleId;
        return bubble;
    }),
    arrangeMode: state.Bubbles.arrangeMode
});

const mapDispatchToProps = {
    deleteBubble,
    setArrangeMode,
    updateBubbleLocation,
    resizeBubble,
    selectBubble
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onHeartPress: () => ownProps.navigation.navigate('Wellbeing'),
    onLungsPress: () => ownProps.navigation.navigate('CarePlan'),
    onAddButtonPress: () => ownProps.navigation.navigate('AddBubble'),
    onCloseButtonPress: () => dispatchProps.setArrangeMode(false),
    onBubblePress: id => dispatchProps.selectBubble(id),
    onBubbleLongPress: () => {
        dispatchProps.selectBubble(null);
        dispatchProps.setArrangeMode(true);
    },
    onBubbleDragStop: (id, x, y) => dispatchProps.updateBubbleLocation(id, x, y),
    onBubbleResize: (id, delta) => dispatchProps.resizeBubble(id, delta),
    onBubbleDeletePress: id => dispatchProps.deleteBubble(id)
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(AvatarScreen);
