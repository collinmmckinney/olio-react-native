import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

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
        radius: PropTypes.number,
        label: PropTypes.string,
        onPress: PropTypes.func
    }

    static defaultProps = {
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
        const { radius, label } = this.props;
        const sizeStyle = {
            height: radius * 2,
            width: radius * 2,
            borderRadius: radius
        };
        const style = [styles.container, sizeStyle];
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <View style={style}>
                    <Text style={styles.text}>{label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
