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
        subBubbles: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            onPress: PropTypes.func
        })),
        initialX: PropTypes.number,
        initialY: PropTypes.number,
        radius: PropTypes.number,
        label: PropTypes.string,
        interactable: PropTypes.bool,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func
    }

    static defaultProps = {
        subBubbles: [],
        initialX: 0,
        initialY: 0,
        radius: 40,
        label: '',
        interactable: true,
        onPress: () => {},
        onLongPress: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            showSubBubbles: false
        };

        this.handlePress = this.handlePress.bind(this);
        this.handleLongPress = this.handleLongPress.bind(this);
    }

    handlePress() {
        const { onPress, subBubbles } = this.props;
        const { showSubBubbles } = this.state;
        if (subBubbles.length > 0) {
            this.setState({ showSubBubbles: !showSubBubbles });
        } else {
            onPress();
        }
    }

    handleLongPress() {
        const { onLongPress } = this.props;
        onLongPress();
    }

    render() {
        const {
            subBubbles,
            initialX,
            initialY,
            radius,
            label,
            interactable
        } = this.props;
        const { showSubBubbles } = this.state;

        const sizeStyle = {
            height: radius * 2,
            width: radius * 2,
            borderRadius: radius
        };
        const positionStyle = {
            position: 'absolute',
            top: initialY,
            left: initialX
        };
        const colorStyle = {
            backgroundColor: interactable ? colors.primaryDarker : colors.primary
        };
        const style = [sizeStyle, positionStyle, colorStyle];

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
                boundaries={{
                    left: -initialX,
                    right: sizes.DEVICE_WIDTH - initialX - (2 * radius),
                    top: -initialY,
                    bottom: sizes.DEVICE_HEIGHT - initialY - (2 * radius),
                    bounce: 0.5
                }}
                frictionAreas={[{ damping: 0.9 }]}
                style={style}
                dragEnabled={interactable}
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
