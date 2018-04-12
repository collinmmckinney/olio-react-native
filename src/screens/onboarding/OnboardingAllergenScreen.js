import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../style';
import { Button, AllergenSelect } from '../../components';

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

export default class OnboardingAllergenScreen extends Component {
    static propTypes = {
        onPressNext: PropTypes.func
    }

    static defaultProps = {
        onPressNext: () => {}
    }

    constructor(props) {
        super(props);

        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handlePressNext = this.handlePressNext.bind(this);
    }

    handleSelectionChange(selection) {
        console.log(selection);
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
                            <AllergenSelect onChange={this.handleSelectionChange} />
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
