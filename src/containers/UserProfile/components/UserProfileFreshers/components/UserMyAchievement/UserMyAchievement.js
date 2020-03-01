import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
import './style.scss';
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
import BoxInternship from '../UserEmployment/components/BoxInternship';
import BoxTraining from '../UserEmployment/components/BoxTraining';

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
const experiences = [];
for (let i = 1; i <= 30; i++) {
    experiences.push(i.toString());
}

class UserMyAchievement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course_name: '',
            role_dsc: '',
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
        const { course_name, role_dsc } = this.state;
        const {
            month,
            year,
            month1,
            year1,
            start_date,
            com_date,
            start_date_error,
            com_date_error,
        } = this.state;
        const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;

        return (
            <div className={'basic-pro-container'}>
                <div className="save-pro-header">
                    <div className="save-discard">
                        <CustomTag
                            text="Save"
                            //onClick={this.createItem}
                            className="save"
                            onclick={this.props.onclick}
                        />
                        <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
                    </div>
                    <div className="save-pro-details">
                        <img src={dropdown} />
                        <CustomTag text="My Achievements" className="mx-15" />
                        <div className="shape">
                            <div className="plus">+</div>
                        </div>
                    </div>
                </div>
                <div className="hr-line" />
                {/* for experience */}
                {this.props.type == 'experienced' ? (
                    <div>
                        <BoxInternship
                            {...{
                                rightHalf,
                                classes,
                                year,
                                month,
                                dropdown,
                                leftHalf,
                                fullWidth,
                                allDropDownWidth,
                            }}
                        />
                        <BoxTraining
                            {...{
                                course_name,
                                //dateOfBirth,
                            }}
                        />
                    </div>
                ) : null}
                <div className="fres-internship">
                    Online Profile
          <div
                        className="shape mx-15"
                        onClick={e => {
                            this.setState({ count: this.state.count + 1 });
                        }}
                    >
                        <div className="plus">+</div>
                    </div>
                </div>
                <div className="fres-text">Add link to Online Profiles (e.g LinkedIn, Facebook etc)</div>
                <div className="training-box">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                    // onclick={e => {
                    //   this.props.deleteQualifications(qualification_id);
                    // }}
                    />
                    <Input
                        id="loc"
                        placeholder="Social Profile"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        placeholder="URL"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        placeholder="Role Description"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="character-info-section">
                        <CustomTag text="Minimum Character left : " className="character-left" />
                        <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
                    </div>
                </div>
                <div className="fres-internship">
                    Work Sample
          <div
                        className="shape mx-15"
                        onClick={e => {
                            this.setState({ count: this.state.count + 1 });
                        }}
                    >
                        <div className="plus">+</div>
                    </div>
                </div>
                <div className="fres-text">Add link to Online Profiles (e.g LinkedIn, Facebook etc)</div>
                <div className="training-box">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                    // onclick={e => {
                    //   this.props.deleteQualifications(qualification_id);
                    // }}
                    />
                    <Input
                        id="loc"
                        placeholder="Work Title"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        placeholder="URL"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="wrapper1">
                        <FormControl style={{ marginTop: '25px' }}>
                            <FormControlLabel
                                control={<Checkbox id="check_inter" name="check_intern" />}
                                label="I am Currently working on this"
                            />
                        </FormControl>
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
                                            label="End Date"
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
                    </div>
                    <Input
                        placeholder="Description"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="character-info-section">
                        <CustomTag text="Minimum Character left : " className="character-left" />
                        <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
                    </div>
                </div>
                <div className="fres-internship">
                    White Paper/ Research Publication / Journal Entry
          <div
                        className="shape mx-15"
                        onClick={e => {
                            this.setState({ count: this.state.count + 1 });
                        }}
                    >
                        <div className="plus">+</div>
                    </div>
                </div>
                <div className="fres-text">Add links to your online publications </div>
                <div className="training-box">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                    // onclick={e => {
                    //   this.props.deleteQualifications(qualification_id);
                    // }}
                    />
                    <Input
                        id="loc"
                        placeholder="Work Title"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        placeholder="URL"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="wrapper1">
                        <FormControl style={{ marginTop: '25px' }}>
                            <FormControlLabel
                                control={<Checkbox id="check_inter" name="check_intern" />}
                                label="I am Currently working on this"
                            />
                        </FormControl>
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
                                            label="End Date"
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
                    </div>
                    <div className="fres-text">Duration</div>
                    <div className="year-month">
                        <div className="yr">
                            <FormControl className={'one-forth-form one-forth-form-left ' + classes.formControl}>
                                <InputLabel>Years</InputLabel>
                                <Select
                                    classes={{
                                        // underline: classes.cssUnderline,
                                        focused: classes.cssFocused,
                                        root: classes.selectText,
                                    }}
                                    value={year1}
                                    onChange={this.onInputChange}
                                    name="year1"
                                    IconComponent={props => (
                                        <i {...props} className={`material-icons ${props.className}`}>
                                            <img src={dropdown} />
                                        </i>
                                    )}
                                >
                                    <MenuItem value={'0'}>{'0'}</MenuItem>
                                    {experiences.map(value => {
                                        return (
                                            <MenuItem classes={{ root: classes.selectText }} value={value}>
                                                {value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mn">
                            <FormControl className={'one-forth-form one-forth-form-left ' + classes.formControl}>
                                <InputLabel>Months</InputLabel>
                                <Select
                                    classes={{
                                        // underline: classes.cssUnderline,
                                        focused: classes.cssFocused,
                                        root: classes.selectText,
                                    }}
                                    value={month1}
                                    onChange={this.onInputChange}
                                    name="month1"
                                >
                                    <MenuItem value={'0'}>{'0'}</MenuItem>
                                    {experiences.map(value => {
                                        return (
                                            <MenuItem classes={{ root: classes.selectText }} value={value}>
                                                {value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <Input
                        placeholder="Description"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="character-info-section">
                        <CustomTag text="Minimum Character left : " className="character-left" />
                        <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
                    </div>
                </div>
                <div className="fres-internship">
                    Presentation
          <div
                        className="shape mx-15"
                        onClick={e => {
                            this.setState({ count: this.state.count + 1 });
                        }}
                    >
                        <div className="plus">+</div>
                    </div>
                </div>
                <div className="fres-text">Add links to your Online presentations</div>
                <div className="training-box">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                    // onclick={e => {
                    //   this.props.deleteQualifications(qualification_id);
                    // }}
                    />
                    <Input
                        id="loc"
                        placeholder="Presentation Title"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        placeholder="URL"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        placeholder="Description"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="character-info-section">
                        <CustomTag text="Minimum Character left : " className="character-left" />
                        <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
                    </div>
                </div>
                <div className="fres-internship">
                    Patent
          <div
                        className="shape mx-15"
                        onClick={e => {
                            this.setState({ count: this.state.count + 1 });
                        }}
                    >
                        <div className="plus">+</div>
                    </div>
                </div>
                <div className="fres-text">Add details of patents you have filled</div>
                <div className="training-box">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                    // onclick={e => {
                    //   this.props.deleteQualifications(qualification_id);
                    // }}
                    />
                    <Input
                        id="loc"
                        placeholder="Patent Title"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        placeholder="URL"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        placeholder="Patent Office"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="character-info-section">
                        <CustomTag text="Minimum Character left : " className="character-left" />
                        <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
                    </div>
                    <div className="fres-text">Status</div>
                    <div className="yes-no">
                        <FormControl component="fieldset" className="radio-button-control">
                            <RadioGroup
                                aria-label="Gender"
                                className="search-radio-buttons"
                                //value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Patent Issued" />
                                <FormControlLabel value="no" control={<Radio />} label="Patent Pending" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Input
                        placeholder="Application number"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="fres-text">Issue Date</div>
                    <div className="year-month">
                        <div className="yr">
                            <FormControl className={'one-forth-form one-forth-form-left ' + classes.formControl}>
                                <InputLabel>Years</InputLabel>
                                <Select
                                    classes={{
                                        // underline: classes.cssUnderline,
                                        focused: classes.cssFocused,
                                        root: classes.selectText,
                                    }}
                                    value={year1}
                                    onChange={this.onInputChange}
                                    name="year1"
                                    IconComponent={props => (
                                        <i {...props} className={`material-icons ${props.className}`}>
                                            <img src={dropdown} />
                                        </i>
                                    )}
                                >
                                    <MenuItem value={'0'}>{'0'}</MenuItem>
                                    {experiences.map(value => {
                                        return (
                                            <MenuItem classes={{ root: classes.selectText }} value={value}>
                                                {value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mn">
                            <FormControl className={'one-forth-form one-forth-form-left ' + classes.formControl}>
                                <InputLabel>Months</InputLabel>
                                <Select
                                    classes={{
                                        // underline: classes.cssUnderline,
                                        focused: classes.cssFocused,
                                        root: classes.selectText,
                                    }}
                                    value={month1}
                                    onChange={this.onInputChange}
                                    name="month1"
                                >
                                    <MenuItem value={'0'}>{'0'}</MenuItem>
                                    {experiences.map(value => {
                                        return (
                                            <MenuItem classes={{ root: classes.selectText }} value={value}>
                                                {value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <Input
                        placeholder="Description"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="character-info-section">
                        <CustomTag text="Minimum Character left : " className="character-left" />
                        <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
                    </div>
                </div>
                <div className="fres-internship">
                    Certification
          <div
                        className="shape mx-15"
                        onClick={e => {
                            this.setState({ count: this.state.count + 1 });
                        }}
                    >
                        <div className="plus">+</div>
                    </div>
                </div>
                <div className="fres-text">Add details of certifications you have filled</div>
                <div className="training-box">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                    // onclick={e => {
                    //   this.props.deleteQualifications(qualification_id);
                    // }}
                    />
                    <Input
                        id="loc"
                        placeholder="Certification Name"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <Input
                        id="loc"
                        placeholder="Certification Body"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <FormControl className={'one-forth-form one-forth-form-left ' + classes.formControl}>
                        <InputLabel>Years</InputLabel>
                        <Select
                            classes={{
                                // underline: classes.cssUnderline,
                                focused: classes.cssFocused,
                                root: classes.selectText,
                            }}
                            value={year1}
                            onChange={this.onInputChange}
                            name="year1"
                            IconComponent={props => (
                                <i {...props} className={`material-icons ${props.className}`}>
                                    <img src={dropdown} />
                                </i>
                            )}
                        >
                            <MenuItem value={'0'}>{'0'}</MenuItem>
                            {experiences.map(value => {
                                return (
                                    <MenuItem classes={{ root: classes.selectText }} value={value}>
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className="fres-internship">
                    Reward
          <div
                        className="shape mx-15"
                        onClick={e => {
                            this.setState({ count: this.state.count + 1 });
                        }}
                    >
                        <div className="plus">+</div>
                    </div>
                </div>
                <div className="training-box">
                    <CustomIcon
                        icon={deleteIcon}
                        className="delete-icon"
                    // onclick={e => {
                    //   this.props.deleteQualifications(qualification_id);
                    // }}
                    />
                    <div className="fres-internship">Title</div>
                    <Input
                        id="loc"
                        placeholder="E.g.  Employee of the month"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="character-info-section">
                        <CustomTag text="Minimum Character left : " className="character-left" />
                        <CustomTag text={role_dsc === '' ? 50 : 50 - role_dsc.length} className="count" />
                    </div>
                    <Input
                        placeholder="Description"
                        //className="loc"
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        width="100%"
                    //style={{ marginTop: '30px' }}
                    />
                    <div className="character-info-section">
                        <CustomTag text="Minimum Character left : " className="character-left" />
                        <CustomTag text={role_dsc === '' ? 500 : 500 - role_dsc.length} className="count" />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserMyAchievement);
