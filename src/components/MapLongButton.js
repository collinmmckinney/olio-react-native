import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 105,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 17,
        opacity: 0.7
    },
    label: {
        fontSize: 14,
        color: colors.grayText
    }
});

export default class MapLongButton extends Component {
    static propTypes = {
        label: PropTypes.string,
        style: ViewPropTypes.style,
        onPress: PropTypes.func
    }

    static defaultProps = {
        label: null,
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
        const { label, style } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View style={[styles.container, style]}>
                    <Text style={styles.label}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
