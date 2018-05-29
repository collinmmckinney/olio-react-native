import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

const redHeart = require('../assets/redHeart.png');
const greenHeart = require('../assets/greenHeart.png');
const yellowHeart = require('../assets/yellowHeart.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8
    },
    inner: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 24,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: colors.primary,
        fontSize: 24,
        flex: 1
    },
    heart: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200
    },
    upperText: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    lowerText: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    redContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        backgroundColor: colors.heartRed,
        borderRadius: 5,
        marginRight: 30
    },
    greenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        backgroundColor: colors.green,
        borderRadius: 5,
        marginLeft: 30
    },
    yellowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        backgroundColor: colors.yellow,
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 18,
    }
});

export default class WellbeingScreen extends Component {
  static propTypes = {
      onRedHeartPress: PropTypes.func,
      onYellowHeartPress: PropTypes.func,
      onGreenHeartPress: PropTypes.func,
  };

  static defaultProps = {
      onRedHeartPress: () => {},
      onYellowHeartPress: () => {},
      onGreenHeartPress: () => {},
  };

  constructor(props) {
      super(props);

      this.RedHeartPress = this.RedHeartPress.bind(this);
      this.YellowHeartPress = this.YellowHeartPress.bind(this);
      this.GreenHeartPress = this.GreenHeartPress.bind(this);
  }

  RedHeartPress() {
      this.props.onRedHeartPress();
  }

  YellowHeartPress() {
      this.props.onYellowHeartPress();
  }

  GreenHeartPress() {
      this.props.onGreenHeartPress();
  }

  render() {
      return (
          <View style={styles.container}>
              <View style={styles.inner}>
                  <Text style={styles.title}>My Wellbeing</Text>
                  <View style={styles.upperText}>
                      <TouchableOpacity onPress={this.RedHeartPress}>
                          <View style={styles.redContainer}>
                              <Text style={styles.text}>  @now  </Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.GreenHeartPress}>
                          <View style={styles.greenContainer}>
                              <Text style={styles.text}>  about me  </Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.heart}>
                      <ImageBackground
                          style={{
                              width: 98,
                              height: 135,
                          }}
                          source={yellowHeart}
                      >
                          <Image
                              style={{
                                  width: 90,
                                  height: 120,
                                  marginLeft: -43,
                                  marginTop: -20,
                              }}
                              source={redHeart}
                          />
                          <Image
                              style={{
                                  width: 90,
                                  height: 120,
                                  marginLeft: 47,
                                  marginTop: -121,
                              }}
                              source={greenHeart}
                          />
                      </ImageBackground>
                  </View>
                  <View style={styles.lowerText}>
                      <TouchableOpacity onPress={this.YellowHeartPress}>
                          <View style={styles.yellowContainer}>
                              <Text style={styles.text}>  evals  </Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      );
  }
}
