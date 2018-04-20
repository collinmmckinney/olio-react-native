import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Bubble } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default class AvatarScreen extends Component {
    static propTypes = {
        bubbles: PropTypes.arrayOf(PropTypes.shape({
            radius: PropTypes.number,
            label: PropTypes.string,
            onPress: PropTypes.func
        }))
    };

    static defaultProps = {
        bubbles: []
    };

    render() {
        const { bubbles } = this.props;
        const bubbleElements = bubbles.map(bubble => (
            <Bubble
                key={bubble.label}
                radius={bubble.radius}
                label={bubble.label}
                onPress={bubble.onPress}
            />
        ));

        return (
            <View style={styles.container}>
                {bubbleElements}
            </View>
        );
    }
}
