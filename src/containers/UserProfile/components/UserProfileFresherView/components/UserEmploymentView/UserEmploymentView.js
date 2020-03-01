import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
//import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../components/DateTimePicker';
import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';

class UserEmploymentView extends Component {
    render() {
        return (
            <div className={'basic-emp-container'}>
                <div className="save-emp-header">
                    <div className="save-discard">
                        <CustomTag
                            text="Save"
                            //onClick={this.createItem}
                            //onclick={this.handleSave}
                            className="save"
                        />
                        <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
                    </div>
                    <div className="save-emp-details">
                        <img src={dropdown} />
                        <CustomTag text="Employment" className="mx-15" />
                    </div>
                </div>
                <div className="hr-line" />
                <div className="fres-internship">Internship </div>
                <div className="internship-box">
                    <Grid container>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="Junior Developer" className="field-heading" />
                            </div>
                            <div />
                        </Grid>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="5 months" className="field-heading" />
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
                                <CustomTag text="Associate Tester" className="field-heading" />
                            </div>
                            <div />
                        </Grid>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="3 months" className="field-heading" />
                            </div>
                            <div />
                            <CustomIcon
                                style={{ marginTop: '-20px' }}
                                icon={deleteIcon}
                                className="delete-icon"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="fres-internship">Training </div>
                <div className="internship-box">
                    <Grid container>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="Summer Internship" className="field-heading" />
                            </div>
                            <div />
                        </Grid>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="5 months" className="field-heading" />
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
                                <CustomTag text="Associate Tester" className="field-heading" />
                            </div>
                            <div />
                        </Grid>
                        <Grid item xs={12} md={6} className="row-padding">
                            <div>
                                <CustomTag text="3 months" className="field-heading" />
                            </div>
                            <div />
                            <CustomIcon
                                style={{ marginTop: '-20px' }}
                                icon={deleteIcon}
                                className="delete-icon"
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
export default UserEmploymentView;
