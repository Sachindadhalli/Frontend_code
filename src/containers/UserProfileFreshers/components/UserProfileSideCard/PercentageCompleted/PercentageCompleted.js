// import React, { Component } from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import PropTypes from 'prop-types';
// import DateFnsUtils from '@date-io/date-fns';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
// import CustomTag from '../../../../../components/CustomTag';
// import CustomBreadcrumb from '../../../../../components/CustomBreadcrumb/CustomBreadcrumb';
// import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
// // import AutoCompleteNew from '../../../../../components/AutoCompleteNew/AutoCompleteNew';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// // import InputLabel from '@material-ui/core/InputLabel';
// import './style.scss';
// import Input from '@material-ui/core/Input';
// import calendar from '../../../../../../assets/media/icons/calendar.svg';
// import { TextField, withStyles } from '@material-ui/core';
// import { Checkbox } from '@material-ui/core';
// import untick from '../../../../../../assets/media/icons/untick.svg';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Grid from '@material-ui/core/Grid';
// // import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
// //import customisedMaterial from '../../../../styles/customisedMaterial';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
// import DateTimePicker from '../../../../../components/DateTimePicker';
// import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';

// class PercentageCompleted extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 'search',
//     };
//   }
//   handleChange = event => {
//     this.setState({ value: event.target.value });
//   };

//   render() {
//     const { classes } = this.state;
//     return (
//       <div className="percentage-completed">
//         <CustomTag text="Percentage Completed" />
//         <div className="rectangle">
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Resume Headline' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Key Skills' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Employment' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Education' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'IT Skills' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Projects' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Profile Summary' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Accomplishments' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Desired Career Profile' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Personal Details' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Attach Resume' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'LinkedIn' }]} />
//           <CustomBreadcrumb breadcrumbs={[{ text: 'Aadhar' }]} />
//         </div>
//       </div>
//     );
//   }
// }

// export default PercentageCompleted;

import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../../components/CustomTag';
import CustomBreadcrumb from '../../../../../components/CustomBreadcrumb/CustomBreadcrumb';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew/AutoCompleteNew';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// import InputLabel from '@material-ui/core/InputLabel';
import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
//import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';

class PercentageCompleted extends Component {
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
      <div className="user-video-resume-card">
        <div className="header">Percentage Completed</div>
        {/* <div className="rectangle"> */}
        <CustomBreadcrumb breadcrumbs={[{ text: 'Resume Headline' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Key Skills' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Employment' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Education' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'IT Skills' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Projects' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Profile Summary' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Accomplishments' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Desired Career Profile' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Personal Details' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Attach Resume' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'LinkedIn' }]} />
        <CustomBreadcrumb breadcrumbs={[{ text: 'Aadhar' }]} />
        {/* </div> */}
      </div>
    );
  }
}

export default PercentageCompleted;
