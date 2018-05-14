import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import WellbeingScreen from './WellbeingScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onRedHeartPress: () => ownProps.navigation.navigate('Now'),
    onYellowHeartPress: () => ownProps.navigation.navigate('Evals'),
    onGreenHeartPress: () => ownProps.navigation.navigate('AboutMe'),
});

export default compose(
    withApollo,
    connect(mapStateToProps, undefined, mergeProps)
)(WellbeingScreen);
