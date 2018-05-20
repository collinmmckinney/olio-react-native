import React, { Component } from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LABEL_TO_IMAGE } from '../util';

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
        image: PropTypes.string,
        style: ViewPropTypes.style
    }

    static defaultProps = {
        radius: 32,
        image: null,
        style: null
    }

    render() {
        const {
            radius,
            image,
            style
        } = this.props;

        const sizeStyle = {
            height: radius * 2,
            width: radius * 2,
            borderRadius: radius
        };

        return (
            <View style={[styles.container, sizeStyle, style]}>
                {React.cloneElement(LABEL_TO_IMAGE[image], { size: 50 })}
            </View>
        );
    }
}
