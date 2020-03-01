//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

//custom components
import ChipsComponents from '../../../../../../components/ReusableComponents/ChipsComponents/ChipsComponents';
import CollapsibleComponent
  from '../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';

//styles
import './styles.scss';

class Technologies extends Component {
  render() {
    const {skills} = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponent collapsibleTitle='Technologies'>
          <div className="technologies-div">
            <Grid container spacing={16}>
              <Grid item xs={12} md={8}>
                <ChipsComponents values={skills}/>
              </Grid>
            </Grid>
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}

export default Technologies;
