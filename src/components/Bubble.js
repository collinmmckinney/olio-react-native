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
import { LABEL_TO_IMAGE } from '../util';

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
        position: 'absolute'
    },
    subBubble: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: SUB_BUBBLE_RADIUS * 2,
        height: SUB_BUBBLE_RADIUS * 2,
        borderRadius: SUB_BUBBLE_RADIUS * 2,
        backgroundColor: colors.primaryDarkest
    },
    deleteButton: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: colors.grayText
    },
    deleteSymbol: {
        color: 'white',
        fontSize: 40,
        position: 'relative',
        left: -10
    }
});

export default class Bubble extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        subBubbles: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            image: PropTypes.string,
            onPress: PropTypes.func
        })),
        showSubBubbles: PropTypes.bool,
        initialX: PropTypes.number,
        initialY: PropTypes.number,
        radius: PropTypes.number,
        image: PropTypes.oneOf(['flower', 'tree', 'shellfish', 'map', 'weather', 'household', 'spirometry', 'airQuality']),
        label: PropTypes.string,
        interactable: PropTypes.bool,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        onStopInteraction: PropTypes.func,
        onResize: PropTypes.func,
        onDeletePress: PropTypes.func
    }

    static defaultProps = {
        subBubbles: [],
        showSubBubbles: false,
        initialX: 0,
        initialY: 0,
        radius: 40,
        image: null,
        label: '',
        interactable: true,
        onPress: () => {},
        onLongPress: () => {},
        onStopInteraction: () => {},
        onResize: () => {},
        onDeletePress: () => {}
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
        this.handleDeletePress = this.handleDeletePress.bind(this);
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

    handleDeletePress() {
        const { id, onDeletePress } = this.props;
        onDeletePress(id);
    }

    render() {
        const {
            id,
            image,
            subBubbles,
            showSubBubbles,
            initialX,
            initialY,
            radius,
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

        const deleteButtonDelta = ((radius / 2) * (Math.sqrt(2) - 1)) / Math.sqrt(2);
        const deleteButtonStyle = {
            top: deleteButtonDelta,
            left: deleteButtonDelta
        };

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
                >
                    {React.cloneElement(LABEL_TO_IMAGE[subBubble.image], { size: 30 })}
                </TouchableOpacity>
            );
        });

        const primaryBubble = (
            <Interactable.View
                key={id}
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
                        {React.cloneElement(LABEL_TO_IMAGE[image], { size: 80 })}
                        { interactable &&
                            <TouchableOpacity
                                onPress={this.handleDeletePress}
                                style={[styles.deleteButton, deleteButtonStyle]}
                            >
                                <Text style={[styles.deleteSymbol, { transform: [{ rotate: '225deg' }] }]}>+</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </TouchableOpacity>
            </Interactable.View>
        );

        return [primaryBubble, ...showSubBubbles && subBubbleElements];
    }
}
