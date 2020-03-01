import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import './style.scss';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';
import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import NonCreatableSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown';

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
const experiences_year = [];
for (let i = 1; i <= 30; i++) {
  //experiences_year.push(i.toString());
  experiences_year.push({ key: i, value: i });
}
const experiences_month = [];
for (let i = 1; i <= 12; i++) {
  // experiences_month.push(i.toString());
  experiences_month.push({ key: i, value: i });
}
class UserTechnologies extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: true, technologies: '', technologies_error: '' };
  }
  resetErrors = () => {
    this.setState({
      technologies_error: '',
    });
  };
  handleInput = (e, validatorAfterSave = null) => {
    const { name } = e.target;
    this.setState(
      {
        [name]: e.target.value,
        [`${name}_error`]: '',
      },
      () => {
        // debugger;
        this.validateFields(name);
      },
    );
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'technologies':
        this.validateTechnologyForm();
        break;
    }
  };
  validateTechnologyForm = async () => {
    // debugger;
    let errorValue = '';
    if (!this.state.technologies) {
      errorValue = 'Kindly specify your Technology worked on';
    }
    this.setParticularField('technologies', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };

  setMonths = option => {
    const value = option.label;
    this.setState(
      {
        month: value,
      },
      () => this.validateFields('month'),
    );
  };
  setYears = option => {
    const value = option.label;
    this.setState(
      {
        year: value,
      },

      () => this.validateFields('year'),
    );
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  checkForErrors = async () => {
    debugger;
    console.log('hi here', this.state.technologies);
    let error = false;
    if (typeof this.state.technologies === 'string' || this.state.technologies == '') {
      error = true;
      this.setState({
        technologies_error: 'Kindly specify Technologies you have worked on',
      });
    }
  };
  render() {
    const { month, year, technologies, technologies_error } = this.state;
    const { classes } = this.props;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Technologies I have worked on"
        showAddButtow={false}
        onSaveClick={this.checkForErrors}
        showEdit={!this.state.editMode}
        onEditClick={() => {
          this.setState({ editMode: true });
        }}
        onclick={() => {
          this.setState({ editMode: false });
        }}
      >
        <div className={'basic-tech-container'}>
          {/* <div className="save-tech-header">
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
            <CustomTag text="Technolgies I have worked on" className="mx-15" />
            <div className="shape">
              <div className="plus">+</div>
            </div>
          </div>
        </div>
        <div className="hr-line" /> */}
          {this.state.editMode ? (
            <div className="box-tech">
              <FormControl className="form-child" style={{ marginTop: '13px' }}>
                <InputLabel
                  classes={{ root: classes.helperText }}
                  style={{ marginTop: '-12px' }}
                  //className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                  shrink={true}
                  htmlFor="technologies"
                >
                  {'Technologies'}
                </InputLabel>
                <Input
                  name="technologies"
                  type="text"
                  //value={this.technologies}
                  onChange={this.handleInput}
                  onBlur={() => this.validateFields('technologies_error')}
                  onFocus={this.removeErrorFocus}
                  autoComplete="off"
                  error={technologies_error ? technologies_error : false}
                />

                {technologies_error ? (
                  <FormHelperText error={technologies_error} id="firstName_error">
                    <span className="field_error">{technologies_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <div className="form-child">
                <div className="fres-text">Experience</div>
                <div className="year-month" style={{ marginTop: '30px' }}>
                  <div className="yr ">
                    <FormControl
                      style={{ width: '100%' }}
                      className={'one-forth-form one-forth-form-left ' + classes.formControl}
                    >
                      <InputLabel
                        shrink={true}
                        style={{ marginTop: '-13px' }}
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Years
                      </InputLabel>

                      <NonCreatableSingleSelectDropdown
                        // isSearchable={false}
                        // getSelectedOption={option => this.setYears(option)}
                        // defaultValue={year ? { key: year, label: year } : {}}
                        options={experiences_year}
                        isClearable={false}
                        // error={year_error}
                      />
                      {/* {year_error ? (
                        <FormHelperText error={year_error} id="firstName_error">
                          <span className="field_error">{year_error}</span>
                        </FormHelperText>
                      ) : null} */}
                    </FormControl>
                  </div>
                  <div className="mn">
                    <FormControl
                      style={{ width: '100%' }}
                      className={'one-forth-form one-forth-form-left ' + classes.formControl}
                    >
                      <InputLabel
                        shrink={true}
                        style={{ marginTop: '-13px' }}
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Months
                      </InputLabel>

                      <NonCreatableSingleSelectDropdown
                        // isSearchable={false}
                        // getSelectedOption={option => this.setMonths(option)}
                        // defaultValue={month ? { key: month, label: month } : {}}
                        options={experiences_month}
                        isClearable={false}
                        //error={month_error}
                      />
                      {/* {month_error ? (
                        <FormHelperText error={month_error} id="firstName_error">
                          <span className="field_error">{month_error}</span>
                        </FormHelperText>
                      ) : null} */}
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="technology-worked-on">
              <div className="label-value-body">
                <div className="label-value-wrapper">
                  <table width="100%">
                    <tr className="label-styles-L">
                      <th width={'34%'} className={'td-padding-20px'}>
                        Technology
                      </th>
                      <th className={'td-padding-20px'}>Experience</th>
                    </tr>
                    {technologies &&
                      technologies.map((values, index) => {
                        return (
                          <tr className="value-styles-L" key={index}>
                            <td className={'td-padding-20px'}>{values.technology}</td>
                            <td className={'td-padding-20px'}>
                              {values.experience_in_years +
                                ' Years ' +
                                values.experience_in_months +
                                ' Months'}
                            </td>
                          </tr>
                        );
                      })}
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </CollapsibleComponentUserProfile>
    );
  }
}

export default withStyles(styles)(UserTechnologies);
