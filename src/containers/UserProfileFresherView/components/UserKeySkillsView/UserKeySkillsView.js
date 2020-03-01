import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
//import './styles.scss';
//import ChipsComponents from '../../../../components/ReusableComponents/ChipsComponents/ChipsComponents';
import CollapsibleComponent from '../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import FieldLabel from '../../../../components/EmployerJobPage/components/SectorsRoles/FieldLabel/FieldLabel';
import AutoCompleteSearch from '../../../../components/AutoCompleteSearch';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});
class UserKeySkillsView extends Component {
  render() {
    const { skills } = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponent collapsibleTitle="Key Skills">
          <div className="technologies-div">
            {/* <AutoCompleteSearch
              // hintMessage={formMetaData['key_skills']}
              label="Key Skills"
              id="key_skills"
              type="text"
              selectedValues={[]}
              filterKey="value"
              // apiUrl={USER_PROFILE_KEY_SKILLS}
              //width="100% !important"
              //icon="drop-down"
              onClose={(name, data) => {
                if (data && data.value) this.pushElementIntoState('key_skills', data);
              }}
              queryWith="search"
              otherData={{ format: 'json' }}
              // showError={!key_skills.length && key_skills_error ? key_skills_error : ''}
            /> */}
            <FieldLabel
              label="Key Skills"
              // hintMessage={formMetaData['industries']['hintMessage']}
            />
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}

export default withStyles(styles)(UserKeySkillsView);
