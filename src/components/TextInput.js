import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 54,
        borderRadius: 10,
        borderColor: 'white',
        paddingHorizontal: 8,
        backgroundColor: 'white',
        shadowOffset: { width: 4, height: 4, },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 8
    }
});

export default class OlioTextInput extends Component {
    static propTypes = {
        style: TextInput.propTypes.style
    }

    static defaultProps = {
        style: null
    }

    render() {
        const props = {
            ...this.props,
            style: [styles.container, this.props.style]
        };

        return <TextInput {...props} />;
    }
}
