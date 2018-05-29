import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

const blueLung = require('../assets/blueLung.png');
const purpleLung = require('../assets/purpleLung.png');

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
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.primary,
        fontSize: 24,
    },
    lungs: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    upperText: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    lowerText: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    blueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        backgroundColor: '#7cd5c3',
        borderRadius: 5,
    },
    purpleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        backgroundColor: '#9a65cd',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 18,
    }
});

export default class CarePlanScreen extends Component {
  static propTypes = {
      onPurpLungPress: PropTypes.func,
      onBlueLungPress: PropTypes.func,
      onMedicationPress: PropTypes.func,
  };

  static defaultProps = {
      onPurpLungPress: () => {},
      onBlueLungPress: () => {},
      onMedicationPress: () => {},
  };

  constructor(props) {
      super(props);

      this.handlePurpLungPress = this.handlePurpLungPress.bind(this);
      this.handleBlueLungPress = this.handleBlueLungPress.bind(this);
      this.handleMedicationPress = this.handleMedicationPress.bind(this);
  }

  handlePurpLungPress() {
      this.props.onPurpLungPress();
  }

  handleBlueLungPress() {
      this.props.onBlueLungPress();
  }

  handleMedicationPress() {
      this.props.onMedicationPress();
  }

  render() {
      return (
          <View style={styles.container}>
              <View style={styles.inner}>
                  <View style={styles.titleContainer}>
                      <Text style={styles.title}>My CarePlan</Text>
                  </View>
                  <View style={styles.upperText}>
                      <TouchableOpacity onPress={this.handleBlueLungPress}>
                          <View style={styles.blueContainer}>
                              <Text style={styles.text}>  asthma care  </Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.lungs}>
                      <TouchableOpacity onPress={this.handlePurpLungPress} onLongPress={this.handleMedicationPress}>
                          <Image
                              style={{
                                  width: 100,
                                  height: 200,
                              }}
                              source={purpleLung}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.handleBlueLungPress}>
                          <Image
                              style={{
                                  width: 95,
                                  height: 200,
                              }}
                              source={blueLung}
                          />
                      </TouchableOpacity>
                  </View>
                  <View style={styles.lowerText}>
                      <TouchableOpacity onPress={this.handlePurpLungPress}>
                          <View style={styles.purpleContainer}>
                              <Text style={styles.text}>  medications  </Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      );
  }
}
