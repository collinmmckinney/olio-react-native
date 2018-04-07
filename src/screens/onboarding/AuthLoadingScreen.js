import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default class AuthLoadingScreen extends Component {
    static propTypes = {
        isUserNull: PropTypes.bool,
        isUserAuthenticated: PropTypes.bool,
        onNullUser: PropTypes.func,
        onAuthenticatedUser: PropTypes.func
    };

    static defaultProps = {
        isUserNull: false,
        isUserAuthenticated: false,
        onNullUser: () => {},
        onAuthenticatedUser: () => {}
    };

    constructor(props) {
        super(props);
        const {
            isUserNull,
            isUserAuthenticated,
            onNullUser,
            onAuthenticatedUser
        } = props;
        if (isUserNull) {
            onNullUser();
        } else if (isUserAuthenticated) {
            onAuthenticatedUser();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            isUserNull,
            isUserAuthenticated,
            onNullUser,
            onAuthenticatedUser
        } = this.props;
        if (!isUserNull && nextProps.isUserNull) {
            onNullUser();
        } else if (!isUserAuthenticated && nextProps.isUserAuthenticated) {
            onAuthenticatedUser();
        }
    }

    render() {
        return (
            <View style={styles.container} />
        );
    }
}
