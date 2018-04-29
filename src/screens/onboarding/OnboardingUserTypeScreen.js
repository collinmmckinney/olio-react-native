import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../style';
import { Button, UserTypeSelect, CloudMan } from '../../components';

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
    text: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 40,
        color: colors.primary,
        marginTop: 24,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 12,
    },
    subText: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.grayText,
        opacity: 0.8,
        margin: 24,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default class OnboardingUserTypeScreen extends Component {
    static propTypes = {
        onPressBack: PropTypes.func,
        onSelectUserType: PropTypes.func
    }

    static defaultProps = {
        onPressBack: () => {},
        onSelectUserType: () => {}
    }

    constructor(props) {
        super(props);

        this.handlePressBack = this.handlePressBack.bind(this);
        this.handleSelectUserType = this.handleSelectUserType.bind(this);
    }

    handlePressBack() {
        this.props.onPressBack();
    }

    handleSelectUserType(userType) {
        this.props.onSelectUserType(userType);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <CloudMan winds={1} />
                </View>
                <View style={styles.screen}>
                    <View style={styles.text}>
                        <Text style={styles.title}>
                          Who are you?
                        </Text>
                        <Text style={styles.subText}>
                          Before we start, remember that you can
                          never cross the ocean until you have the
                          courage to lose sight of the shore.
                        </Text>
                    </View>
                    <UserTypeSelect onSelectUserType={this.handleSelectUserType} />
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
