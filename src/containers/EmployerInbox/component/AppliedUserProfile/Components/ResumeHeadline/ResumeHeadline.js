//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

//custom components
import LabelValueComponent
  from '../../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CollapsibleComponent
  from '../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';

//styles
import './styles.scss';

class ResumeHeadline extends Component {
  render() {
    const {resume_headline} = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponent collapsibleTitle="Resume Headline">
          <div className="resume-headline-div">
            <Grid container spacing={16}>
              <Grid item xs={12} md={12}>
                <LabelValueComponent type={"OnlyText"} value={resume_headline}/>
              </Grid>
            </Grid>
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}

export default ResumeHeadline;
