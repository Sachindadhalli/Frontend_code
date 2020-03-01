import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import './style.scss';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../components/DateTimePicker';
import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    Input: {
        flexBasis: 200,
    },
    button: {
        margin: '11px',
        borderRadius: '20px',
    },
    input: {
        display: 'none',
    },
    formControl: {
        marginBottom: '5px',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    ...customisedMaterial,
    label: {
        fontWeight: 'normal',
        fontSize: '16px',
        color: 'black',
    },
});
const allDropDownWidth = {
    rightHalf: '100%',
    leftHalf: '47.5%',
    fullWidth: '100%',
};
class UserPersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permanent_address: '',
        };
    }
    render() {
        const { permanent_address } = this.state;
        const { classes } = this.props;
        const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
        return (
            <div className={'basic-per-container'}>
                <div className="save-emp-header">
                    <div className="save-discard">
                        <CustomTag
                            text="Save"
                            //onClick={this.createItem}
                            className="save"
                            onclick={this.props.onclick}
                        />
                        <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
                    </div>
                    <div className="save-emp-details">
                        <img src={dropdown} />
                        <CustomTag text="Personal Details" className="mx-15" />
                    </div>
                </div>
                <div className="hr-line" />
                <div className="box1">
                    <FormControl style={{ width: '100%', marginTop: '10px', marginRight: '30px' }}>
                        <DateTimePicker
                            label="Date of Birth"
                            //date={this.state.dateOfBirth}
                            onChangeDate={this.handleDateChange}
                        //selected={this.state.dateOfBirth ? this.state.dateOfBirth : null}
                        />
                    </FormControl>
                    <Input
                        style={{ marginTop: '10px' }}
                        id="gen"
                        placeholder="Gender"
                        className="gen"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                    //width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                </div>
                <FormControl className="">
                    <AutoCompleteNew
                        label="Permanent Address"
                        // onClose={(name, data) => {
                        //   if (data != null && data.value !== '') this.setParticularState(data);
                        // }}
                        //width={rightHalf}
                        //apiUrl={JOB_ROLE}
                        //filterKey={'value'}
                        method="get"
                        //selectedValues={[job_role]}
                        name="permanent_address"
                    />
                    {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                </FormControl>
                <div className="character-info-section">
                    <CustomTag text="Minimum Character left : " className="character-left" />
                    <CustomTag
                        text={permanent_address === '' ? 100 : 100 - permanent_address.length}
                        className="count"
                    />
                </div>

                <div className="fourth full-form-child">
                    <FormControl className={'form-child ' + classes.formControl}>
                        <InputLabel
                            classes={{ root: classes.helperText }}
                            classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            }}
                        >
                            Area Pincode
            </InputLabel>
                        <Input
                            //name="number_of_vacancy"
                            // className={classes.Input}
                            //value={number_of_vacancy}
                            classes={{
                                underline: classes.cssUnderline,
                                focused: classes.cssFocused,
                            }}
                            type="number"
                            margin="normal"
                        // onChange={this.onInputChange}
                        // onBlur={this.handleBlur}
                        />
                    </FormControl>
                    <FormControl
                        style={{ marginright: '0%' }}
                        className={'form-child left-child-form ' + classes.formControl}
                    >
                        <InputLabel
                            classes={{ root: classes.helperText }}
                            shrink
                            classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            }}
                        >
                            Hometown(City)
            </InputLabel>
                        <Select
                            //value={job_type}
                            //onChange={this.onInputChange}
                            IconComponent={props => (
                                <i {...props} className={`material-icons ${props.className}`}>
                                    <img src={dropdown} />
                                </i>
                            )}
                            //name="job_type"
                            classes={{
                                // underline: classes.cssUnderline,
                                focused: classes.cssFocused,
                                root: classes.selectText,
                            }}
                        />
                    </FormControl>
                </div>
                <div className="fourth full-form-child">
                    <FormControl className={'form-child left-child-form ' + classes.formControl}>
                        <InputLabel
                            classes={{ root: classes.helperText }}
                            shrink
                            classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            }}
                        >
                            Permanent Residency for
            </InputLabel>
                        <Select
                            //value={job_type}
                            //onChange={this.onInputChange}
                            IconComponent={props => (
                                <i {...props} className={`material-icons ${props.className}`}>
                                    <img src={dropdown} />
                                </i>
                            )}
                            //name="job_type"
                            classes={{
                                // underline: classes.cssUnderline,
                                focused: classes.cssFocused,
                                root: classes.selectText,
                            }}
                        />
                    </FormControl>
                    <FormControl className={'form-child ' + classes.formControl}>
                        <InputLabel
                            classes={{ root: classes.helperText }}
                            classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            }}
                        >
                            Passport Number
            </InputLabel>
                        <Input
                            //name="number_of_vacancy"
                            // className={classes.Input}
                            //value={number_of_vacancy}
                            classes={{
                                underline: classes.cssUnderline,
                                focused: classes.cssFocused,
                            }}
                            type="number"
                            margin="normal"
                        // onChange={this.onInputChange}
                        // onBlur={this.handleBlur}
                        />
                    </FormControl>
                </div>

                <div className="fifth full-form-child">
                    <FormControl className={'form-child left-child-form ' + classes.formControl}>
                        <AutoCompleteNew label="Marital status" width={fullWidth} method="get" />
                        {/* <FormHelperText>{industry_error}</FormHelperText> */}
                    </FormControl>
                    <FormControl className="form-child">
                        <AutoCompleteNew label="Category" width={rightHalf} method="get" />
                        {/* <FormHelperText >{functional_area_error}</FormHelperText> */}
                    </FormControl>
                </div>
                <div className="fres-text">Differently Abled</div>
                <div className="box2" style={{ marginBottom: '-7px' }}>
                    <div className="yes-no">
                        <FormControl component="fieldset" className="radio-button-control">
                            <RadioGroup
                                aria-label="Gender"
                                className="search-radio-buttons"
                                //value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                {/* <div className="wrapper">
          <div className="fres-text" Language>
            <div className="shape mx-15">
              <div className="plus">+</div>
            </div>
          </div>
          <div className="fifth full-form-child">
            <FormControl className={'form-child left-child-form ' + classes.formControl}>
              <AutoCompleteNew label="English" method="get" />
            </FormControl>
          </div>
        </div> */}
                <div style={{ display: 'flex' }}>
                    <div className="lang">
                        <div className="fres-internship">
                            Language
              <div className="shape mx-15">
                                <div className="plus">+</div>
                            </div>
                        </div>
                        <FormControl style={{ width: '195%' }}>
                            <AutoCompleteNew
                                label=""
                                // onClose={(name, data) => {
                                //   if (data != null && data.value !== '') this.setParticularState(data);
                                // }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                //filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                        </FormControl>
                    </div>
                    <div className="wrapper" style={{ width: 'auto' }}>
                        <div className="fres-text">Proficiency</div>
                        <div style={{ alignSelf: 'self-end' }} className="box1">
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox id="check_inter" name="check_intern" />}
                                    label="Read"
                                />
                            </FormControl>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox id="check_inter" name="check_intern" />}
                                    label="Write"
                                />
                            </FormControl>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox id="check_inter" name="check_intern" />}
                                    label="Speak"
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(UserPersonalDetails);
