import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Interactable from 'react-native-interactable';
import { colors, sizes } from '../style';

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
        width: 38,
        height: 38,
        borderRadius: 38,
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
        onStopInteraction: PropTypes.func
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
        onStopInteraction: () => {}
    }

    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
        this.handleLongPress = this.handleLongPress.bind(this);
        this.handleStopInteraction = this.handleStopInteraction.bind(this);
    }

    handlePress() {
        const { id } = this.props;
        this.props.onPress(id);
    }

    handleLongPress() {
        this.props.onLongPress();
    }

    handleStopInteraction(event) {
        const { id } = this.props;
        const { x, y } = event.nativeEvent;
        this.props.onStopInteraction(id, x, y);
    }

    render() {
        const {
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

        const subBubbleContainerRadius = radius;
        const radiusDelta = radius - (0.5 * ((Math.sqrt(2) * radius) - radius));
        const subBubbleElements = subBubbles.map((subBubble, i) => {
            const angle = (i + 2) * (Math.PI / 4);
            const subBubbleX = initialX +
                -(subBubbleContainerRadius * Math.sin(angle)) + radiusDelta;
            const subBubbleY = initialY +
                (subBubbleContainerRadius * Math.cos(angle)) + radiusDelta;
            const subBubblePositionStyle = { top: subBubbleY, left: subBubbleX };
            return (
                <TouchableOpacity
                    key={subBubble.label}
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
            >
                <View>
                    <TouchableOpacity
                        disabled={interactable}
                        onPress={this.handlePress}
                        onLongPress={this.handleLongPress}
                    >
                        <View style={[styles.container, sizeStyle]}>
                            <Text style={styles.text}>{label}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Interactable.View>
        );

        return [primaryBubble, ...showSubBubbles && subBubbleElements];
    }
}
