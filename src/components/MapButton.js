import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 52,
        height: 52,
        backgroundColor: colors.primary,
        borderRadius: 12
    }
});

export default class Button extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        onPress: PropTypes.func
    }

    static defaultProps = {
        style: null,
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
        const { style } = this.props;
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <View style={[styles.container, style]} />
            </TouchableOpacity>
        );
    }
}
