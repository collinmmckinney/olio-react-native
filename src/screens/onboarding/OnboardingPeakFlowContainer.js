import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import { createReportMutation } from '../../graphql/mutations';
import OnboardingPeakFlowScreen from './OnboardingPeakFlowScreen';

const mapStateToProps = (state, ownProps) => {
    return {
        onPressNext: (form) => {
            ownProps.createReport({
                variables: {
                    patientId: ownProps.data.user.patient.id,
                    fev1: parseFloat(form.fev1),
                    fvc: parseFloat(form.fvc)
                }
            });
            ownProps.navigation.navigate('OnboardingNetwork');
        }
    };
};

export default compose(
    graphql(loggedInUserQuery),
    graphql(createReportMutation, { name: 'createReport' }),
    connect(mapStateToProps)
)(OnboardingPeakFlowScreen);
