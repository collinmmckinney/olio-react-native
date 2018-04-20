import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import AvatarScreen from './AvatarScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        bubbles: [
            {
                radius: 60,
                label: 'Map',
                onPress: () => { ownProps.navigation.navigate('Map'); }
            }
        ]
    };
};

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    connect(undefined, undefined, mergeProps)
)(AvatarScreen);
