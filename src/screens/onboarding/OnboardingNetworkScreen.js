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
        paddingTop: 80,
        backgroundColor: 'white'
    },
    form: {
        flex: 1,
        paddingHorizontal: 18,
        alignItems: 'stretch'
    },
    screen: {
        flex: 1,
        borderColor: colors.primary,
        borderWidth: 3,
        borderRadius: 8
    },
    nextButton: {
        marginBottom: 40,
        marginTop: 30
    }
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
                <KeyboardAwareScrollView style={styles.screen}>
                    <Form
                        fields={fields}
                        onChange={this.handleFormChange}
                        style={styles.form}
                    />
                </KeyboardAwareScrollView>
                <Button
                    onPress={this.handlePressDone}
                    label="DONE"
                    style={styles.nextButton}
                />
            </View>
        );
    }
}
