import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import AvatarScreen from './AvatarScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    userId: loading || !user ? null : user.id
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    bubbles: [
        {
            subBubbles: [
                {
                    label: '1',
                    onPress: () => { ownProps.navigation.navigate('Map'); }
                },
                {
                    label: '2'
                },
                {
                    label: '3'
                },
                {
                    label: '4'
                },
                {
                    label: '5'
                },
                {
                    label: '6'
                },
                {
                    label: '7'
                },
                {
                    label: '8'
                }
            ],
            initialX: 120,
            initialY: 250,
            radius: 90,
            label: 'Map'
        },
        {
            initialX: 110,
            initialY: 440,
            radius: 70,
            label: 'Sample1'
        },
        {
            initialX: 200,
            initialY: 120,
            radius: 70,
            label: 'Sample2'
        },
        {
            initialX: 50,
            initialY: 50,
            radius: 70,
            label: 'Sample3'
        }
    ]
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    connect(undefined, undefined, mergeProps)
)(AvatarScreen);
