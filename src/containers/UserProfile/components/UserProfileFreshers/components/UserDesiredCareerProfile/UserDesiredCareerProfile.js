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
import selectedCircle from '../../../../../assets/media/icons/selectedcircle.svg';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core';
import unselected from '../../../../../assets/media/icons/unselected.svg';
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
const experiences = [];
for (let i = 1; i <= 50; i++) {
    experiences.push(i.toString());
}
class UserDesiredCareerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { month, year } = this.state;
        const { classes } = this.props;
        const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
        return (
            <div className={'basic-emp-container'}>
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
                        <CustomTag text="Desired Career Profile" className="mx-15" />
                        <div className="shape">
                            <div className="plus">+</div>
                        </div>
                    </div>
                </div>
                <div className="hr-line" />
                <div className="fifth full-form-child">
                    <FormControl className={'form-child left-child-form ' + classes.formControl}>
                        <AutoCompleteNew label="Industry" width={fullWidth} method="get" />
                        {/* <FormHelperText>{industry_error}</FormHelperText> */}
                    </FormControl>
                    <FormControl className="form-child">
                        <AutoCompleteNew label="Functional Area" width={rightHalf} method="get" />
                        {/* <FormHelperText >{functional_area_error}</FormHelperText> */}
                    </FormControl>
                </div>
                <div className="fifth full-form-child">
                    <FormControl className={'form-child left-child-form ' + classes.formControl}>
                        <AutoCompleteNew label="Role" width={fullWidth} method="get" />
                        {/* <FormHelperText>{industry_error}</FormHelperText> */}
                    </FormControl>
                    <FormControl className="form-child">
                        <AutoCompleteNew label="Job Type" width={rightHalf} method="get" />
                        {/* <FormHelperText >{functional_area_error}</FormHelperText> */}
                    </FormControl>
                </div>
                <div className="fres-text">Availability to join</div>
                <div className="full-form-child career-fields">
                    <div className="box-imm">
                        <FormControl component="fieldset" className="radio-button-control">
                            <RadioGroup
                                aria-label="Gender"
                                className="search-radio-buttons"
                                //value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Immediate" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="form-child box1">
                        <FormControl component="fieldset" className="radio-button-control">
                            <RadioGroup
                                aria-label="Gender"
                                className="search-radio-buttons"
                                //value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Select Date" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className={'one-forth-form one-forth-form-left ' + classes.formControl}>
                            <InputLabel
                                classes={{ root: classes.helperText }}
                                classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }}
                            >
                                Month
              </InputLabel>
                            <Select
                                classes={{
                                    // underline: classes.cssUnderline,
                                    focused: classes.cssFocused,
                                    root: classes.selectText,
                                }}
                                // value={work_experience_min}
                                // onChange={this.onInputChange}
                                // name="work_experience_min"
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
                        <FormControl className={'one-forth-form ' + classes.formControl}>
                            <InputLabel
                                classes={{ root: classes.helperText }}
                                classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }}
                            >
                                Year
              </InputLabel>
                            <Select
                                //value={work_experience_max}
                                // onChange={this.handleChange}
                                //name="work_experience_max"
                                IconComponent={props => (
                                    <i {...props} className={`material-icons ${props.className}`}>
                                        <img src={dropdown} />
                                    </i>
                                )}
                                classes={{
                                    // underline: classes.cssUnderline,
                                    focused: classes.cssFocused,
                                    root: classes.selectText,
                                }}
                            // value={work_experience_max}
                            // onChange={this.onInputChange}
                            // disabled={is_fresher}
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
                            Expected Salary
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
                            Salary
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
                        <AutoCompleteNew label="Desired Location" width={fullWidth} method="get" />
                        {/* <FormHelperText>{industry_error}</FormHelperText> */}
                    </FormControl>
                    <FormControl className="form-child">
                        <AutoCompleteNew label="Desired Industry" width={rightHalf} method="get" />
                        {/* <FormHelperText >{functional_area_error}</FormHelperText> */}
                    </FormControl>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(UserDesiredCareerProfile);
