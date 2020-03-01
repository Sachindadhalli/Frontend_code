//library dependencies
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import {PropTypes} from 'prop-types';
import {toast} from 'react-toastify';


//style
import './style.scss';

//utilities
import {apiCall, handleLocalStorage} from '../../../../../../Utilities';
import {
  KEY_SKILLS,
  INDUSTRY,
  FUNCTIONAL_AREA,
  EMPLOYER_HOMEPAGE_LEVELS_LIST,
  EMPLOYER_HOMEPAGE_UPDATE_SECTOR_ROLES_HIRE_FOR,
  EMPLOYER_HOMEPAGE_GET_SECTOR_ROLES_HIRE_FOR
} from '../../../../../../../config/constants';

//custom components
import FieldLabel from './FieldLabel';
import ChipsForFields from './ChipsForFields';
import CustomTag from '../../../../../../components/CustomTag';
import CreatableRemoteDataSingleSelectDropdown
  from '../../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown'
import CreatableRemoteMultiDropDown
  from '../../../../../../components/MultiSelectDropdownWrapper/components/CreatableRemoteMultiDropDown/CreatableRemoteMultiDropDown';
import NonCreatableRemoteDataMultiSelectDropdown
  from '../../../../../../components/MultiSelectDropdownWrapper/components/NonCreatableRemoteDataMultiSelectDropdown';

//Hint messages
const formMetaData = {
  'functionalAreas': {'maxAllowed': 4, 'hintMessage': 'You can select maximum 4 functional areas'},
  'industries': {'maxAllowed': 4, 'hintMessage': 'You can select maximum 4 industries'},
  'levels': {'maxAllowed': 3, 'hintMessage': ' You can select maximum 3 levels'},
  'skillsRoles': {'maxAllowed': 50, 'hintMessage': 'Enter the skills/roles you hire for'},
  'organisation': {'hintMessage': 'Enter the companies/clients you hire for'}
};

// customised the react toast message
toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});

//customised the material ui style
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
  textField: {
    flexBasis: 200,
  },
  cssLabel: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  cssError: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
});

class SectorsRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      industries: [],
      functionalAreas: [],
      levels: [],
      skillsRoles: [],
      skillsRolesData: [],
      organisation: null,
      removableItem: {},
      dropDownError: {
        industry_error: '',
        functionalAreas_error: '',
        skills_error: ''
      }

    }
    this.getDataFromApiAndMapToProps()
  }

  /**
   * on click of delete icon on chips
   * @param fieldName
   * @param item
   * @param key
   */
  removeElementFromState = (fieldName, item, key) => {
    let fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName]));
    fieldDataFromState.splice(key, 1)
    this.setState({[fieldName]: fieldDataFromState, removableItem: item})
  };

  /**
   * on change in input field,updating state
   * @param event
   */
  handleInput = (event = false) => {
    const {name} = event.target
    const {value} = event.target
    this.setState({
      [name]: value
    })
  };

  /**
   * on click save
   * @returns {Promise<void>}
   */
  handleSave = async () => {
    if (this.validateSkills())
      return;
    try {
      let headers = {
        'authorization': handleLocalStorage('get', 'employerLogin'),
        'Content-Type': 'application/json',
      };
      const preparedData = this.prepareTheDataForApi();
      let responseAfterSave = await apiCall('patch', preparedData, EMPLOYER_HOMEPAGE_UPDATE_SECTOR_ROLES_HIRE_FOR, headers);
      if (responseAfterSave && responseAfterSave.status) {
        toast(`${responseAfterSave.message}`, {})
        this.props.toggleEditMode()
      } else {
        toast(`${responseAfterSave.message}`, {})
      }
    } catch (e) {
      toast(`${"Error from Server"}`, {})
    }
  };

  /**
   * on click of discard changes button
   * @returns {Promise<void>}
   */
  disCardChanges = async () => {
    this.getDataFromApiAndMapToProps();
    this.props.toggleEditMode()
  };

  /**
   * To save in DB fetching the data from state
   * @returns {{industries, functional_areas, levels, skills_roles, organisation: string}}
   */
  prepareTheDataForApi = () => {
    const {industries, functionalAreas, levels, skillsRoles, organisation} = this.state;
    const preparedData = {
      industries: industries,
      functional_areas: functionalAreas,
      levels: levels,
      skills_roles: skillsRoles,
      organisation: organisation ? organisation : ''
    }
    return preparedData;
  };
  /**
   * on click of Edit Button ,calling an api to get the data
   * @returns {Promise<void>}
   */
  getDataFromApiAndMapToProps = async () => {
    let headers = {
      'authorization': handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
    try {
      let sectorsRolesData = await apiCall('get', null, EMPLOYER_HOMEPAGE_GET_SECTOR_ROLES_HIRE_FOR, headers);
      if (sectorsRolesData && sectorsRolesData.status) {
        this.setState({
          industries: sectorsRolesData.data.industries || [],
          functionalAreas: sectorsRolesData.data.functional_areas || [],
          levels: sectorsRolesData.data.levels || [],
          organisation: sectorsRolesData.data.organisation ? sectorsRolesData.data.organisation[0] : null,
          skillsRoles: sectorsRolesData.data.skills_roles || [],
        })
      } else {
      }
    }
    catch (e) {
    }
  };
  /**
   * validating the skill roles
   * @returns {boolean}
   */
  validateSkills = () => {
    const {skillsRoles} = this.state;
    let skillsError = '';
    if (!skillsRoles || !skillsRoles.length)
      skillsError = "Kindly enter at least one skills/roles here";
    else skillsError = '';
    this.setState({skillsError})
    return skillsError ? true : false;
  };

  /**
   * on change in CreatableRemoteDataSingleSelectDropdown updating state
   * @param option
   */
  setDropdownOption = (option) => {
    const opt = {key: option.value, value: option.label}
    this.setState({organisation: opt})
  };
  /**
   * Selected values from Drop Down component , showing in chips
   * @param fieldName
   * @param fieldError
   * @param selectedOption
   */
  setValuetoChips = (fieldName, fieldError, selectedOption) => {
    const opt = this.state[fieldName];
    if (selectedOption) {
      for (let option of selectedOption) {
        let index = opt.findIndex((optionSeleced) => optionSeleced.key == option.value)
        if (index > -1) {
        } else {
          opt.push({key: option.value, value: option.label})
        }
      }
      this.setState({[fieldName]: opt}, () => {
      })
    }
  };

  /**
   * validating all th fields for maximum values added in chips
   * @param fieldError
   * @param errorHandler
   * @returns {boolean}
   */
  onErrorChange(fieldError, errorHandler) {
    const {dropDownError} = this.state;
    if (errorHandler.error) {
      if (fieldError === 'industry_error') dropDownError[fieldError] = "You can select maximum 4 industries";

      if (fieldError === 'functionalAreas_error') dropDownError[fieldError] = "You can select maximum 4 Functional Area";

      if (fieldError === 'levels_error') dropDownError[fieldError] = "You can select maximum 3 Levels";

    } else dropDownError[fieldError] = "";
    this.setState({dropDownError});
    return dropDownError[fieldError] ? true : false
  }

  render() {
    const {isItEditMode, toggleEditMode, classes} = this.props;
    const {organisation, industries, functionalAreas, levels, skillsRoles, dropDownError} = this.state;
    return (
      <div className="section px-16 px-sm-44 pt-sm-40 pt-16 pb-20 pb-sm-44">
        <div className="header">
          <div className="title">
            Select Sector and Skills/Roles you hire for
          </div>
          {
            isItEditMode ?
              <div className="actions">
                <CustomTag text="Save" className="save" onclick={this.handleSave}/>
                <CustomTag text="Discard Changes" className="discard-changes" onclick={this.disCardChanges}/>
              </div>
              :
              <div className="actions">
                <CustomTag text="Edit" className="save edit" onclick={toggleEditMode}/>
              </div>
          }
        </div>
        <div className="body">
          <div className="row">
            <div className="column">
              {isItEditMode ?
                <div>
                  <InputLabel
                    style={{marginTop: 0}}
                    className="change-label-style"
                    shrink={true}
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    }}
                  >
                    {'Industries'}
                  </InputLabel>
                  <NonCreatableRemoteDataMultiSelectDropdown
                    isSearchable={true}
                    apiUrl={INDUSTRY}
                    queryParams={{search: ''}}
                    getSelectedOption={(option) =>
                      this.setValuetoChips('industries', 'industry_error', option)}
                    updateRemovalValue={this.state.removableItem}
                    editable={isItEditMode}
                    defaultValue={industries}
                    error={dropDownError['industry_error'] ? dropDownError['industry_error'] : ''}
                    maxOptions={4}
                    gettingError={(error) => this.onErrorChange('industry_error', error)}
                  >
                  </NonCreatableRemoteDataMultiSelectDropdown>

                </div>
                :
                <div>
                  <FieldLabel
                    label="Industries"
                    hintMessage={formMetaData['industries']['hintMessage']}
                  />
                  <ChipsForFields
                    values={industries}
                    isItEditMode={this.props.editable}
                    onDelete={(item, key) => {
                      this.removeElementFromState(item, key)
                    }}
                  />
                </div>
              }
            </div>
            <div className="column">
              {isItEditMode ?

                <div>
                  <InputLabel
                    style={{marginTop: 0}}
                    className="change-label-style"
                    shrink={true}
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    }}
                  >
                    {'Functional Area'}
                  </InputLabel>
                  <NonCreatableRemoteDataMultiSelectDropdown
                    isSearchable={true}
                    apiUrl={FUNCTIONAL_AREA}
                    queryParams={{search: ''}}
                    getSelectedOption={(option) =>
                      this.setValuetoChips('functionalAreas', 'functionalAreas_error', option)}
                    updateRemovalValue={this.state.removableItem}
                    editable={isItEditMode}
                    defaultValue={functionalAreas}
                    error={dropDownError['functionalAreas_error'] ? dropDownError['functionalAreas_error'] : ''}
                    maxOptions={4}
                    gettingError={(error) => this.onErrorChange('functionalAreas_error', error)}
                  >
                  </NonCreatableRemoteDataMultiSelectDropdown>

                </div>
                :
                <div>
                  <FieldLabel
                    label="Functional Area"
                    hintMessage={formMetaData['functionalAreas']['hintMessage']}
                  />
                  <ChipsForFields
                    values={functionalAreas}
                    isItEditMode={this.props.editable}
                    onDelete={(item, key) => {
                      this.removeElementFromState(item, key)
                    }}
                  />
                </div>
              }
            </div>
          </div>

          <div className="row">
            <div className="column">
              {isItEditMode ?
                <div>
                  <InputLabel
                    style={{marginTop: 0}}
                    className="change-label-style"
                    shrink={true}
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    }}
                  >
                    {'Levels'}
                  </InputLabel>
                  <NonCreatableRemoteDataMultiSelectDropdown
                    isSearchable={true}
                    apiUrl={EMPLOYER_HOMEPAGE_LEVELS_LIST}
                    queryParams={{search: ''}}
                    getSelectedOption={(option) =>
                      this.setValuetoChips('levels', 'levels_error', option)}
                    updateRemovalValue={this.state.removableItem}
                    editable={isItEditMode}
                    defaultValue={levels}
                    error={dropDownError['levels_error'] ? dropDownError['levels_error'] : ''}
                    maxOptions={3}
                    gettingError={(error) => this.onErrorChange('levels_error', error)}
                  >
                  </NonCreatableRemoteDataMultiSelectDropdown>

                </div>
                :
                <div>
                  <FieldLabel
                    label="Levels"
                    hintMessage={formMetaData['levels']['hintMessage']}
                  />
                  <ChipsForFields
                    values={levels}
                    isItEditMode={this.props.editable}
                    onDelete={(item, key) => {
                      this.removeElementFromState(item, key)
                    }}
                  />
                </div>
              }
            </div>
            <div className="column">
              {isItEditMode ?

                <div>
                  <InputLabel
                    style={{marginTop: 0}}
                    className="change-label-style"
                    shrink={true}
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    }}
                  >
                    {'Organisation'}
                  </InputLabel>
                  <CreatableRemoteDataSingleSelectDropdown
                    isSearchable={true}
                    apiUrl={'employer-homepage/get-organisations/'}
                    queryParams={{search: ''}}
                    defaultValue={organisation && organisation.value ? {
                      value: organisation.key,
                      label: organisation.value
                    } : ''}
                    getSelectedOption={(option) => this.setDropdownOption(option)}
                    isClearable={true}
                    error={false}
                  />
                </div>
                :
                <div>
                  <FieldLabel
                    label="Organisation"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    }}
                    hintMessage={formMetaData['organisation']['hintMessage']}
                  />
                  <div className="org-value">
                    {organisation ? organisation.value : ''}
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="row">
            <div className="column">
              {isItEditMode ?

                <div>
                  <InputLabel
                    style={{marginTop: 0}}
                    className="change-label-style"
                    shrink={true}
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    }}
                  >
                    {'Key Skills'}
                  </InputLabel>
                  <CreatableRemoteMultiDropDown
                    isSearchable={true}
                    apiUrl={KEY_SKILLS}
                    queryParams={{search: ''}}
                    getSelectedOption={(option) =>
                      this.setValuetoChips('skillsRoles', 'skills_error', option)}
                    updateRemovalValue={this.state.removableItem}
                    editable={isItEditMode}
                    maxOptions={50}
                    defaultValue={skillsRoles}
                    error={dropDownError['skills_error'] ? dropDownError['skills_error'] : ''}
                    gettingError={(error) => this.onErrorChange('skills_error', error)}
                  >
                  </CreatableRemoteMultiDropDown>

                </div>
                :
                <div>
                  <FieldLabel
                    label=" Key Skills "
                    hintMessage={formMetaData['skillsRoles']['hintMessage']}
                  />
                  <ChipsForFields
                    values={skillsRoles}
                    isItEditMode={this.props.editable}
                    onDelete={(item, key) => {
                      this.removeElementFromState(item, key)
                    }}
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    sectorsRoles: state.empHomePage.jobDetails.sectorsRoles
  }
}

SectorsRoles = connect(mapSateToProps)(withStyles(styles)(SectorsRoles))

export default SectorsRoles;
