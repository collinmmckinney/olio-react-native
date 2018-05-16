import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { colors } from '../style';
import { Button, TextInput } from '../components';

const blueLung = require('../assets/blueLung.png');
const owl = require('../assets/owl.png');
const elephant = require('../assets/elephant.png');
const cat = require('../assets/cat.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    upper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    bottom: {
        flex: 3,
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 18,
        color: colors.primary,
        margin: 10
    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    saveButton: {
        margin: 10
    },
    input: {
        flex: 2,
        margin: 10
    },
    touch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallCircle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: colors.primary
    },
    plusMinus: {
        marginTop: -2,
        color: 'white',
        fontSize: 10
    },
    rates: {
        color: colors.primary,
        fontSize: 20
    },
    ratesWrapper: {
        margin: 5
    },
    clickWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default class AsthmaCareScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { cat: 0, elephant: 0, owl: 0 };

        this.catDecrease = this.catDecrease.bind(this);
        this.catIncrease = this.catIncrease.bind(this);
        this.elephantDecrease = this.elephantDecrease.bind(this);
        this.elephantIncrease = this.elephantIncrease.bind(this);
        this.owlDecrease = this.owlDecrease.bind(this);
        this.owlIncrease = this.owlIncrease.bind(this);
    }

    catDecrease() {
        const catMinus = this.state.cat - 1;
        this.setState({ cat: catMinus });
    }
    catIncrease() {
        const catMinus = this.state.cat + 1;
        this.setState({ cat: catMinus });
    }
    elephantDecrease() {
        const elephantMinus = this.state.elephant - 1;
        this.setState({ elephant: elephantMinus });
    }
    elephantIncrease() {
        const elephantMinus = this.state.elephant + 1;
        this.setState({ elephant: elephantMinus });
    }
    owlDecrease() {
        const owlMinus = this.state.owl - 1;
        this.setState({ owl: owlMinus });
    }
    owlIncrease() {
        const owlMinus = this.state.owl + 1;
        this.setState({ owl: owlMinus });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upper}>
                    <View style={styles.circle}>
                        <Image
                            style={{
                                width: 30,
                                height: 50,
                                margin: 15
                            }}
                            source={blueLung}
                        />
                    </View>
                    <Text style={styles.title}>Asthma Care</Text>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    margin: 15
                                }}
                                source={cat}
                            />
                        </View>
                        <View style={styles.clickWrapper}>
                            <TouchableOpacity style={styles.smallCircle} onPress={this.catDecrease}>
                                <View style={styles.touch}>
                                    <Text style={styles.plusMinus}>-</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.ratesWrapper}>
                                <Text style={styles.rates}>{this.state.cat}x</Text>
                            </View>
                            <TouchableOpacity style={styles.smallCircle} onPress={this.catIncrease}>
                                <View style={styles.touch}>
                                    <Text style={styles.plusMinus}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    margin: 15
                                }}
                                source={elephant}
                            />
                        </View>
                        <View style={styles.clickWrapper}>
                            <TouchableOpacity style={styles.smallCircle} onPress={this.elephantDecrease}>
                                <View style={styles.touch}>
                                    <Text style={styles.plusMinus}>-</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.ratesWrapper}>
                                <Text style={styles.rates}>{this.state.elephant}x</Text>
                            </View>
                            <TouchableOpacity style={styles.smallCircle} onPress={this.elephantIncrease}>
                                <View style={styles.touch}>
                                    <Text style={styles.plusMinus}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    margin: 15
                                }}
                                source={owl}
                            />
                        </View>
                        <View style={styles.clickWrapper}>
                            <TouchableOpacity style={styles.smallCircle} onPress={this.owlDecrease}>
                                <View style={styles.touch}>
                                    <Text style={styles.plusMinus}>-</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.ratesWrapper}>
                                <Text style={styles.rates}>{this.state.owl}x</Text>
                            </View>
                            <TouchableOpacity style={styles.smallCircle} onPress={this.owlIncrease}>
                                <View style={styles.touch}>
                                    <Text style={styles.plusMinus}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                    <Button label="SAVE" style={styles.saveButton} />
                </View>
            </View>
        );
    }
}
