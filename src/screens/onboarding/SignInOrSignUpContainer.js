import { connect } from 'react-redux';
import SignInOrSignUpScreen from './SignInOrSignUpScreen';

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressSignIn: () => {
        ownProps.navigation.navigate('SignIn');
    },
    onPressSignUp: () => {
        ownProps.navigation.navigate('SignUp');
    }
});

export default connect(undefined, undefined, mergeProps)(SignInOrSignUpScreen);
