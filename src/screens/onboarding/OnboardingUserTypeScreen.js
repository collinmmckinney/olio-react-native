import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../style';
import { Button, UserTypeSelect } from '../../components';

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

export default class OnboardingUserTypeScreen extends Component {
    static propTypes = {
        onSelectUserType: PropTypes.func
    }

    static defaultProps = {
        onSelectUserType: () => {}
    }

    constructor(props) {
        super(props);

        this.handleSelectUserType = this.handleSelectUserType.bind(this);
    }

    handleSelectUserType(userType) {
        this.props.onSelectUserType(userType);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.screen}>
                    <UserTypeSelect onSelectUserType={this.handleSelectUserType} />
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
