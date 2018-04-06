import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';

const DEVICE_WIDTH = Dimensions.get('window').width;
const ONBOARDING_SCREENS = [
    'userType',
    'info',
    'allergens',
    'peakFlow',
    'network'
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listContainer: {
        flex: 1,
        marginHorizontal: 18
    },
    screen: {
        flex: 1,
        width: DEVICE_WIDTH - 36,
        borderWidth: 3,
        borderRadius: 8
    },
    nextButton: {
        marginBottom: 40,
        marginTop: 30
    }
});

export default class OnboardingScreen extends Component {
    static propTypes = {
        onPressDone: PropTypes.func
    }

    static defaultProps = {
        onPressDone: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        };

        this.handlePressNext = this.handlePressNext.bind(this);
        this.renderOnboardingScreen = this.renderOnboardingScreen.bind(this);
    }

    handlePressNext() {
        const { index } = this.state;
        const nextIndex = index + 1;
        if (nextIndex < ONBOARDING_SCREENS.length) {
            this.list.scrollToIndex({ index: nextIndex });
            this.setState({
                index: nextIndex
            });
        }
    }

    renderOnboardingScreen({ item }) {
        let screenContent = null;
        switch (item.key) {
            case 'userType':
                screenContent = <Text>0</Text>;
                break;
            case 'info':
                screenContent = <Text>1</Text>
                break;
            case 'allergens':
                screenContent = <Text>2</Text>
                break;
            case 'peakFlow':
                screenContent = <Text>3</Text>
                break;
            case 'network':
                screenContent = <Text>4</Text>
                break;
            default:
                screenContent = null;
        }

        return (
            <View style={styles.screen}>
                {screenContent}
            </View>
        )
    }

    render() {
        const { onPressDone } = this.props;
        const { index } = this.state;
        const isLastScreen = index === ONBOARDING_SCREENS.length - 1;

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <FlatList
                        data={ONBOARDING_SCREENS.map(key => ({ key }))}
                        renderItem={this.renderOnboardingScreen}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        ref={component => this.list = component}
                        style={styles.container}
                    />
                    <Button
                        onPress={isLastScreen ? onPressDone : this.handlePressNext}
                        label={isLastScreen ? 'DONE' : 'NEXT'}
                        style={styles.nextButton}
                    />
                </View>
            </View>
        );
    }
}
