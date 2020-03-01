import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import './styles.scss';
import CollapsibleComponent from '../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import IconValueComponent from '../../../../../components/ReusableComponents/IconValueComponent';
import Clock from '../../../../../../assets/media/icons/clock.svg';
import Location from '../../../../../../assets/media/icons/location.svg';
import Calender from '../../../../../../assets/media/icons/calendar.svg';
import LinkIcon from '../../../../../../assets/media/icons/link.png';
import UserIcon from '../../../../../../assets/media/icons/user.png';
import WorkExperience from '../../../../../../assets/media/icons/work-exp.svg';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';

const styles = theme => ({});

class MyAchievementView extends React.Component {
  render() {
    const { classes, achievements, training_internship } = this.props;
    return (
      <div className="label-value-body">
        <div className="align-in-collapse">
          <div>
            {achievements.online_profile ? (
              <div>
                <div className="head-text-styles">Online Profile</div>
                {achievements.online_profile.map((values, index) => {
                  return (
                    <div className="box-details" key={index}>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={6}>
                            <IconValueComponent iconName={UserIcon} text={values.profile} />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <IconValueComponent iconName={LinkIcon} text={values.url} />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent
                              label={'Role Description'}
                              value={values.description}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div> </div>
            )}
          </div>
          <div>
            {achievements.work_sample ? (
              <div>
                <div className="head-text-styles">Work Sample</div>
                {achievements.work_sample.map((values, index) => {
                  return (
                    <div className="box-details" key={index}>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={6}>
                            <LabelValueComponent label={'Title'} value={values.title} />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <IconValueComponent iconName={LinkIcon} text={values.url} />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        {values.currently_working ? (
                          <Grid container spacing={16}>
                            <Grid item xs={12} md={6}>
                              <LabelValueComponent
                                type={'OnlyText'}
                                value={'I am currently working on this'}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <IconValueComponent
                                iconName={Clock}
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
                        ) : (
                          <Grid container spacing={16}>
                            <Grid item xs={12} md={6}>
                              <IconValueComponent
                                iconName={Clock}
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
                        )}
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent label={'Description'} value={values.description} />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div> </div>
            )}
          </div>
          <div>
            {achievements.publication ? (
              <div>
                <div className="head-text-styles">
                  White Paper/ Research Publication / Journal Entry
                </div>
                {achievements.publication.map((values, index) => {
                  return (
                    <div className="box-details" key={index}>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={6}>
                            <LabelValueComponent label={'Title'} value={values.title} />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <LabelValueComponent label={'URL'} value={values.url} />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent
                              label={'Duration'}
                              value={
                                <div>
                                  {values.duration_in_year
                                    ? values.duration_in_year + ' Year '
                                    : ''}
                                  {values.duration_in_month
                                    ? values.duration_in_month + ' Months '
                                    : ''}
                                  {'( '}
                                  <Moment format="MMM YYYY">{new Date(values.start_date)}</Moment>
                                  {' - '}
                                  <Moment format="MMM YYYY">{new Date(values.end_date)}</Moment>
                                  {' )'}
                                </div>
                              }
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent label={'Description'} value={values.description} />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div> </div>
            )}
          </div>
          <div>
            {achievements.presentation ? (
              <div>
                <div className="head-text-styles">Presentation</div>
                {achievements.presentation.map((values, index) => {
                  return (
                    <div className="box-details" key={index}>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={6}>
                            <LabelValueComponent
                              label={'Presentation Title'}
                              value={values.title}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <LabelValueComponent label={'URL'} value={values.url} />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent label={'Description'} value={values.description} />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div> </div>
            )}
          </div>

          <div>
            {achievements.patent ? (
              <div>
                <div className="head-text-styles">Patent</div>
                {achievements.patent.map((values, index) => {
                  return (
                    <div className="box-details" key={index}>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent
                              label={'Presentation Title'}
                              value={values.title}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent label={'URL'} value={values.url} />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <IconValueComponent iconName={Location} text={values.office} />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent
                              label={'Status'}
                              value={values.issued ? 'Patent Issued' : 'Patent Pending'}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent
                              label={'Application Number'}
                              value={values.applcation_number}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent
                              label={'Issue Date'}
                              value={
                                <Moment format="MMM YYYY">
                                  {
                                    new Date(
                                      values.issued_date_in_year +
                                        '-' +
                                        values.issued_date_in_month,
                                    )
                                  }
                                </Moment>
                              }
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent label={'Description'} value={values.description} />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div> </div>
            )}
          </div>

          <div>
            {achievements.certification ? (
              <div>
                <div className="head-text-styles">Certification</div>
                {achievements.certification.map((values, index) => {
                  return (
                    <div className="box-details" key={index}>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={6}>
                            <LabelValueComponent label={'Certification Name'} value={values.name} />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <IconValueComponent iconName={Calender} text={values.year} />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent label={'Certification Body'} value={values.body} />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div> </div>
            )}
          </div>

          <div>
            {achievements.reward ? (
              <div>
                <div className="head-text-styles">Reward</div>
                {achievements.reward.map((values, index) => {
                  return (
                    <div className="box-details" key={index}>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent label={'Title'} value={values.title} />
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={12}>
                            <LabelValueComponent label={'Description'} value={values.description} />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MyAchievementView;
