import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../style';

const cloudy = require('../assets/cloudy.png');

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 35,
    },
    wind: {
        margin: 15,
        transform: [{ rotateY: '180deg' }]
    },
    cloud: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default class CloudMan extends Component {
    static propTypes = {
        winds: PropTypes.number,
    }

    static defaultProps = {
        winds: 1,
    }


    render() {
        const { winds } = this.props;

        const windArray = [];
        for (let i = 0; i < winds; i += 1) {
            const id = `wind${i.toString()}`;
            windArray.push(id);
        }

        return (
            <View style={styles.bar}>
                {windArray.map(c => (
                    <View style={styles.wind} key={c}>
                        <Icon name="weather-windy" size={35} color={colors.windBlue} />
                    </View>))}
                <View style={styles.cloud}>
                    <Image
                        style={{
                            width: 80,
                            height: 60,
                        }}
                        source={cloudy}
                    />
                </View>
            </View>
        );
    }
}
