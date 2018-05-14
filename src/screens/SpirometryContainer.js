import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import SpirometryScreen from './SpirometryScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {};
};

export default compose(
    withApollo,
    connect(mapStateToProps, undefined, mergeProps)
)(SpirometryScreen);
