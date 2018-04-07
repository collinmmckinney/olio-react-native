import React, { Component } from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput } from '.';

export default class UserInfoForm extends Component {
    static propTypes = {
        fields: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string
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
        updatedFields[key].value = value;
        onChange(updatedFields);
    }

    render() {
        const { fields, style } = this.props;
        const elements = fields.map(field => (
            <TextInput
                key={field.key}
                value={field.value}
                onChangeText={(value) => { this.handleChange(field.key, value); }}
            />
        ));

        return (
            <View style={style}>
                {elements}
            </View>
        );
    }
}
