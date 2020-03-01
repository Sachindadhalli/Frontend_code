//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Moment from 'react-moment';

//custom components
import LabelValueComponent
  from '../../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CollapsibleComponent
  from '../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import IconValueComponent from '../../../../../../components/ReusableComponents/IconValueComponent/IconValueComponent';

//styles
import './styles.scss';

//icons
import clock from '../../../../../../../assets/media/icons/clock.svg';

/**
 * styles for overriding material ui components
 * @returns {{root: {flexGrow: number}}}
 */
const styles = () => ({root: {flexGrow: 1}});

class Education extends Component {
  render() {
    const {education} = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponent collapsibleTitle="Education">
          <div className="main-div-experienced">
            <div>
              {education.map((values) => {
                return (
                  <div className="experiance-Education">
                    {values.qualifications === '12th' || values.qualifications === '10th' ? (
                      <div className="higher-education">
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent label="Qualification"
                                                 value={values.qualifications + ' ( ' + values.board + ' ' + values.end_date + ' )'}/>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent label="Total Marks" value={values.marks}/>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent label="Medium" value={values.medium}/>
                          </Grid>
                        </Grid>
                      </div>) : values.qualifications === "Below 10th" ? (
                      <div className="secondary-education">
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent label="Qualification" value={values.qualifications}/>
                          </Grid>
                        </Grid>
                      </div>) : (
                      <div className="degree-education">
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={5}>
                            <LabelValueComponent label="Qualification"
                                                 value={values.qualifications ? values.qualifications : "-"}/>
                          </Grid>
                          <Grid item xs={12} md={7}>
                            <LabelValueComponent value={values.institute + ' ( ' + values.university + ')'}/>
                          </Grid>
                        </Grid>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={5}>
                            <IconValueComponent iconName={clock} text={
                              <div>
                                <Moment format="MMM YYYY">{new Date(values.start_date)}</Moment>{' - '}
                                <Moment format="MMM YYYY">{new Date(values.end_date)}</Moment>
                              </div>
                            }/>
                          </Grid>
                          <Grid item xs={12} md={7}>
                            <LabelValueComponent type={"OnlyText"} value={'CGPA : ' + values.marks}/>
                          </Grid>
                        </Grid>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}

export default withStyles(styles)(Education);
