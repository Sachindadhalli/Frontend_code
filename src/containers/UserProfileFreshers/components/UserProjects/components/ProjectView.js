import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import './styles.scss';
import CollapsibleComponent from '../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import IconValueComponent from '../../../../../components/ReusableComponents/IconValueComponent';
import Location from '../../../../../../assets/media/icons/location.svg';
import Clock from '../../../../../../assets/media/icons/clock.svg';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent';
import Grid from '@material-ui/core/Grid';
import ChipsComponents from '../../../../../components/ReusableComponents/ChipsComponents';
import Moment from 'react-moment';

// const styles = theme => ({});

class ProjectView extends React.Component {
  state = {
    projects: [],
  };
  render() {
    const { classes, projects } = this.props;
    return (
      <div className="label-value-body">
        <div className="align-in-collapse">
          {projects &&
            projects.map((values, index) => {
              return (
                <div className="box-details" key={index}>
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12} md={4}>
                        <LabelValueComponent label="Project Title" value={values.title} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LabelValueComponent label="Role" value={values.role} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LabelValueComponent label="Qualification" value={values.qualification} />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12} md={4}>
                        <LabelValueComponent label="Client" value={values.client} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LabelValueComponent label="Project Status" value={values.status} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LabelValueComponent label="Project Site" value={values.site} />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12} md={4}>
                        <LabelValueComponent label="Nature of project" value={values.nature} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LabelValueComponent label="Team Size" value={values.team_size} />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12} md={4}>
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
                      <Grid item xs={12} md={4}>
                        <IconValueComponent iconName={Location} text={values.location} />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12} md={12}>
                        <LabelValueComponent label="Details of project" value={values.details} />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12} md={12}>
                        <LabelValueComponent label="Role Description" value={values.description} />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12} md={12}>
                        <ChipsComponents title="Skills Used" values={values.skills} />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12} md={12}>
                        <ChipsComponents
                          title="Uploaded Document"
                          values={values.upload_document}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

ProjectView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ProjectView;
