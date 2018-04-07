import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const OPTIONS = [
    'bees',
    'pollen',
    'animals',
    'insects',
    'mold',
    'peanuts',
    'smoke',
    'other',
    'add'
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 18,
        paddingVertical: 24
    },
    item: {
        width: 80,
        height: 80,
        marginTop: 40,
        backgroundColor: 'red'
    }
});

export default class AllergenSelect extends Component {
    static propTypes = {
        onChange: PropTypes.func
    }

    static defaultProps = {
        onChange: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedItems: []
        };
    }

    handleItemPress(key) {
        const { onChange } = this.props;
        const { selectedItems } = this.state;
        const newSelectedItems = selectedItems.slice();
        const keyIndex = newSelectedItems.indexOf(key);
        if (keyIndex > -1) {
            newSelectedItems.splice(keyIndex, 1);
        } else {
            newSelectedItems.push(key);
        }
        this.setState({ selectedItems: newSelectedItems });
        onChange(newSelectedItems);
    }

    render() {
        const { selectedItems } = this.state;

        const elements = OPTIONS.map((key) => {
            const style = [
                styles.item,
                { backgroundColor: selectedItems.indexOf(key) > -1 ? 'blue' : 'red' }
            ];
            return (
                <TouchableOpacity
                    key={key}
                    onPress={() => this.handleItemPress(key)}
                    style={style}
                />
            );
        });

        return (
            <View style={styles.container}>
                {elements}
            </View>
        );
    }
}
