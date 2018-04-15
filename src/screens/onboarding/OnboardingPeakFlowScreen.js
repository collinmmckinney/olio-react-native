import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../style';
import { Button, Form } from '../../components';

const FIELDS = [
    { key: 'fev1', placeholder: 'FEV1' },
    { key: 'fvc', placeholder: 'FVC' }
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
        paddingVertical: 24,
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

export default class OnboardingPeakFlowScreen extends Component {
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

        return (
            <View style={styles.container}>
                <View style={styles.screen}>
                    <Form
                        fields={fields}
                        onChange={this.handleFormChange}
                        style={styles.form}
                    />
                </View>
                <Button
                    onPress={this.handlePressNext}
                    label="NEXT"
                    style={styles.nextButton}
                />
            </View>
        );
    }
}
