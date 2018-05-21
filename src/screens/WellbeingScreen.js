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
        width: 200
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
                  <View style={styles.heart}>
                      <TouchableOpacity onPress={this.YellowHeartPress}>
                          <ImageBackground
                              style={{
                                  width: 98,
                                  height: 135,
                              }}
                              source={yellowHeart}
                          >
                              <TouchableOpacity onPress={this.RedHeartPress}>
                                  <Image
                                      style={{
                                          width: 90,
                                          height: 120,
                                          marginLeft: -43,
                                          marginTop: -20,
                                      }}
                                      source={redHeart}
                                  />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={this.GreenHeartPress}>
                                  <Image
                                      style={{
                                          width: 90,
                                          height: 120,
                                          marginLeft: 47,
                                          marginTop: -121,
                                      }}
                                      source={greenHeart}
                                  />
                              </TouchableOpacity>
                          </ImageBackground>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      );
  }
}
