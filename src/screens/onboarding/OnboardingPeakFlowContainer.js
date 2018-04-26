import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../../graphql/queries';
import { createReportMutation } from '../../graphql/mutations';
import OnboardingPeakFlowScreen from './OnboardingPeakFlowScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    patientId: loading || !user ? null : user.patient.id
});

const mapCreateReportMutationToProps = ({ mutate }) => ({
    createReport: (patientId, form) => {
        mutate({
            variables: {
                patientId,
                fev1: form.fev1,
                fvc: form.fvc
            },
            refetchQueries: [{
                query: loggedInUserQuery
            }]
        });
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    onPressNext: (form) => {
        ownProps.createReport(ownProps.patientId, {
            fev1: parseFloat(form.fev1),
            fvc: parseFloat(form.fvc)
        });
        ownProps.navigation.navigate('OnboardingNetwork');
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(createReportMutation, { props: mapCreateReportMutationToProps }),
    connect(undefined, undefined, mergeProps)
)(OnboardingPeakFlowScreen);
