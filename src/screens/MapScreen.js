import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default class MapScreen extends Component {
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
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.container}
                />
            </View>
        );
    }
}
