import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import EvalsScreen from './EvalsScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onHealthPlanPress: () => ownProps.navigation.navigate('HealthPlan'),
});

export default compose(
    withApollo,
    connect(mapStateToProps, undefined, mergeProps)
)(EvalsScreen);
