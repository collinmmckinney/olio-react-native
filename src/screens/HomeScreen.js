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
        backgroundColor: '#F5FCFF'
    }
});

export default class HomeScreen extends Component {
    static propTypes = {
        userId: PropTypes.string,
        isUserNull: PropTypes.bool,
        onNullUser: PropTypes.func
    };

    static defaultProps = {
        userId: '',
        isUserNull: false,
        onNullUser: () => {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUserNull) {
            nextProps.onNullUser();
        }
    }

    render() {
        const { userId } = this.props;
        return (
            <View style={styles.container}>
                <Text>{userId}</Text>
            </View>
        );
    }
}
