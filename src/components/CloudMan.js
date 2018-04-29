import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../style';

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40
    },
    wind: {
        flex: 1,
        margin: 15,
        transform: [{ rotateY: '180deg' }]
    },
});

export default class CloudMan extends Component {
    static propTypes = {
        winds: PropTypes.string,
    }

    static defaultProps = {
        winds: '1',
    }


    render() {
        const { winds } = this.props;
        const cloudy = require('../assets/cloudy.png');
        return (
            <View style={styles.bar}>
                {winds.split(',').map(c => (
                    <View style={styles.wind}>
                        <Icon name="weather-windy" size={30} key={c} color={colors.windBlue} />
                    </View>))}
                <Image
                    style={{
                        width: 20,
                        height: 45,
                        flex: 1,
                    }}
                    source={cloudy}
                />
            </View>
        );
    }
}
