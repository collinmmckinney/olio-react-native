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
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    text: {
        color: 'white',
        fontSize: 24
    }
});

export default class Bubble extends Component {
    static propTypes = {
        initialX: PropTypes.number,
        initialY: PropTypes.number,
        radius: PropTypes.number,
        label: PropTypes.string,
        onPress: PropTypes.func
    }

    static defaultProps = {
        initialX: 0,
        initialY: 0,
        radius: 40,
        label: '',
        onPress: () => {}
    }

    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        const { onPress } = this.props;
        onPress();
    }

    render() {
        const {
            initialX,
            initialY,
            radius,
            label
        } = this.props;
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
        const style = [sizeStyle, positionStyle];
        return (
            <Interactable.View
                boundaries={{
                    left: -initialX,
                    right: sizes.DEVICE_WIDTH - initialX - (2 * radius),
                    top: -initialY,
                    bottom: sizes.DEVICE_HEIGHT - initialY - (2 * radius),
                    bounce: 0.5
                }}
                style={style}
            >
                <TouchableOpacity onPress={this.handlePress}>
                    <View style={[styles.container, sizeStyle]}>
                        <Text style={styles.text}>{label}</Text>
                    </View>
                </TouchableOpacity>
            </Interactable.View>
        );
    }
}
