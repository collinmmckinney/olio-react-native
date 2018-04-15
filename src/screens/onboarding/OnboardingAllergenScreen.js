import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../style';
import { Button, AllergenSelect } from '../../components';

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

export default class OnboardingAllergenScreen extends Component {
    static propTypes = {
        onPressNext: PropTypes.func
    }

    static defaultProps = {
        onPressNext: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            selection: []
        };

        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handlePressNext = this.handlePressNext.bind(this);
    }

    handleSelectionChange(selection) {
        this.setState({ selection });
    }

    handlePressNext() {
        this.props.onPressNext(this.state.selection);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.screen}>
                    <AllergenSelect onChange={this.handleSelectionChange} />
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
