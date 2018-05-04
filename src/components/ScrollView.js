import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 19,
        backgroundColor: 'white',
        shadowOffset: { width: 4, height: 4, },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 8
    }
});

export default class OlioScrollView extends Component {
    static propTypes = {
        style: ScrollView.propTypes.style
    }

    static defaultProps = {
        style: null
    }

    render() {
        const props = {
            ...this.props,
            style: [styles.container, this.props.style]
        };

        return <ScrollView {...props} />;
    }
}
