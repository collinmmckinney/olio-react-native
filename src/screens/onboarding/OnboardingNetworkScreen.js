import React, { Component } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors } from '../../style';
import { TextInput, Button, CloudMan } from '../../components';

const FIELDS = [
    { key: 'doctorEmail', label: "Doctor's email?" },
    { key: 'doctorName', label: "Doctor's name?" },
    { key: 'caregiver1Email', label: "Caregiver's email?" },
    { key: 'caregiver2Email', label: "Caregiver's email?" }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        backgroundColor: 'white'
    },
    form: {
        flex: 1,
        paddingHorizontal: 18,
        alignItems: 'stretch'
    },
    screen: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8
    },
    progressBar: {
        flex: 1,
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
    header: {
        color: colors.primary,
        margin: 10,
        fontSize: 30,
        flex: 1
    },
    entry: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    textInput: {
        flex: 4,
        margin: 15,
        height: 35,
        fontSize: 16,
    },
    subhead: {
        color: colors.primaryDarker,
        fontSize: 14,
        margin: 5,
    },
    switcher: {
        flex: 1
    }
});

export default class OnboardingNetworkScreen extends Component {
    static propTypes = {
        onPressDone: PropTypes.func,
        onPressBack: PropTypes.func
    }

    static defaultProps = {
        onPressDone: () => {},
        onPressBack: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {};
        FIELDS.forEach((field) => {
            this.state[field.key] = '';
        });

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handlePressDone = this.handlePressDone.bind(this);
        this.handlePressBack = this.handlePressBack.bind(this);
    }

    handleFormChange(form) {
        this.setState(form);
    }

    handlePressDone() {
        this.props.onPressDone(this.state);
    }

    handlePressBack() {
        this.props.onPressBack();
    }

    render() {
        const {
            doctorEmail,
            doctorName,
            caregiver1Email,
            caregiver2Email
        } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <CloudMan winds={3} />
                </View>
                <View style={styles.screen}>
                    <KeyboardAwareScrollView>
                        <Text style={styles.header}>Connect your network</Text>
                        <View style={styles.entry}>
                            <Text style={styles.subhead}>Add your Helpers</Text>
                            <Text style={styles.subhead}>Share</Text>
                        </View>
                        <View style={styles.entry}>
                            <TextInput
                                value={caregiver1Email}
                                onChangeText={value => this.setState({ caregiver1Email: value })}
                                placeholder="Username/Email"
                                style={styles.textInput}
                            />
                            <View style={styles.switcher}>
                                <Switch onTintColor={colors.primary} />
                            </View>
                        </View>
                        <View style={styles.entry}>
                            <TextInput
                                value={caregiver2Email}
                                onChangeText={value => this.setState({ caregiver2Email: value })}
                                placeholder="Username/Email"
                                style={styles.textInput}
                            />
                            <View style={styles.switcher}>
                                <Switch onTintColor={colors.primary} />
                            </View>
                        </View>
                        <View style={styles.entry}>
                            <Text style={styles.subhead}>Add your Doctor{"'"}s name and practice</Text>
                        </View>
                        <View style={styles.entry}>
                            <TextInput
                                value={doctorName}
                                onChangeText={value => this.setState({ doctorName: value })}
                                placeholder="Name"
                                style={styles.textInput}
                            />
                            <View style={styles.switcher}>
                                <Switch onTintColor={colors.primary} />
                            </View>
                        </View>
                        <View style={styles.entry}>
                            <TextInput
                                value={doctorEmail}
                                onChangeText={value => this.setState({ doctorEmail: value })}
                                placeholder="Email"
                                style={styles.textInput}
                            />
                            <View style={styles.switcher} />
                        </View>

                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.backWrapper}>
                        <Button
                            onPress={this.handlePressBack}
                            label="←"
                            style={styles.backButton}
                        />
                    </View>
                    <View style={styles.nextWrapper}>
                        <Button
                            onPress={this.handlePressDone}
                            label="DONE"
                            style={styles.nextButton}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
