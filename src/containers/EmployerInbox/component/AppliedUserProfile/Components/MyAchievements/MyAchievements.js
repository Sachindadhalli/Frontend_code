//library dependency
import React, {Component} from "react";
import Grid from '@material-ui/core/Grid'
import Moment from 'react-moment';

//custom components
import CollapsibleComponent
  from "../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent";
import IconValueComponent from "../../../../../../components/ReusableComponents/IconValueComponent";
import LabelValueComponent from '../../../../../../components/ReusableComponents/LabelValueComponent'

//styles
import './styles.scss'

//icons
import Clock from '../../../../../../../assets/media/icons/clock.svg'
import Location from '../../../../../../../assets/media/icons/location.svg'
import Calender from '../../../../../../../assets/media/icons/calendar.svg'
import LinkIcon from '../../../../../../../assets/media/icons/link.png'
import UserIcon from '../../../../../../../assets/media/icons/user.png'
import WorkExperience from '../../../../../../../assets/media/icons/work-exp.svg'


class MyAchievements extends Component {
  render() {
    const {achievements, training_internship} = this.props;
    return (
      <div className="label-value-body">
        <CollapsibleComponent collapsibleTitle="My Achievements">
          <div className="align-in-collapse">
            <div>
              {training_internship.internship && training_internship.internship.length !== 0 ? <div>
                <div className="head-text-styles">Internship</div>
                <div className="box-details">
                  {training_internship.internship.map((values, index) => {
                    return <div key={index}>
                      <div>
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={8}>
                            <IconValueComponent iconName={WorkExperience} text={values.role + " at " + values.company}/>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <IconValueComponent iconName={Clock} text={<span>
                            {values.tenure_in_years ? values.tenure_in_years + " Year " : ""}
                              {values.tenure_in_months ? values.tenure_in_months + " Months " : ""}
                          </span>}/>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  })}</div>
              </div> : <div></div>}
            </div>
            <div>
              {achievements.online_profile && achievements.online_profile.length !== 0 ? <div>
                <div className="head-text-styles">Online Profile</div>
                {achievements.online_profile.map((values, index) => {
                  return <div className="box-details" key={index}>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={6}>
                          <IconValueComponent iconName={UserIcon} text={values.profile}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <IconValueComponent iconName={LinkIcon} text={values.url}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Role Description"} value={values.description}/>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                })}
              </div> : <div></div>}
            </div>
            <div>
              {achievements.work_sample && achievements.work_sample.length !== 0 ? <div>
                <div className="head-text-styles">Work Sample</div>
                {achievements.work_sample.map((values, index) => {
                  return <div className="box-details" key={index}>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={6}>
                          <LabelValueComponent label={"Title"} value={values.title}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <IconValueComponent iconName={LinkIcon} text={values.url}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      {values.currently_working ? <Grid container spacing={16}>
                        <Grid item xs={12} md={6}>
                          <LabelValueComponent type={"OnlyText"} value={"I am currently working on this"}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <IconValueComponent iconName={Clock} text={
                            <div><Moment format="MMM YYYY">
                              {new Date(values.start_date)}
                            </Moment>{" - "}<Moment format="MMM YYYY">
                              {new Date(values.end_date)}
                            </Moment>
                            </div>
                          }/>
                        </Grid>
                      </Grid> : <Grid container spacing={16}>
                        <Grid item xs={12} md={6}>
                          <IconValueComponent iconName={Clock} text={<div><Moment format="MMM YYYY">
                            {new Date(values.start_date)}
                          </Moment>{" - "}<Moment format="MMM YYYY">
                            {new Date(values.end_date)}
                          </Moment>
                          </div>}/>
                        </Grid>
                      </Grid>}

                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Description"} value={values.description}/>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                })}
              </div> : <div></div>}
            </div>
            <div>
              {achievements.publication && achievements.publication.length !== 0 ? <div>
                <div className="head-text-styles">White Paper/ Research Publication / Journal Entry</div>
                {achievements.publication.map((values, index) => {
                  return <div className="box-details" key={index}>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={6}>
                          <LabelValueComponent label={"Title"} value={values.title}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <LabelValueComponent label={"URL"} value={values.url}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Duration"} value={<div>
                            {values.duration_in_year ? values.duration_in_year + " Year " : ""}
                            {values.duration_in_month ? values.duration_in_month + " Months " : ""}
                            {"( "}
                            <Moment format="MMM YYYY">
                              {new Date(values.start_date)}
                            </Moment>{" - "}<Moment format="MMM YYYY">
                            {new Date(values.end_date)}
                          </Moment>
                            {" )"}
                          </div>}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Description"} value={values.description}/>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                })}
              </div> : <div></div>}
            </div>
            <div>
              {achievements.presentation && achievements.presentation.length !== 0 ? <div>
                <div className="head-text-styles">Presentation</div>
                {achievements.presentation.map((values, index) => {
                  return <div className="box-details" key={index}>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={6}>
                          <LabelValueComponent label={"Presentation Title"} value={values.title}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <LabelValueComponent label={"URL"} value={values.url}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Description"} value={values.description}/>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                })}
              </div> : <div></div>}
            </div>

            <div>
              {achievements.patent && achievements.patent.length !== 0 ? <div>
                <div className="head-text-styles">Patent</div>
                {achievements.patent.map((values, index) => {
                  return <div className="box-details" key={index}>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={4}>
                          <LabelValueComponent label={"Presentation Title"} value={values.title}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <LabelValueComponent label={"URL"} value={values.url}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <IconValueComponent iconName={Location} text={values.office}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={4}>
                          <LabelValueComponent label={"Status"}
                                               value={values.issued ? "Patent Issued" : "Patent Pending"}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <LabelValueComponent label={"Application Number"} value={values.applcation_number}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <LabelValueComponent label={"Issue Date"} value={<Moment format="MMM YYYY">
                            {new Date(values.issued_date_in_year + "-" + values.issued_date_in_month)}
                          </Moment>}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Description"} value={values.description}/>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                })}
              </div> : <div></div>}
            </div>

            <div>
              {achievements.certification && achievements.certification.length !== 0 ? <div>
                <div className="head-text-styles">Certification</div>
                {achievements.certification.map((values, index) => {
                  return <div className="box-details" key={index}>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={6}>
                          <LabelValueComponent label={"Certification Name"} value={values.name}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <IconValueComponent iconName={Calender} text={values.year}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Certification Body"} value={values.body}/>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                })}
              </div> : <div></div>}
            </div>

            <div>
              {achievements.reward && achievements.reward.length !== 0 ? <div>
                <div className="head-text-styles">Reward</div>
                {achievements.reward.map((values, index) => {
                  return <div className="box-details" key={index}>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Title"} value={values.title}/>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <Grid container spacing={16}>
                        <Grid item xs={12} md={12}>
                          <LabelValueComponent label={"Description"} value={values.description}/>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                })}
              </div> : <div></div>}
            </div>
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}

export default MyAchievements;
