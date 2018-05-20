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
        alignItems: 'center'
    },
    title: {
        color: colors.primary,
        fontSize: 24,
        flex: 1
    },
    lungs: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
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
                  <Text style={styles.title}>My CarePlan</Text>
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
              </View>
          </View>
      );
  }
}
