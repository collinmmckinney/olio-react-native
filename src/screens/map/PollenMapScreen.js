import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors, sizes } from '../../style';
import { MapLongButton } from '../../components';

const SEVERITY_TO_BUBBLES = {
    Low: 5,
    Moderate: 15,
    High: 30
};
const BUBBLE_DIAMETER = 30;

function initializeBubbles(windDirection, severity) {
    const numberOfBubbles = SEVERITY_TO_BUBBLES[severity];
    const bubbles = [];
    for (let i = 0; i < numberOfBubbles; i += 1) {
        let top;
        let left;
        if (windDirection === 'N') {
            top = sizes.DEVICE_HEIGHT + BUBBLE_DIAMETER;
            left = Math.random() * (sizes.DEVICE_WIDTH - BUBBLE_DIAMETER);
        } else if (windDirection === 'E') {
            top = Math.random() * (sizes.DEVICE_HEIGHT - BUBBLE_DIAMETER);
            left = -BUBBLE_DIAMETER;
        } else if (windDirection === 'S') {
            top = -BUBBLE_DIAMETER;
            left = Math.random() * (sizes.DEVICE_WIDTH - BUBBLE_DIAMETER);
        } else if (windDirection === 'W') {
            top = Math.random() * (sizes.DEVICE_HEIGHT - BUBBLE_DIAMETER);
            left = sizes.DEVICE_WIDTH + BUBBLE_DIAMETER;
        } else if (windDirection === 'NE') {
            top = (Math.random() * (2 * sizes.DEVICE_HEIGHT)) + (0.5 * sizes.DEVICE_HEIGHT);
            left = (Math.random() * (2 * sizes.DEVICE_WIDTH)) - (0.5 * sizes.DEVICE_WIDTH);
        } else if (windDirection === 'SE') {
            top = (Math.random() * (2 * sizes.DEVICE_HEIGHT)) - (0.5 * sizes.DEVICE_HEIGHT);
            left = (Math.random() * (2 * sizes.DEVICE_WIDTH)) - (0.5 * sizes.DEVICE_WIDTH);
        } else if (windDirection === 'SW') {
            top = (Math.random() * (2 * sizes.DEVICE_HEIGHT)) - (0.5 * sizes.DEVICE_HEIGHT);
            left = (Math.random() * (2 * sizes.DEVICE_WIDTH)) + (0.5 * sizes.DEVICE_WIDTH);
        } else if (windDirection === 'NW') {
            top = (Math.random() * (2 * sizes.DEVICE_HEIGHT)) + (0.5 * sizes.DEVICE_HEIGHT);
            left = (Math.random() * (2 * sizes.DEVICE_WIDTH)) + (0.5 * sizes.DEVICE_WIDTH);
        }
        bubbles.push({
            top: new Animated.Value(top),
            left: new Animated.Value(left)
        });
    }
    return bubbles;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bubble: {
        position: 'absolute',
        width: BUBBLE_DIAMETER,
        height: BUBBLE_DIAMETER,
        borderRadius: BUBBLE_DIAMETER,
        backgroundColor: colors.primary
    },
    button: {
        position: 'absolute',
        left: (sizes.DEVICE_WIDTH / 2) - 53,
        bottom: 20
    }
});

export default class PollenMapScreen extends Component {
    static propTypes = {
        userLocation: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number
        }),
        mapRegion: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            latitudeDelta: PropTypes.number,
            longitudeDelta: PropTypes.number
        }),
        windDirection: PropTypes.oneOf(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']),
        severity: PropTypes.oneOf(['Low', 'Moderate', 'High']),
        onMapRegionChange: PropTypes.func.isRequired,
        fetchPollen: PropTypes.func.isRequired
    };

    static defaultProps = {
        userLocation: {
            latitude: null,
            longitude: null
        },
        mapRegion: {
            latitude: null,
            longitude: null,
            latitudeDelta: null,
            longitudeDelta: null
        },
        windDirection: 'S',
        severity: 'low'
    };

    constructor(props) {
        super(props);

        const bubbles = initializeBubbles(props.windDirection, props.severity);
        this.state = { bubbles };

        this.initiatePollenAnimation = this.initiatePollenAnimation.bind(this);
        this.handleMapRegionChange = this.handleMapRegionChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchPollen();
    }

    componentWillReceiveProps(nextProps) {
        const bubbles = initializeBubbles(nextProps.windDirection, nextProps.severity);
        this.setState({ bubbles }, () => {
            if (bubbles.length > 0) {
                this.initiatePollenAnimation();
            }
        });
    }

    initiatePollenAnimation() {
        const { windDirection } = this.props;
        const { bubbles } = this.state;
        bubbles.forEach((bubble) => {
            if (windDirection === 'N') {
                Animated.timing(bubble.top, {
                    toValue: -BUBBLE_DIAMETER,
                    duration: 12000 - (Math.random() * 8000)
                }).start();
            } else if (windDirection === 'E') {
                Animated.timing(bubble.left, {
                    toValue: sizes.DEVICE_WIDTH + BUBBLE_DIAMETER,
                    duration: 12000 - (Math.random() * 8000)
                }).start();
            } else if (windDirection === 'S') {
                Animated.timing(bubble.top, {
                    toValue: sizes.DEVICE_HEIGHT + BUBBLE_DIAMETER,
                    duration: 12000 - (Math.random() * 8000)
                }).start();
            } else if (windDirection === 'W') {
                Animated.timing(bubble.left, {
                    toValue: -BUBBLE_DIAMETER,
                    duration: 12000 - (Math.random() * 8000)
                }).start();
            } else if (windDirection === 'NE') {
                Animated.timing(bubble.left, {
                    toValue: bubble.left._value + (3 * sizes.DEVICE_WIDTH),
                    duration: 22000 - (Math.random() * 8000)
                }).start();
                Animated.timing(bubble.top, {
                    toValue: bubble.top._value - (3 * sizes.DEVICE_HEIGHT),
                    duration: 22000 - (Math.random() * 8000)
                }).start();
            } else if (windDirection === 'SE') {
                Animated.timing(bubble.left, {
                    toValue: bubble.left._value + (3 * sizes.DEVICE_WIDTH),
                    duration: 22000 - (Math.random() * 8000)
                }).start();
                Animated.timing(bubble.top, {
                    toValue: bubble.top._value + (3 * sizes.DEVICE_HEIGHT),
                    duration: 22000 - (Math.random() * 8000)
                }).start();
            } else if (windDirection === 'SW') {
                Animated.timing(bubble.left, {
                    toValue: bubble.left._value - (3 * sizes.DEVICE_WIDTH),
                    duration: 22000 - (Math.random() * 8000)
                }).start();
                Animated.timing(bubble.top, {
                    toValue: bubble.top._value + (3 * sizes.DEVICE_HEIGHT),
                    duration: 22000 - (Math.random() * 8000)
                }).start();
            } else if (windDirection === 'NW') {
                Animated.timing(bubble.left, {
                    toValue: bubble.left._value - (3 * sizes.DEVICE_WIDTH),
                    duration: 22000 - (Math.random() * 8000)
                }).start();
                Animated.timing(bubble.top, {
                    toValue: bubble.top._value - (3 * sizes.DEVICE_HEIGHT),
                    duration: 22000 - (Math.random() * 8000)
                }).start();
            }
        });
    }

    handleMapRegionChange(mapRegion) {
        this.props.onMapRegionChange(mapRegion);
    }

    render() {
        const {
            userLocation,
            mapRegion,
        } = this.props;
        const { bubbles } = this.state;


        const bubbleElements = bubbles.map(bubble => (
            <Animated.View
                key={Math.random()}
                style={[styles.bubble, { top: bubble.top, left: bubble.left }]}
            />
        ));

        // TODO Don't let user move pollen cam
        return (
            <View style={styles.container}>
                { !!userLocation.latitude && !!mapRegion.latitude &&
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation
                        showsMyLocationButton
                        initialRegion={mapRegion}
                        onRegionChange={this.handleMapRegionChange}
                        style={styles.container}
                    />
                }
                {bubbleElements}
                <MapLongButton
                    label="POLLEN CAM"
                    style={styles.button}
                    onPress={() => {
                        const newBubbles =
                            initializeBubbles(this.props.windDirection, this.props.severity);
                        this.setState({ bubbles: newBubbles }, () => {
                            if (newBubbles.length > 0) {
                                this.initiatePollenAnimation();
                            }
                        });
                    }}
                />
            </View>
        );
    }
}
