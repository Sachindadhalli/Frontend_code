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

class ProjectsView extends Component {
    render() {
        return (
            <div className={'basic-emp-container'}>
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
                        <CustomTag text="Projects" className="mx-15" />
                    </div>
                </div>
                <div className="hr-line" />

                <div className="internship-box" />
            </div>
        );
    }
}
export default ProjectsView;
