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
        onNullUser: PropTypes.func,
        requestLocationPermission: PropTypes.func.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
    };

    static defaultProps = {
        userId: '',
        isUserNull: false,
        onNullUser: () => {}
    };

    componentDidMount() {
        this.props.requestLocationPermission();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUserNull) {
            nextProps.onNullUser();
        }
    }

    render() {
        const { latitude, longitude } = this.props;
        console.log(latitude, longitude);
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.0222,
                        longitudeDelta: 0.0121,
                    }}
                    style={styles.container}
                />
            </View>
        );
    }
}
