import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors } from '../../style';
import { Form, Button } from '../../components';

const FIELDS = [
    { key: 'doctorEmail', label: "Doctor's email?" },
    { key: 'doctorFirstName', label: "Doctor's first name?" },
    { key: 'doctorLastName', label: "Doctor's last name?" },
    { key: 'caregiverEmail', label: "Caregiver's email?" }
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
});

export default class OnboardingNetworkScreen extends Component {
    static propTypes = {
        onPressDone: PropTypes.func
    }

    static defaultProps = {
        onPressDone: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {};
        FIELDS.forEach((field) => {
            this.state[field.key] = '';
        });

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handlePressDone = this.handlePressDone.bind(this);
    }

    handleFormChange(form) {
        this.setState(form);
    }

    handlePressDone() {
        this.props.onPressDone(this.state);
    }

    render() {
        const fields = FIELDS.map(field => ({ ...field, value: this.state[field.key] }));

        return (
            <View style={styles.container}>
                <View style={styles.progressBar} />
                <View style={styles.screen}>
                    <KeyboardAwareScrollView>
                        <Form
                            fields={fields}
                            onChange={this.handleFormChange}
                            style={styles.form}
                        />
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
