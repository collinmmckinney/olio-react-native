import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        backgroundColor: colors.primary,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 22
    }
});

export default class Button extends Component {
    static propTypes = {
        label: PropTypes.string,
        disabled: PropTypes.bool,
        style: ViewPropTypes.style,
        onPress: PropTypes.func
    }

    static defaultProps = {
        label: '',
        disabled: false,
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
        const { label, disabled, style } = this.props;
        return (
            <TouchableOpacity onPress={this.handlePress} disabled={disabled}>
                <View style={[styles.container, style]}>
                    <Text style={styles.text}>{label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
