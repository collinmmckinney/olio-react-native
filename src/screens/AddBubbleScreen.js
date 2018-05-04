import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';
import {
    Button,
    TextInput,
    ScrollView,
    StaticBubble
} from '../components';

const BUBBLE_OPTIONS = [
    {
        label: 'Exercise-Induced',
        color: colors.primary,
        image: null
    },
    {
        label: 'Weather-Induced',
        color: colors.primary,
        image: null
    },
    {
        label: 'Allergen-Induced',
        color: colors.primary,
        image: null
    },
    {
        label: 'Peak Flow',
        color: colors.primary,
        image: null
    },
    {
        label: 'Other1',
        color: colors.primary,
        image: null
    },
    {
        label: 'Other2',
        color: colors.primary,
        image: null
    },
    {
        label: 'Other3',
        color: colors.primary,
        image: null
    },
    {
        label: 'Other4',
        color: colors.primary,
        image: null
    }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderColor: colors.primary,
        borderWidth: 4,
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingBottom: 18
    },
    scrollViewContent: {
        alignItems: 'stretch'
    },
    bubbleRow: {
        height: 74,
        flexDirection: 'row',
        alignItems: 'center'
    },
    saveButton: {
        marginTop: 18
    }
});

export default class AddBubbleScreen extends Component {
    static propTypes = {
        onSave: PropTypes.func
    };

    static defaultProps = {
        onSave: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            bubbles: []
        };

        this.handleSave = this.handleSave.bind(this);
    }

    handleBubblePress(label) {
        const { bubbles } = this.state;
        this.setState({
            bubbles: bubbles.concat(label)
        });
    }

    handleSave() {
        this.props.onSave(this.state.bubbles);
    }

    render() {
        const { bubbles } = this.state;
        const bubbleRows = BUBBLE_OPTIONS.map((bubble) => {
            const colorStyle = { backgroundColor: colors.primary };
            const style = bubbles.indexOf(bubble.label) > -1 ?
                [styles.bubbleRow, colorStyle] : styles.bubbleRow;
            return (
                <TouchableOpacity
                    key={bubble.label}
                    onPress={() => this.handleBubblePress(bubble.label)}
                >
                    <View style={style}>
                        <StaticBubble
                            style={{ backgroundColor: bubble.color }}
                        />
                        <Text>{bubble.label}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {bubbleRows}
                </ScrollView>
                <Text>Search for your own</Text>
                <TextInput />
                <Button label="SAVE" onPress={this.handleSave} style={styles.saveButton} />
            </View>
        );
    }
}
