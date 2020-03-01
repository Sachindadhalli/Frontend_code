import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew/AutoCompleteNew';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
// import InputLabel from '@material-ui/core/InputLabel';
import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../components/DateTimePicker';
import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';

class UserProfileSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'search',
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.state;
    return (
      <div className="basic-user-sidebar-container">
        {/* <div className='custom-section'> */}
        {/* <div className='profile-sidebar'> */}
        <div class="profile-copy" img src="./img/profile-copy.svg" />
        {/* <div className='text'> */}
        <FormControl>
          <InputLabel>First Name</InputLabel>
          <Input id="first_name" />
        </FormControl>
        <FormControl>
          <InputLabel>Middle Name</InputLabel>
          <Input id="middle_name" />
        </FormControl>
        <FormControl>
          <InputLabel>Last Name</InputLabel>
          <Input id="last_name" />
        </FormControl>

        {/* <label> */}
        {/* First Name
                                <input type="text" name="name" />
                        Middle Name
                                <input type="text" name="name" />
                        Last Name
                                <input type="text" name="name" />
                        Email
                                <input type="text" name="name" /> */}
        <AutoCompleteNew label="Country" method="get" name="Country" />
        <AutoCompleteNew label="State" method="get" name="State" />
        <AutoCompleteNew label="City" method="get" name="City" />
        {/* </label> */}
      </div>
      // <div className='custom-section'>
      //     <div className='headline'>
      //         <span className='title'>
      //             <h2>Basic Details</h2>
      //         </span>
      //         <span className='btn btn-no float-right'>Cancel</span>
      //         <span className='btn float-right mr-md'>Save</span>
      //     </div>
      //     <hr />
      //     <div className='section-body'>
      //         <div className="pb-mdpxs">
      //             {/* <CustomTag text="Experience" className="exp" /> */}
      //             <FormControl component="fieldset" className="radio-button-control">
      //                 <RadioGroup
      //                     aria-label="Gender"
      //                     name="gender1"
      //                     className="search-radio-buttons"
      //                     value={this.state.value}
      //                     onChange={this.handleChange}>
      //                     <FormControlLabel value="search" control={<Radio />} label="Fresher" />
      //                     <FormControlLabel value="advance" control={<Radio />} label="Experienced" className='ml-72p' />
      //                 </RadioGroup>
      //             </FormControl>
      //         </div>
      //     </div>
      // </div >
    );
  }
}

export default UserProfileSidebar;
