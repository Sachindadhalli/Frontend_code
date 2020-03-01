import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import './style.scss';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import calendar from '../../../../../assets/media/icons/calendar.svg';
import Checkbox from '@material-ui/core';
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
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
class UserEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_date: this.getValueFromProp('start_date'),
            com_date: this.getValueFromProp('com_on'),
            start_date_error: '',
            com_date_error: '',
        };
    }
    getValueFromProp = key => {
        if (!this.props.experience) return null;
        return this.props.experience[key] ? this.props.experience[key] : null;
    };
    validateStartDateForm = async () => {
        let errorValue = '';
        if (!this.state.start_date) {
            errorValue = 'Kindly specify your joined date';
        }
        this.setParticularField('start_date', errorValue);
        return errorValue ? true : false;
    };
    //Validate left on Form
    validateCompleteDateForm = async () => {
        let errorValue = '';

        let com_date = new Date(this.state.com_date).getTime(),
            start_date = new Date(this.state.start_date).getTime();
        if (!this.state.com_date) {
            errorValue = 'Kindly specify your left date';
        } else if (com_date <= start_date) {
            errorValue = 'Left date must be greater than the joined date';
        }
        this.setParticularField('com_date', errorValue);

        return errorValue ? true : false;
    };
    //Remove Error on focus
    removeErrorFocus = e => {
        this.setParticularField(e.target.name, '');
    };
    setParticularField = (name, value) => {
        const errorName = name + '_error';
        this.setState({
            [errorName]: value,
        });
    };
    validateFields = fieldName => {
        switch (fieldName) {
            case 'start_date':
                this.validateStartDateForm();
                break;
            case 'com_date':
                this.validateCompleteDateForm();
                break;
        }
    };
    handleInput = (e, validatorAfterSave = null) => {
        // const { allFieldsStatus } = this.state;
        const { name } = e.target;

        // allFieldsStatus[name] = true; //change the touch status of field
        let value = e.target.value;
        if (['start_date', 'com_date'].includes(e.target.name)) {
            value = new Date(value);
        }
        this.setState(
            {
                [name]: value,
                // allFieldsStatus
            },
            () => {
                if (validatorAfterSave) {
                    this.validateFields(name);
                }
            },
        );
    };
    render() {
        const { classes } = this.props;
        const { qualification_id } = this.props;
        const { month, year, start_date, com_date, start_date_error, com_date_error } = this.state;
        const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
        return (
            <div className={'basic-edu-container'}>
                <div className="save-edu-header">
                    <div className="save-discard">
                        <CustomTag
                            text="Save"
                            //onClick={this.createItem}
                            className="save"
                            onclick={this.props.onclick}
                        />
                        <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
                    </div>
                    <div className="save-edu-details">
                        <img src={dropdown} />
                        <CustomTag text="Education" className="mx-15" />
                        <div className="shape">
                            <div className="plus">+</div>
                        </div>
                    </div>
                </div>
                <div className="hr-line" />
                <div className="edu-box-1">
                    <div>
                        <CustomIcon
                            icon={deleteIcon}
                            className="delete-icon"
                            onclick={e => {
                                this.props.deleteQualifications(qualification_id);
                            }}
                        />
                    </div>
                    <div className="box1">
                        <FormControl className="">
                            <AutoCompleteNew
                                label="Qualification"
                                // onClose={(name, data) => {
                                //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
                                // }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                        <FormControl className="">
                            <AutoCompleteNew
                                label="Major"
                                onClose={(name, data) => {
                                    if (data != null && data.value !== '') this.setParticularState(data);
                                }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                    </div>
                    <div className="box1">
                        <FormControl className="">
                            <AutoCompleteNew
                                label="University"
                                // onClose={(name, data) => {
                                //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
                                // }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                        <FormControl className="">
                            <AutoCompleteNew
                                label="Institute"
                                onClose={(name, data) => {
                                    if (data != null && data.value !== '') this.setParticularState(data);
                                }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                    </div>
                    {/* <div className="year-month">
            <div className="yr">
              <FormControl style={{ width: '100%', marginTop: '10px' }}>
                <DateTimePicker
                  label="Start Date"
                  date={this.state.dateOfBirth}
                  onChangeDate={this.handleDateChange}
                  selected={this.state.dateOfBirth ? this.state.dateOfBirth : null}
                />
              </FormControl>
            </div>
            <div className="mn">
              <FormControl style={{ width: '100%', marginTop: '10px' }}>
                <DateTimePicker
                  label="Completion Date"
                  date={this.state.dateOfBirth}
                  onChangeDate={this.handleDateChange}
                  selected={this.state.dateOfBirth ? this.state.dateOfBirth : null}
                />
              </FormControl>
            </div>
          </div> */}
                    <Grid container spacing={32}>
                        <Grid item xs={12} md={6}>
                            <FormControl
                                style={{ width: '100%' }}
                                className="form-child"
                                error={start_date_error ? true : false}
                            >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        id="start_date"
                                        name="start_date"
                                        margin="normal"
                                        label="Start Date"
                                        value={start_date}
                                        views={['year', 'month']}
                                        style={{ marginBottom: '0px', width: '100%' }}
                                        maxDate={new Date()}
                                        onChange={value =>
                                            this.handleInput({ target: { value: value, name: 'start_date' } }, true)
                                        }
                                        onBlur={() => this.validateFields('start_date')}
                                        onFocus={this.removeErrorFocus}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CustomIcon icon={calendar} className="search-icon" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                {start_date_error && <FormHelperText>{start_date_error}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl
                                style={{ width: '100%' }}
                                className="form-child"
                                error={com_date_error ? true : false}
                            >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        id="com_date"
                                        name="com_date"
                                        margin="normal"
                                        label="Completion Date"
                                        value={com_date}
                                        views={['year', 'month']}
                                        style={{ marginBottom: '0px', width: '100%' }}
                                        maxDate={new Date()}
                                        minDate={new Date(start_date)}
                                        onChange={value =>
                                            this.handleInput({ target: { value: value, name: 'com_date' } }, true)
                                        }
                                        onBlur={() => this.validateFields('com_date')}
                                        onFocus={this.removeErrorFocus}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CustomIcon icon={calendar} className="search-icon" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                {com_date_error && <FormHelperText>{com_date_error}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>

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
                                Grading System
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
                                Marks
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
                </div>
                <div className="edu-box-2">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                        onclick={e => {
                            this.props.deleteQualifications(qualification_id);
                        }}
                    />
                    <div className="box1">
                        <FormControl className="">
                            <AutoCompleteNew
                                label="Qualification"
                                // onClose={(name, data) => {
                                //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
                                // }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                        <FormControl className="">
                            <AutoCompleteNew
                                label="Board"
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                    </div>
                    <div className="box1">
                        <FormControl className="">
                            <AutoCompleteNew
                                label="Passing out year"
                                // onClose={(name, data) => {
                                //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
                                // }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                        <FormControl className="">
                            <AutoCompleteNew
                                label="Medium"
                                onClose={(name, data) => {
                                    if (data != null && data.value !== '') this.setParticularState(data);
                                }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                    </div>
                    {/* <div className="box1"> */}
                    <Input
                        id="marks"
                        placeholder="Total Marks"
                        className="marks"
                        style={{ width: '47.5%' }}
                        // onChange={this.handleChange('name')}
                        margin="normal"
                    //style={{ marginTop: '30px' }}
                    />
                    {/* </div> */}
                </div>
                <div className="edu-box-3">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                        onclick={e => {
                            this.props.deleteQualifications(qualification_id);
                        }}
                    />
                    <div className="box1">
                        <FormControl className="">
                            <AutoCompleteNew
                                label="Qualification"
                                // onClose={(name, data) => {
                                //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
                                // }}
                                //width={rightHalf}
                                //apiUrl={JOB_ROLE}
                                filterKey={'value'}
                                method="get"
                            //selectedValues={[job_role]}
                            />
                            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
                        </FormControl>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserEducation);
