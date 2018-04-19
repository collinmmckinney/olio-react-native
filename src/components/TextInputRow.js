import React, { Component } from 'react';
import { StyleSheet, View, ViewPropTypes, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput } from '.';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 29
    },
    input: {
        flex: 1
    },
    inputWithLabel: {
        width: 120
    },
    labelContainer: {
        flex: 1
    }
});

export default class TextInputRow extends Component {
    static propTypes = {
        value: PropTypes.string,
        label: PropTypes.string,
        onChangeText: PropTypes.func,
        style: ViewPropTypes.style
    }

    static defaultProps = {
        value: null,
        label: null,
        onChangeText: () => {},
        style: null
    }

    render() {
        const {
            value,
            label,
            onChangeText,
            style
        } = this.props;

        const inputStyle = [
            label ? styles.inputWithLabel : styles.input,
            style
        ];

        return (
            <View style={[styles.container, style]}>
                { label &&
                    <View style={styles.labelContainer}>
                        <Text>{label}</Text>
                    </View>
                }
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={inputStyle}
                />
            </View>
        );
    }
}
