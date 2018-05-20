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

const OPTIONS = [
    {
        key: 'weather',
        label: 'Weather-Induced',
        color: colors.primary,
        image: 'weather'
    },
    {
        key: 'allergen',
        label: 'Allergen-Induced',
        color: colors.primary,
        image: 'map'
    },
    {
        key: 'flow',
        label: 'Spirometry',
        color: colors.primary,
        image: 'spirometry'
    },
    {
        key: 'airQuality',
        label: 'Air Quality',
        color: colors.primary,
        image: 'airQuality'
    },
    {
        key: 'home',
        label: 'Household',
        color: colors.primary,
        image: 'household'
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
    row: {
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
            selected: []
        };

        this.handleRowPress = this.handleRowPress.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleRowPress(key) {
        const { selected } = this.state;
        const updatedSelected = selected.slice();
        const i = selected.indexOf(key);
        if (i > -1) {
            updatedSelected.splice(i, 1);
        } else {
            updatedSelected.push(key);
        }
        this.setState({
            selected: updatedSelected
        });
    }

    handleSave() {
        this.props.onSave(this.state.selected);
    }

    render() {
        const { selected } = this.state;

        return (
            <View style={styles.container}>
                <ScrollSelect
                    options={OPTIONS}
                    selectedKeys={selected}
                    onRowPress={this.handleRowPress}
                />
                <Text>Search for your own</Text>
                <TextInput />
                <Button label="SAVE" onPress={this.handleSave} style={styles.saveButton} />
            </View>
        );
    }
}
