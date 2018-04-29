import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { AddButton, Bubble } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addButtonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 13,
        paddingRight: 13
    }
});

export default class AvatarScreen extends Component {
    static propTypes = {
        bubbles: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            radius: PropTypes.number,
            label: PropTypes.string,
            onPress: PropTypes.func
        })),
        arrangeMode: PropTypes.bool,
        onBubblePress: PropTypes.func,
        onBubbleLongPress: PropTypes.func,
        onBubbleDragStop: PropTypes.func,
        onAddButtonPress: PropTypes.func,
        onCloseButtonPress: PropTypes.func
    };

    static defaultProps = {
        bubbles: [],
        arrangeMode: false,
        onBubblePress: () => {},
        onBubbleLongPress: () => {},
        onBubbleDragStop: () => {},
        onAddButtonPress: () => {},
        onCloseButtonPress: () => {}
    };

    constructor(props) {
        super(props);

        this.handleBubblePress = this.handleBubblePress.bind(this);
        this.handleBubbleLongPress = this.handleBubbleLongPress.bind(this);
        this.handleBubbleDragStop = this.handleBubbleDragStop.bind(this);
        this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
        this.handleCloseButtonPress = this.handleCloseButtonPress.bind(this);
    }

    handleBubblePress(id) {
        this.props.onBubblePress(id);
    }

    handleBubbleLongPress() {
        this.props.onBubbleLongPress();
    }

    handleBubbleDragStop(id, x, y) {
        this.props.onBubbleDragStop(id, x, y);
    }

    handleAddButtonPress(bubbleType) {
        this.props.onAddButtonPress(bubbleType);
    }

    handleCloseButtonPress() {
        this.props.onCloseButtonPress();
    }

    render() {
        const { bubbles, arrangeMode } = this.props;
        const bubbleElements = bubbles.map(bubble => (
            <Bubble
                key={bubble.id}
                interactable={arrangeMode}
                {...bubble}
                onPress={this.handleBubblePress}
                onLongPress={this.handleBubbleLongPress}
                onStopInteraction={this.handleBubbleDragStop}
            />
        ));

        return (
            <View style={styles.container}>
                <View style={styles.addButtonRow}>
                    <AddButton
                        close={arrangeMode}
                        onAddPress={this.handleAddButtonPress}
                        onClosePress={this.handleCloseButtonPress}
                    />
                </View>
                {bubbleElements}
            </View>
        );
    }
}
