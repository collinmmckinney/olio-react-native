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
    }
});

export default class ScrollSelect extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            color: PropTypes.string,
            image: PropTypes.string
        })),
        selectedLabels: PropTypes.arrayOf(PropTypes.string),
        onRowPress: PropTypes.func,
        style: ViewPropTypes.style
    }

    static defaultProps = {
        options: [],
        selectedLabels: [],
        onRowPress: () => {},
        style: null
    }

    constructor(props) {
        super(props);

        this.handleRowPress = this.handleRowPress.bind(this);
    }

    handleRowPress(label) {
        this.props.onRowPress(label);
    }

    render() {
        const { options, selectedLabels, style } = this.props;

        const optionRows = options.map((option) => {
            const colorStyle = { backgroundColor: colors.primary };
            const rowStyle = selectedLabels.indexOf(option.label) > -1 ?
                [styles.optionRow, colorStyle] : styles.optionRow;
            return (
                <TouchableOpacity
                    key={option.label}
                    onPress={() => this.handleRowPress(option.label)}
                >
                    <View style={rowStyle}>
                        <StaticBubble
                            style={{ backgroundColor: option.color }}
                        />
                        <Text>{option.label}</Text>
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
