import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default class DataScreen extends Component {
    static propTypes = {
        userId: PropTypes.string
    };

    static defaultProps = {
        userId: ''
    };

    render() {
        const { userId } = this.props;
        return (
            <View style={styles.container}>
                <Text>{userId}</Text>
            </View>
        );
    }
}
