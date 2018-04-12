import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../style';
import { Button } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 80,
        backgroundColor: 'white'
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

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handlePressDone = this.handlePressDone.bind(this);
    }

    handleFormChange(form) {
        console.log(form);
    }

    handlePressDone() {
        this.props.onPressDone();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.screen}>
                </View>
                <Button
                    onPress={this.handlePressDone}
                    label="DONE"
                    style={styles.nextButton}
                />
            </View>
        );
    }
}
