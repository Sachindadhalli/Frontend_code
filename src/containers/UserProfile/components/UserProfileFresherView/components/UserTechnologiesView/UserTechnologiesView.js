import React, { Component } from 'react';
import CustomTag from '../../../../components/CustomTag';
import InputLabel from '@material-ui/core/InputLabel';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import customisedMaterial from '../../../../styles/customisedMaterial';
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import { CURRENCY } from '../../../../../config/constants';
import Grid from '@material-ui/core/Grid';

class UserTechnologiesView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'basic-user-view-container'}>
                <div className="save-emp-header">
                    <div className="save-discard">
                        <CustomTag
                            text="Edit"
                            //onClick={this.createItem}
                            //onclick={this.handleSave}
                            className="save"
                        />
                    </div>
                    <div className="save-emp-details">
                        <img src={dropdown} />
                        <CustomTag text="Technologies I have worked on" className="mx-15" />
                    </div>
                </div>
                <div className="hr-line" />
                {/* <div className="internship-box">
          <div className="fres-internship">Technology </div>
          <Grid container>
            <Grid item xs={12} md={6} className="row-padding">
              <div>
                <CustomTag text="Bachelor's degree" className="field-heading" />
              </div>
              <div />
            </Grid>
            <Grid item xs={12} md={6} className="row-padding">
              <div>
                <CustomTag text="college name" className="field-heading" />
              </div>
              <div />
              <CustomIcon
                style={{ marginTop: '-20px' }}
                icon={deleteIcon}
                className="delete-icon"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6} className="row-padding">
              <div>
                <CustomTag text="Bachelor's degree" className="field-heading" />
              </div>
              <div />
            </Grid>
            <Grid item xs={12} md={6} className="row-padding">
              <div>
                <CustomTag text="college name" className="field-heading" />
              </div>
              <div />
              <CustomIcon
                style={{ marginTop: '-20px' }}
                icon={deleteIcon}
                className="delete-icon"
              />
            </Grid>
          </Grid>
        </div> */}
            </div>
        );
    }
}

export default UserTechnologiesView;
