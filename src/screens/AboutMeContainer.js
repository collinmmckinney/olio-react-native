import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import AboutMeScreen from './AboutMeScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onAppleADayPress: () => ownProps.navigation.navigate('AppleADay'),
});

export default compose(
    withApollo,
    connect(mapStateToProps, undefined, mergeProps)
)(AboutMeScreen);
