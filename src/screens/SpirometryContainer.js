import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { loggedInUserQuery } from '../graphql/queries';
import { createReportMutation } from '../graphql/mutations';
import SpirometryScreen from './SpirometryScreen';

const mapLoggedInUserQueryToProps = ({ data: { loading, user } }) => ({
    patientId: loading || !user ? null : user.patient.id,
    reports: loading || !user ? [] : user.patient.reports
});

const mapCreateReportMutationToProps = ({ mutate }) => ({
    createReport: (patientId, fev1) => {
        mutate({
            variables: {
                patientId,
                fev1
            },
            refetchQueries: [{
                query: loggedInUserQuery
            }]
        });
    }
});

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    reports: ownProps.reports.map((report) => {
        const date = new Date(report.createdAt);
        return {
            id: report.id,
            date: `${date.getMonth() + 1}/${date.getDate()}/${date.getYear() + 1900}`,
            fev1: report.fev1
        };
    }),
    onPressSave: (fev1) => {
        ownProps.createReport(ownProps.patientId, parseFloat(fev1));
        ownProps.navigation.goBack();
    }
});

export default compose(
    graphql(loggedInUserQuery, { props: mapLoggedInUserQueryToProps }),
    graphql(createReportMutation, { props: mapCreateReportMutationToProps }),
    connect(mapStateToProps, undefined, mergeProps)
)(SpirometryScreen);
