import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 24
    }
});

export default class StaticBubble extends Component {
    static propTypes = {
        radius: PropTypes.number,
        label: PropTypes.string,
        style: ViewPropTypes.style
    }

    static defaultProps = {
        radius: 32,
        label: '',
        style: null
    }

    render() {
        const {
            radius,
            label,
            style
        } = this.props;

        const sizeStyle = {
            height: radius * 2,
            width: radius * 2,
            borderRadius: radius
        };

        return (
            <View style={[styles.containter, sizeStyle, style]}>
                <Text style={styles.text}>{label}</Text>
            </View>
        );
    }
}
