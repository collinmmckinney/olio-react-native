import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Slider
} from 'react-native';
import { colors } from '../style';
import { Button, TextInput } from '../components';

const redHeart = require('../assets/redHeart.png');
const one = require('../assets/1.png');
const two = require('../assets/2.png');
const three = require('../assets/3.png');
const four = require('../assets/4.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottom: {
        flex: 2,
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    bigInput: {
        height: 100,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 14
    },
    title: {
        fontSize: 18,
        color: colors.primary
    },
    bottomThings: {
        flex: 1,
        flexDirection: 'row',
    },
    slide: {
        margin: 5
    },
    saveButton: {
        margin: 10,
    },
});

export default class NowScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emoji: one,
            value: 1
        };

        this.change = this.change.bind(this);
    }

    change(value) {
        if (value === 1) {
            this.setState({ emoji: one });
        } else if (value === 2) {
            this.setState({ emoji: two });
        } else if (value === 3) {
            this.setState({ emoji: three });
        } else {
            this.setState({ emoji: four });
        }
    }

    render() {
        const { value, emoji } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.circle}>
                        <Image
                            style={{
                                width: 70,
                                height: 100,
                            }}
                            source={redHeart}
                        />
                    </View>
                    <Text style={styles.title}>@Now</Text>
                </View>
                <View style={styles.bottom}>
                    <Slider
                        step={1}
                        maximumValue={5}
                        minimumTrackTintColor={colors.primary}
                        thumbImage={emoji}
                        onValueChange={this.change}
                        value={value}
                        style={styles.slide}
                    />
                    <TextInput placeholder="What's new with you..." style={styles.bigInput} />
                    <Button label="SAVE" onPress={this.handleSave} style={styles.saveButton} />
                </View>
            </View>
        );
    }
}
