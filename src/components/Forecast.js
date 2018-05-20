import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ViewPropTypes,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';

const styles = StyleSheet.create({
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: colors.grayText,
        paddingBottom: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 16,
        color: colors.grayText
    },
    entryContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 32
    },
    entryText: {
        fontSize: 16,
        color: colors.grayText,
        marginBottom: 10
    },
    indicator: {
        height: 20,
        width: 20,
        borderRadius: 20,
        marginBottom: 10
    }
});

export default class Forecast extends Component {
    static propTypes = {
        title: PropTypes.string,
        entries: PropTypes.arrayOf(PropTypes.shape({
            topText: PropTypes.string,
            color: PropTypes.string,
            bottomText: PropTypes.string
        })),
        style: ViewPropTypes.style
    }

    static defaultProps = {
        title: null,
        entries: [],
        style: null
    }

    render() {
        const { title, entries, style } = this.props;

        const entryElements = entries.map(entry => (
            <View key={entry.topText} style={styles.entryContainer}>
                <Text style={styles.entryText}>{entry.topText}</Text>
                <View style={[styles.indicator, { backgroundColor: entry.color }]} />
                <Text style={styles.entryText}>{entry.bottomText}</Text>
            </View>
        ));

        return (
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <ScrollView
                    style={style}
                    horizontal
                >
                    {entryElements}
                </ScrollView>
            </View>
        );
    }
}
