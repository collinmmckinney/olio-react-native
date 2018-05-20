import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ViewPropTypes,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';
import { ScrollView, StaticBubble } from '../components';

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'stretch'
    },
    optionRow: {
        height: 74,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bubble: {
        marginRight: 14
    },
    rowLabel: {
        fontSize: 16,
        color: colors.lightGrayText
    }
});

export default class ScrollSelect extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            label: PropTypes.string,
            color: PropTypes.string,
            image: PropTypes.string
        })),
        selectedKeys: PropTypes.arrayOf(PropTypes.string),
        onRowPress: PropTypes.func,
        style: ViewPropTypes.style
    }

    static defaultProps = {
        options: [],
        selectedKeys: [],
        onRowPress: () => {},
        style: null
    }

    constructor(props) {
        super(props);

        this.handleRowPress = this.handleRowPress.bind(this);
    }

    handleRowPress(key) {
        this.props.onRowPress(key);
    }

    render() {
        const { options, selectedKeys, style } = this.props;

        const optionRows = options.map((option) => {
            const colorStyle = { backgroundColor: colors.primary };
            const rowStyle = selectedKeys.indexOf(option.key) > -1 ?
                [styles.optionRow, colorStyle] : styles.optionRow;
            return (
                <TouchableOpacity
                    key={option.key}
                    onPress={() => this.handleRowPress(option.key)}
                >
                    <View style={rowStyle}>
                        <StaticBubble
                            image={option.image}
                            style={[styles.bubble, { backgroundColor: option.color }]}
                        />
                        <Text style={styles.rowLabel}>{option.label}</Text>
                    </View>
                </TouchableOpacity>
            );
        });

        return (
            <ScrollView
                style={style}
                contentContainerStyle={styles.scrollViewContent}
            >
                {optionRows}
            </ScrollView>
        );
    }
}
