import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 63,
        height: 63,
        borderRadius: 63,
        backgroundColor: colors.primary
    },
    text: {
        color: 'white',
        fontSize: 70,
        marginTop: -15,
        fontWeight: '300'
    }
});

export default class AddButton extends Component {
    static propTypes = {
        onAddPress: PropTypes.func,
        onClosePress: PropTypes.func,
        close: PropTypes.bool
    }

    static defaultProps = {
        onAddPress: () => {},
        onClosePress: () => {},
        close: false
    }

    constructor(props) {
        super(props);

        this.state = {
            rotationValue: new Animated.Value(0)
        };

        this.handlePress = this.handlePress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.close && nextProps.close) {
            Animated.timing(
                this.state.rotationValue,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start();
        } else if (this.props.close && !nextProps.close) {
            Animated.timing(
                this.state.rotationValue,
                {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start();
        }
    }

    handlePress() {
        const { close, onAddPress, onClosePress } = this.props;
        if (close) {
            onClosePress();
        } else {
            onAddPress();
        }
    }

    render() {
        const rotationValue = this.state.rotationValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '225deg']
        });

        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Animated.View
                    style={[styles.container, { transform: [{ rotate: rotationValue }] }]}
                >
                    <Text style={styles.text}>+</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}
