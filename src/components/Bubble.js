import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    PanResponder
} from 'react-native';
import PropTypes from 'prop-types';
import Interactable from 'react-native-interactable';
import { colors, sizes } from '../style';

const SUB_BUBBLE_RADIUS = 19;

const styles = StyleSheet.create({
    interactable: {
        position: 'absolute'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 24
    },
    subBubbleContainer: {
        position: 'absolute',
        backgroundColor: 'red'
    },
    subBubble: {
        position: 'absolute',
        width: SUB_BUBBLE_RADIUS * 2,
        height: SUB_BUBBLE_RADIUS * 2,
        borderRadius: SUB_BUBBLE_RADIUS * 2,
        backgroundColor: colors.primaryDarkest
    }
});

export default class Bubble extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        subBubbles: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            onPress: PropTypes.func
        })),
        showSubBubbles: PropTypes.bool,
        initialX: PropTypes.number,
        initialY: PropTypes.number,
        radius: PropTypes.number,
        label: PropTypes.string,
        interactable: PropTypes.bool,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        onStopInteraction: PropTypes.func,
        onResize: PropTypes.func
    }

    static defaultProps = {
        subBubbles: [],
        showSubBubbles: false,
        initialX: 0,
        initialY: 0,
        radius: 40,
        label: '',
        interactable: true,
        onPress: () => {},
        onLongPress: () => {},
        onStopInteraction: () => {},
        onResize: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            startDelta: null
        };

        this.handlePress = this.handlePress.bind(this);
        this.handleLongPress = this.handleLongPress.bind(this);
        this.handleStopInteraction = this.handleStopInteraction.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: ({ nativeEvent: { touches } }) => {
                const { interactable } = this.props;
                return interactable && touches.length === 2;
            },
            onMoveShouldSetPanResponder: ({ nativeEvent: { touches } }) => {
                const { interactable } = this.props;
                return interactable && touches.length === 2;
            },
            onPanResponderGrant: ({ nativeEvent: { touches } }) => {
                const { interactable } = this.props;
                if (interactable && touches.length === 2) {
                    const xDelta = touches[0].locationX - touches[1].locationX;
                    const yDelta = touches[0].locationY - touches[1].locationY;
                    const deltaSquared = ((xDelta) ** 2) + ((yDelta) ** 2);
                    const delta = Math.sqrt(deltaSquared);
                    this.setState({
                        startDelta: delta
                    });
                }
            },
            onPanResponderMove: ({ nativeEvent: { touches } }) => {
                const { interactable } = this.props;
                const { startDelta } = this.state;
                if (interactable && touches.length === 2) {
                    const xDelta = touches[0].locationX - touches[1].locationX;
                    const yDelta = touches[0].locationY - touches[1].locationY;
                    const deltaSquared = ((xDelta) ** 2) + ((yDelta) ** 2);
                    const delta = Math.sqrt(deltaSquared);
                    this.handleResize(delta - startDelta);
                    this.setState({
                        startDelta: delta
                    });
                }
            }
        });
    }

    handlePress() {
        const { id, onPress } = this.props;
        onPress(id);
    }

    handleLongPress() {
        this.props.onLongPress();
    }

    handleStopInteraction(event) {
        const { id, onStopInteraction } = this.props;
        const { x, y } = event.nativeEvent;
        onStopInteraction(id, x, y);
    }

    handleResize(delta) {
        const { id, onResize } = this.props;
        onResize(id, delta);
    }

    render() {
        const {
            id,
            subBubbles,
            showSubBubbles,
            initialX,
            initialY,
            radius,
            label,
            interactable
        } = this.props;

        const sizeStyle = {
            height: radius * 2,
            width: radius * 2,
            borderRadius: radius
        };
        const colorStyle = {
            backgroundColor: interactable ? colors.primaryDarker : colors.primary
        };
        const style = [sizeStyle, colorStyle];

        const cx = initialX + (radius - SUB_BUBBLE_RADIUS);
        const cy = initialY + (radius - SUB_BUBBLE_RADIUS);
        const subBubbleContainerRadius = radius + SUB_BUBBLE_RADIUS + 1;
        const subBubbleElements = subBubbles.map((subBubble, i) => {
            const angle = (i + 2) * (Math.PI / 4);
            const subBubbleX = cx - (subBubbleContainerRadius * Math.sin(angle));
            const subBubbleY = cy + (subBubbleContainerRadius * Math.cos(angle));
            const subBubblePositionStyle = { top: subBubbleY, left: subBubbleX };
            return (
                <TouchableOpacity
                    key={id + subBubble.label}
                    style={[styles.subBubble, subBubblePositionStyle]}
                    onPress={subBubble.onPress}
                />
            );
        });

        const primaryBubble = (
            <Interactable.View
                key={label}
                initialPosition={{ x: initialX, y: initialY }}
                boundaries={{
                    left: 0,
                    right: sizes.DEVICE_WIDTH - (2 * radius),
                    top: 0,
                    bottom: sizes.DEVICE_HEIGHT - (2 * radius),
                    bounce: 0.5,
                    haptics: true
                }}
                frictionAreas={[{ damping: 0.9 }]}
                style={[styles.interactable, style]}
                dragEnabled={interactable}
                onStop={this.handleStopInteraction}
                {...this.panResponder.panHandlers}
            >
                <TouchableOpacity
                    disabled={interactable}
                    onPress={this.handlePress}
                    onLongPress={this.handleLongPress}
                >
                    <View style={[styles.container, sizeStyle]}>
                        <Text style={styles.text}>{label}</Text>
                    </View>
                </TouchableOpacity>
            </Interactable.View>
        );

        return [primaryBubble, ...showSubBubbles && subBubbleElements];
    }
}
