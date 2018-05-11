import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../style';
import {
    Button,
    TextInput,
    ScrollSelect
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

        this.handleBubblePress = this.handleBubblePress.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleBubblePress(label) {
        const { bubbles } = this.state;
        const updatedBubbles = bubbles.slice();
        const i = bubbles.indexOf(label);
        if (i > -1) {
            updatedBubbles.splice(i, 1);
        } else {
            updatedBubbles.push(label);
        }
        this.setState({
            bubbles: updatedBubbles
        });
    }

    handleSave() {
        this.props.onSave(this.state.bubbles);
    }

    render() {
        const { bubbles } = this.state;

        return (
            <View style={styles.container}>
                <ScrollSelect
                    options={BUBBLE_OPTIONS}
                    selectedLabels={bubbles}
                    onRowPress={this.handleBubblePress}
                />
                <Text>Search for your own</Text>
                <TextInput />
                <Button label="SAVE" onPress={this.handleSave} style={styles.saveButton} />
            </View>
        );
    }
}
