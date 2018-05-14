import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Foundation';
import { AddButton, Bubble } from '../components';

const girlImage = require('../assets/girl.png');
const lungImage = require('../assets/whiteLungs.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    avatarContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    heart: {
        marginLeft: 120,
        marginTop: 155,
    },
    lungs: {
        marginLeft: 75,
        marginTop: 0,
    },
    addButton: {
        position: 'absolute',
        top: 13,
        right: 13
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
        onUserLocationChange: PropTypes.func.isRequired,
        onHeartPress: PropTypes.func,
        onLungsPress: PropTypes.func,
        onBubblePress: PropTypes.func,
        onBubbleLongPress: PropTypes.func,
        onBubbleDragStop: PropTypes.func,
        onBubbleResize: PropTypes.func,
        onBubbleDeletePress: PropTypes.func,
        onAddButtonPress: PropTypes.func,
        onCloseButtonPress: PropTypes.func
    };

    static defaultProps = {
        bubbles: [],
        arrangeMode: false,
        onHeartPress: () => {},
        onLungsPress: () => {},
        onBubblePress: () => {},
        onBubbleLongPress: () => {},
        onBubbleDragStop: () => {},
        onBubbleResize: () => {},
        onBubbleDeletePress: () => {},
        onAddButtonPress: () => {},
        onCloseButtonPress: () => {}
    };

    constructor(props) {
        super(props);

        this.handleHeartPress = this.handleHeartPress.bind(this);
        this.handleLungsPress = this.handleLungsPress.bind(this);
        this.handleBubblePress = this.handleBubblePress.bind(this);
        this.handleBubbleLongPress = this.handleBubbleLongPress.bind(this);
        this.handleBubbleDragStop = this.handleBubbleDragStop.bind(this);
        this.handleBubbleResize = this.handleBubbleResize.bind(this);
        this.handleBubbleDeletePress = this.handleBubbleDeletePress.bind(this);
        this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
        this.handleCloseButtonPress = this.handleCloseButtonPress.bind(this);
    }

    componentWillMount() {
        navigator.geolocation.requestAuthorization();
        this.locationWatchId = navigator.geolocation.watchPosition((location) => {
            this.handleUserLocationChange(location);
        }, (error) => {
            console.log(error);
        }, { enableHighAccuracy: true });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.locationWatchId);
    }

    handleUserLocationChange(location) {
        const { onUserLocationChange } = this.props;
        onUserLocationChange(location);
    }

    handleHeartPress() {
        this.props.onHeartPress();
    }

    handleLungsPress() {
        this.props.onLungsPress();
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

    handleBubbleResize(id, delta) {
        this.props.onBubbleResize(id, delta);
    }

    handleBubbleDeletePress(id) {
        this.props.onBubbleDeletePress(id);
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
                onPress={(id) => {
                    bubble.onPress();
                    this.handleBubblePress(id);
                }}
                onLongPress={this.handleBubbleLongPress}
                onStopInteraction={this.handleBubbleDragStop}
                onResize={this.handleBubbleResize}
                onDeletePress={this.handleBubbleDeletePress}
            />
        ));

        return (
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <ImageBackground
                        source={girlImage}
                        style={{
                            width: 200,
                            height: 250,
                            flexDirection: 'column'
                        }}
                    >
                        <TouchableOpacity style={styles.heart} onPress={this.handleHeartPress}>
                            <Icon name="heart" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.lungs} onPress={this.handleLungsPress}>
                            <Image style={{ width: 50, height: 52 }} source={lungImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                {bubbleElements}
                <View style={styles.addButton}>
                    <AddButton
                        close={arrangeMode}
                        onAddPress={this.handleAddButtonPress}
                        onClosePress={this.handleCloseButtonPress}
                    />
                </View>
            </View>
        );
    }
}
