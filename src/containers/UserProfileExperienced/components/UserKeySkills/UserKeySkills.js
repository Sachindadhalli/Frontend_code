import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../components/CustomTag';
import CreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
//import './style.scss';
import selectedCircle from '../../../../../assets/media/icons/selectedcircle.svg';
import AutoCompleteSearch from '../../../../components/AutoCompleteSearch';
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
import DocumentList from '../../../../components/DocumentList';
import {
  apiCall,
  isObjectAlreadyExist,
  handleLocalStorage,
  calculateTotalCount,
} from '../../../../Utilities/';
import { USER_PROFILE_KEY_SKILLS } from '../../../../../config/constants';
import { KEY_SKILLS } from '../../../../../config/constants';
import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import FieldLabel from '../../../../components/EmployerJobPage/components/SectorsRoles/FieldLabel/FieldLabel';
import ChipsForFields from '../../../../components/EmployerJobPage/components/SectorsRoles/ChipsForFields/ChipsForFields';
const formMetaData = {
  skillsRoles: { maxAllowed: 50, hintMessage: 'Enter the skills' },
};
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

class UserKeySkills extends Component {
  constructor(props) {
    super(props);
    this.state = { key_skills: [], editMode: true, key_skills_error: '', key_skills_edit: '' };
  }
  resetErrors = () => {
    key_skills_error: '';
  };
  setDropdownOption = (option, name, validatorAfterSave = null) => {
    const opt = option ? { key: option.value, value: option.label } : '';
    this.setState(
      {
        [name]: opt,
        [`${name}_error`]: '',
      },
      () => {
        this.validateFields(name);
      },
    );
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'key_skills':
        this.validateKeySkillsForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateKeySkillsForm = async () => {
    let errorValue = '';
    if (!this.state.key_skills) {
      errorValue = 'Kindly specify your Key Skills';
    }
    this.setParticularField('key_skills', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  //assign error value
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  validateKeySkills = () => {
    const { key_skills } = this.state;
    let errorHere = '';
    if (key_skills == '') {
      errorHere = 'Kindly enter a specific keyword';
    }
    // else if(!AlphaAndSpace(key_skills)){
    //   errorHere = "Alphabet and one space is allowed only"
    // }
    this.setState({
      key_skills_error: errorHere,
    });
  };
  validateFormData = name => {
    // console.log('name, name', name)
    switch (name) {
      case 'key_skills':
        this.validateKeySkills();
        break;
    }
  };
  // setParticularState = (name, value) => {
  //   if (value === null || (value == '' && name.includes('error') == false)) {
  //     return;
  //   }
  //   this.setState(
  //     {
  //       [name]: value,
  //     },

  //     () => this.validateFormData(name),
  //   );
  // };

  // setMultiState = (name, value) => {
  //   //debugger;
  //   let valueArray = this.state[name];
  //   // console.log(valueArray, 'array ', value)
  //   // debugger
  //   let newValue = 0;
  //   try {
  //     newValue = value.value.length;

<<<<<<< HEAD
      if (
        !isObjectAlreadyExist(value, valueArray) &&
        250 - calculateTotalCount(valueArray) - newValue >= 0
      ) {
        //debugger;
        valueArray.unshift(value);
        this.setParticularState(name, valueArray);
        this.validateFormData(name);
      }
      //debugger;
    } catch (exc) {
      // console.log('hint ', exc);
    }
  };
=======
  //     if (
  //       !isObjectAlreadyExist(value, valueArray) &&
  //       250 - calculateTotalCount(valueArray) - newValue >= 0
  //     ) {
  //       //debugger;
  //       valueArray.unshift(value);
  //       this.setParticularState(name, valueArray);
  //       this.validateFormData(name);
  //     }
  //     //debugger;
  //   } catch (exc) {
  //     console.log('hint ', exc);
  //   }
  //   console.log(
  //     'setMultiState',
  //     !isObjectAlreadyExist(value, valueArray) &&
  //       250 - calculateTotalCount(valueArray) - newValue >= 0,
  //   );
  // };
>>>>>>> user-profile-integration
  deleteKeySkills = key => {
    let { key_skills } = this.state;
    key_skills.splice(key, 1);
    this.setState(
      {
        key_skills: key_skills,
      },
      () => this.validateFormData('key_skills'),
    );
  };
  pushElementIntoState = (fieldName, data) => {
    if (!data || !data.value) return; //don't insert empty values
    let fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName]));
    //check for maximum allowed things
    // if (fieldDataFromState.length >= formMetaData[fieldName]['maxAllowed']) return;
    if (fieldName === 'key_skills' && data.value.length > 20) return;
    //don't push if already existed
    if (fieldDataFromState.find(value => value.value === data.value)) return;

    if (!data.key) data.key = data.value;

    fieldDataFromState.push(data);
    this.setState({ [fieldName]: fieldDataFromState });
  };
  //for displaying selected skills
  removeElementFromState = (fieldName, key) => {
    let fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName]));
    fieldDataFromState.splice(key, 1);
    this.setState({ [fieldName]: fieldDataFromState });
  };
  render() {
    const { key_skills, key_skills_error } = this.state;
    const { classes, isItEditMode } = this.props;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Key Skills"
        showAddButtow={false}
        showEdit={!this.state.editMode}
        onEditClick={() => {
          this.setState({ editMode: true });
        }}
        onclick={() => {
          this.setState({ editMode: false });
        }}
      >
        <div className={'basic-details-main-container'}>
          <div>
            {/* {isItEditMode ? ( */}
            {this.state.editMode ? (
              <AutoCompleteSearch
                // hintMessage={formMetaData['key_skills']}
                label="Key Skills"
                id="key_skills"
                type="text"
                selectedValues={[]}
                filterKey="value"
                apiUrl={KEY_SKILLS}
                //width="100% !important"
                //icon="drop-down"
                onClose={(name, data) => {
                  if (data && data.value) this.pushElementIntoState('key_skills', data);
                }}
                queryWith="search"
                otherData={{ format: 'json' }}
                showError={!key_skills.length && key_skills_error ? key_skills_error : ''}
              />
            ) : (
              <FieldLabel
                label="Key Skills"

                // hintMessage={formMetaData['industries']['hintMessage']}
              />
            )}
            {/* <div className="key-skilles-footer">
              <div className="technology-section">
                {key_skills.length > 0
                  ? key_skills.map((key_skill, key) => {
                      return (
                        <DocumentList
                          text={key_skill.value}
                          onclick={() => this.deleteKeySkills(key)}
                          className="document-lists"
                        />
                      );
                    })
                  : null}
              </div> */}
            {/* {key_skills_error ? (
              <FormHelperText error={key_skills_error} id="firstName_error">
                <span className="field_error">{key_skills_error}</span>
              </FormHelperText>
            ) : null} */}
            <ChipsForFields
              values={key_skills}
              isItEditMode={isItEditMode}
              onDelete={key => {
                this.removeElementFromState('key_skills', key);
              }}
            />
            <div className="character-info-section">
              <CustomTag text="Character left : " className="character-left" />
              <CustomTag text={250 - calculateTotalCount(key_skills)} className="count" />
            </div>
          </div>
        </div>
        {/* </div> */}
      </CollapsibleComponentUserProfile>
    );
  }
}
export default withStyles(styles)(UserKeySkills);
