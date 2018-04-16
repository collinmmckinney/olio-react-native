import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import MapFiltersScreen from './MapFiltersScreen';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default compose(
    graphql(loggedInUserQuery),
    connect(mapStateToProps, mapDispatchToProps)
)(MapFiltersScreen);
