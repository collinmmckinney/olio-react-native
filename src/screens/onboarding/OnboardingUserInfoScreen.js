import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors } from '../../style';
import { Button, TextInput } from '../../components';


const FIELDS = [
    { key: 'firstName', label: "What's your first name?" },
    { key: 'lastName', label: 'Last name?' },
    { key: 'age', label: 'How old are you?' },
    { key: 'avatar', label: 'Choose your avatar:' }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        backgroundColor: 'white'
    },
    progressBar: {
        flex: 1,
    },
    screen: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8
    },
    nextButton: {
        marginBottom: 40,
        marginTop: 30,
        backgroundColor: colors.primaryDarker
    },
    nextWrapper: {
        flex: 2,
        marginLeft: 5
    },
    backButton: {
        marginBottom: 40,
        marginTop: 30,
        backgroundColor: colors.primaryDarker,
        opacity: 0.5
    },
    backWrapper: {
        flex: 1,
        marginRight: 5
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    entry: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12
    },
    text: {
        flex: 1,
        color: colors.grayText,
        margin: 15
    },
    textInput: {
        flex: 1,
        margin: 15,
    },
    avatar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 15
    }
});

export default class OnboardingUserInfoScreen extends Component {
    static propTypes = {
        onPressNext: PropTypes.func
    }

    static defaultProps = {
        onPressNext: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {};
        FIELDS.forEach((field) => {
            this.state[field.key] = '';
        });

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handlePressNext = this.handlePressNext.bind(this);
    }

    handleFormChange(form) {
        this.setState(form);
    }

    handlePressNext() {
        this.props.onPressNext(this.state);
    }

    render() {
        const fields = FIELDS.map(field => ({ ...field, value: this.state[field.key] }));
        const boyImage = require('../../assets/boy.png');
        const girlImage = require('../../assets/girl.png');
        const girl2Image = require('../../assets/girl2.png');
        return (
            <View style={styles.container}>
                <View style={styles.progressBar} />
                <View style={styles.screen}>
                    <KeyboardAwareScrollView>
                        <View style={styles.entry}>
                            <Text style={styles.text}>{fields[0].label}</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => this.setState({ [fields[0].key]: text })}
                                value={this.state[fields[0].key]}
                            />
                        </View>
                        <View style={styles.entry}>
                            <Text style={styles.text}>{fields[1].label}</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => this.setState({ [fields[1].key]: text })}
                                value={this.state[fields[1].key]}
                            />
                        </View>
                        <View style={styles.entry}>
                            <Text style={styles.text}>{fields[2].label}</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => this.setState({ [fields[2].key]: text })}
                                value={this.state[fields[2].key]}
                            />
                        </View>
                        <View style={styles.entry}>
                            <Text style={styles.text}>{fields[3].label}</Text>
                            <View style={styles.avatar}>
                                <TouchableOpacity onPress={() => this.setState({ [fields[3].key]: 1 })}>
                                    <Image
                                        style={{ width: 46, height: 46 }}
                                        source={boyImage}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ [fields[3].key]: 2 })}>
                                    <Image
                                        style={{ width: 46, height: 46 }}
                                        source={girlImage}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ [fields[3].key]: 3 })}>
                                    <Image
                                        style={{ width: 40, height: 40 }}
                                        source={girl2Image}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.backWrapper}>
                        <Button
                            label="←"
                            style={styles.backButton}
                        />
                    </View>
                    <View style={styles.nextWrapper}>
                        <Button
                            onPress={this.handlePressNext}
                            label="NEXT"
                            style={styles.nextButton}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
