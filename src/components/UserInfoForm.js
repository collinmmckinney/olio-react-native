import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Form } from '.';

const FIELDS = [
    'name',
    'age',
    'gender',
    'hometown',
    'email'
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 24,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    }
});

export default class UserInfoForm extends Component {
    static propTypes = {
        onChange: PropTypes.func
    }

    static defaultProps = {
        onChange: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {};
        FIELDS.forEach((field) => {
            this.state[field] = '';
        });

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(updatedFields) {
        const { onChange } = this.props;
        this.setState(updatedFields);
        onChange(updatedFields);
    }

    render() {
        const fields = FIELDS.map(field => ({ key: field, value: this.state[field] }));

        return (
            <Form fields={fields} onChange={this.handleChange} style={styles.container} />
        );
    }
}
