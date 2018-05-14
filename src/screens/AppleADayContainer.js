import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import AppleADayScreen from './AppleADayScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {};
};

export default compose(
    withApollo,
    connect(mapStateToProps, undefined, mergeProps)
)(AppleADayScreen);
