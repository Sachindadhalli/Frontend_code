import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// import './styles.scss';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
// import CollapsibleComponent from '../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
// import CollapsibleComponentUserProfile from '../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import IconValueComponent from '../../../../components/ReusableComponents/IconValueComponent/IconValueComponent';
import workExpIcon from '../../../../../assets/media/icons/work-exp.svg';
import company from '../../../../../assets/media/icons/company.svg';
import clock from '../../../../../assets/media/icons/clock.svg';
import Moment from 'react-moment';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});
class ExperiencedView extends Component {
    render() {
        const { employment_details, fresher_experienced, training_internship } = this.props;
        return (
            <div className="basic-details-main-container">

                {/* {fresher_experienced == false ? (
                    <div>
                        {employment_details.map((values, index) => {
                            return (
                                <div className="main-div-experienced">
                                    <div className="experiance-employment">
                                        <Grid container spacing={16}>
                                            <Grid item xs={12} md={4}>
                                                <IconValueComponent iconName={workExpIcon} text={values.job_title} />
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <IconValueComponent
                                                    iconName={company}
                                                    text={
                                                        values.currently_working
                                                            ? values.organization + ' ( Currently working here )'
                                                            : values.organization
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={16}>
                                            <Grid item xs={12} md={12}>
                                                <LabelValueComponent
                                                    label="Roles and Responsibilities"
                                                    value={values.roles}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={16}>
                                            <Grid item xs={12} md={4}>
                                                <LabelValueComponent label="Notice Period" value={values.notice_period} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <LabelValueComponent
                                                    label="Last working day"
                                                    value={<Moment format="Do MMM YYYY">
                                                        {new Date(values.last_working_day)}
                                                    </Moment>
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={16}>
                                            <Grid item xs={12} md={4}>
                                                <LabelValueComponent
                                                    label="Next Employer"
                                                    value={values.next_employer}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <LabelValueComponent
                                                    value={values.buy_out_option ? '( I have a buy-out option )' : null}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                        <div className="main-container-div">
                            {training_internship.internship.length !== 0 ? <div className="fresher-internship"><div className="title-for-internship-fresher">Internship</div>
                                <div className="fresher-internship-content">
                                    <div>
                                        {training_internship.internship.map((values, index) => {
                                            return (
                                                <div>
                                                    <Grid container spacing={16}>
                                                        <Grid item xs={12} md={8}>
                                                            <IconValueComponent
                                                                iconName={workExpIcon}
                                                                text={values.role + ' at ' + values.company}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <IconValueComponent
                                                                iconName={clock}
                                                                text={
                                                                    <span>
                                                                        {values.tenure_in_years
                                                                            ? values.tenure_in_years + ' Year '
                                                                            : ''}
                                                                        {values.tenure_in_months
                                                                            ? values.tenure_in_months + ' Months '
                                                                            : ''}
                                                                    </span>
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div> : <div>
                                </div>}
                            {training_internship.training.length !== 0 ? <div className="fresher-traning">
                                <div className="title-for-training-fresher">Training</div>
                                <div className="fresher-traning-content">
                                    <div>
                                        {training_internship.training.map((values, index) => {
                                            return (
                                                <div>
                                                    <Grid container spacing={16}>
                                                        <Grid item xs={12} md={8}>
                                                            <IconValueComponent
                                                                iconName={workExpIcon}
                                                                text={values.name + ' from ' + values.institute}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <IconValueComponent
                                                                iconName={clock}
                                                                text={
                                                                    <div>
                                                                        <Moment format="MMM YYYY">{new Date(values.start_date)}</Moment>
                                                                        {' - '}
                                                                        <Moment format="MMM YYYY">{new Date(values.end_date)}</Moment>
                                                                    </div>
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div> : <div>
                                </div>} */}
                            {employment_details.length !== 0 ? <div className="main-div-experienced">
                                {/*<div className="title-for-fresher-employment"> Employment</div>*/}
                                <div>
                                    {employment_details.map((values, index) => {
                                        return (
                                            <div className="fresher-employment">
                                                <Grid container spacing={16}>
                                                    <Grid item xs={12} md={4}>
                                                        <IconValueComponent iconName={workExpIcon} text={values.job_title ? values.job_title : "-"} />
                                                    </Grid>
                                                    <Grid item xs={12} md={8}>
                                                        <IconValueComponent
                                                            iconName={company}
                                                            text={values.organization ?
                                                                values.currently_working
                                                                    ? values.organization + ' ( Currently working here )'
                                                                    : values.organization : "-"
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item xs={12} md={6}>
                                                        <LabelValueComponent
                                                            label="Roles and Responsibilities"
                                                            value={values.roles ? values.roles : "-"}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item xs={12} md={4}>
                                                        <LabelValueComponent
                                                            label="Notice Period"
                                                            value={values.notice_period ? values.notice_period : "-"}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <LabelValueComponent
                                                            label="Last working day"
                                                            value={values.last_working_day ? values.last_working_day : "-"}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={16}>
                                                    <Grid item xs={12} md={4}>
                                                        <LabelValueComponent
                                                            label="Next Employer"
                                                            value={values.next_employer ? values.next_employer : "-"}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <LabelValueComponent
                                                            value={values.buy_out_option ? '( I have a buy-out option )' : null}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                                : <div>
                                </div>}
                        </div>
                    // )}
            // </div>
        );
    }
}

export default withStyles(styles)(ExperiencedView);