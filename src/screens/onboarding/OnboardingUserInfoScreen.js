import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors } from '../../style';
import { Button } from '../../components';

const FIELDS = [
    { key: 'firstName', label: "What's your first name?" },
    { key: 'lastName', label: 'Last name?' },
    { key: 'age', label: "What's your age?" },
    { key: 'pronoun', label: 'What are your pronouns?' }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 80,
        backgroundColor: 'white'
    },
    progressBar: {
        flex: 1,
    },
    screen: {
        flex: 4,
        borderColor: colors.primary,
        borderWidth: 3,
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
        justifyContent: 'space-between'
    },
    entry: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        console.log("hello");
        console.log(this.state);
        console.log(this.state.age);
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        const fields = FIELDS.map(field => ({ ...field, value: this.state[field.key] }));
        const ageRange = [];
        for (let i = 0; i <= 100; i += 1) {
            ageRange.push(<Picker.Item label={i.toString()} value={i.toString()} key={i.toString()} />);
        }
        return (
            <View style={styles.container}>
                <View style={styles.progressBar} />
                <KeyboardAwareScrollView style={styles.screen}>
                    <View style={styles.entry}>
                        <Text>What{"'"}s your first name?</Text>
                        <TextInput
                            onChangeText={text => this.setState({ [fields[0].key]: text })}
                            value={this.state[fields[0].key]}
                        />
                    </View>
                    <View style={styles.entry}>
                        <Text>Last name?</Text>
                        <TextInput
                            onChangeText={text => this.setState({ [fields[1].key]: text })}
                            value={this.state[fields[1].key]}
                        />
                    </View>
                    <View style={styles.entry}>
                        <Text>How old are you?</Text>
                        <Picker
                            selectedValue={fields[2].key}
                            style={{ height: 50, width: 100, flex: 1 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ [fields[2].key]: itemValue })}
                        >
                            {ageRange}
                        </Picker>
                    </View>
                    <View style={styles.entry}>
                        <Text>What are your pronouns?</Text>
                    </View>
                    <View style={styles.entry}>
                        <Text>Add a picture</Text>
                    </View>
                </KeyboardAwareScrollView>
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
