import React, { Component } from 'react';
import { View, ViewPropTypes, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput } from '.';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 29
    },
    input: {
        flex: 1
    },
    inputWithLabel: {
        flex: 0,
        width: 120
    }
});

export default class UserInfoForm extends Component {
    static propTypes = {
        fields: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string,
            placeholder: PropTypes.string,
            label: PropTypes.string
        })),
        onChange: PropTypes.func,
        style: ViewPropTypes.style
    }

    static defaultProps = {
        fields: [],
        onChange: () => {},
        style: null
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, value) {
        const { fields, onChange } = this.props;
        const updatedFields = {};
        fields.forEach((field) => {
            updatedFields[field.key] = field.value;
        });
        updatedFields[key] = value;
        onChange(updatedFields);
    }

    render() {
        const { fields, style } = this.props;
        const elements = fields.map(field => (
            <View key={field.key} style={styles.row}>
                <Text>{field.label}</Text>
                <TextInput
                    value={field.value}
                    placeholder={field.placeholder}
                    style={[styles.input, field.label ? styles.inputWithLabel : {}]}
                    onChangeText={(value) => { this.handleChange(field.key, value); }}
                />
            </View>
        ));

        return (
            <View style={style}>
                {elements}
            </View>
        );
    }
}
