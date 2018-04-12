import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../style';
import { Button, PeakFlowForm } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: 'white'
    },
    listContainer: {
        flex: 1,
        marginHorizontal: 18
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

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handlePressNext = this.handlePressNext.bind(this);
    }

    handleFormChange(form) {
        console.log(form);
    }

    handlePressNext() {
        this.props.onPressNext();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <View style={styles.container}>
                        <View style={styles.screen}>
                            <PeakFlowForm onChange={this.handleFormChange} />
                        </View>
                    </View>
                    <Button
                        onPress={this.handlePressNext}
                        label="NEXT"
                        style={styles.nextButton}
                    />
                </View>
            </View>
        );
    }
}
