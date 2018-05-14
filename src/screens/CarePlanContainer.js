import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import CarePlanScreen from './CarePlanScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onPurpLungPress: () => ownProps.navigation.navigate('Medications'),
    onBlueLungPress: () => ownProps.navigation.navigate('AsthmaCare'),
});

export default compose(
    withApollo,
    connect(mapStateToProps, undefined, mergeProps)
)(CarePlanScreen);
