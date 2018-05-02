import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import {
    addBubble,
    setArrangeMode,
    updateBubbleLocation,
    resizeBubble,
    toggleShowSubBubbles
} from '../actions/bubbles';
import AvatarScreen from './AvatarScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mapStateToProps = state => ({
    bubbles: Object.keys(state.Bubbles.byId).map(id => state.Bubbles.byId[id]),
    arrangeMode: state.Bubbles.arrangeMode
});

const mapDispatchToProps = {
    addBubble,
    setArrangeMode,
    updateBubbleLocation,
    resizeBubble,
    toggleShowSubBubbles
};

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    onAddButtonPress: bubbleType => dispatchProps.addBubble(bubbleType),
    onCloseButtonPress: () => dispatchProps.setArrangeMode(false),
    onBubblePress: id => dispatchProps.toggleShowSubBubbles(id),
    onBubbleLongPress: () => dispatchProps.setArrangeMode(true),
    onBubbleDragStop: (id, x, y) => dispatchProps.updateBubbleLocation(id, x, y),
    onBubbleResize: (id, delta) => dispatchProps.resizeBubble(id, delta)
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(AvatarScreen);
