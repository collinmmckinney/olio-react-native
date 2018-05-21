import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button, TextInput } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        paddingHorizontal: 18,
        backgroundColor: 'white'
    },
    commentInput: {
        height: 175
    }
});

export default class AddMapItemScreen extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            comment: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { onSubmit } = this.props;
        const { comment } = this.state;
        onSubmit(comment);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Comments" style={styles.commentInput} onChangeText={value => this.setState({ comment: value })} />
                <Button label="SUBMIT" onPress={this.handleSubmit} />
            </View>
        );
    }
}
