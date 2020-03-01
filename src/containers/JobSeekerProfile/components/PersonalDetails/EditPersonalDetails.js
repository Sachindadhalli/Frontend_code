//library dependency
import React, { Component } from 'react';
import { FormControl, Input, withStyles, Grid, InputAdornment, createMuiTheme, MuiThemeProvider, FormHelperText} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//custom components
import CustomIcon from "../../../../components/CustomIcon/CustomIcon";
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent'
import CustomTag from '../../../../components/CustomTag';
import NonCreatableSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';
import NonCreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown';
import EditLanguageComponent from '../../../../components/ReusableComponents/LanguageComponent/EditLanguageComponent';
import NonCreatableRemoteDataMultiSelectDropdown from '../../../../components/MultiSelectDropdownWrapper/components/NonCreatableRemoteDataMultiSelectDropdown';
//styles
import './styles.scss';

//utilities

//icons
import calendar from "../../../../../assets/media/icons/calendar.svg";
import add from "../../../../../assets/media/icons/add.png";
import customisedMaterial from "../../../../styles/customisedMaterial";
import {CITY, COUNTRY} from "../../../../../config/constants";

/**
 * used to overrides material ui componets styles
 * @returns {{}}
 */
const styles = () => ({...customisedMaterial});

/**
 * drop down options value
 * @type {*[]}
 */
const marital_options=[{value:'Single/Unmarried',key:1},{value:'Married',key:2},{value:'Windowed',key:3},{value:'Divorced',key:4},{value:'Separated',key:5},{value:'Other',key:6}];
const category_options=[{value:'General',key:1},{value:'SC',key:2},{value:'ST',key:3},{value:'NT',key:4},{value:'SBC',key:5},{value:'OBC - Creamy',key:6},{value:'OBC - Non Creamy',key:7}];

/**
 * used to overrides date picker theme as a shenzyn theme
 */
export const customTheme = createMuiTheme({
  palette: {
    primary: { main: '#e73a9e', light:  '#212121', dark: '#212121',},
    secondary: { main: '#e73a9e',},
  },
});

class EditPersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birth_date:null,
      birth_date_error:"",
      permanent_address:'',
      permanent_address_error:'',
      area_pincode:'',
      area_pincode_error:'',
      permanent_residency_for:[],
      permanent_residency_for_error:'',
      passport_number:'',
      passport_number_error:'',
      marital:'',
      martial_error:'',
      category:'',
      category_error:'',
      radio_out:'',
      hometown:{"key":"", value:""},
      hometown_error:'',
      language:[
        { language:'', read:false, write:false, speak:false }
      ]
    }
  }

  /**
   * under process
   */
  removeErrorFocus=()=>{

  };

  /**
   * call validatation functions depend upon label
   * @param label
   */
  validateFields=(label)=>{
    switch (label){
      case 'birth_date':
        this.validateDateOfBirth();
        return;
      case 'permanent_address':
        this.validatePermanentAddress();
        return;
      default:
        return;
    }

  };

  /**
   * validate date of birth and set error depending upon value
   */
  validateDateOfBirth=()=>{
    const { birth_date } =  this.state;
    let error_value='';
    if(birth_date){

    }
    this.setErrorField('birth_date',error_value)
  };

  /**
   * validate permanent address and set error depending upon value
   */
  validatePermanentAddress=()=>{
    const { permanent_address } =  this.state;
    let error_value='';
    if(permanent_address){

    }
    this.setErrorField('permanent_address',error_value)
  };

  /**
   * set error for defined state variable, here state variable defined by label and value is defined by value
   * @param label
   * @param value
   */
  setErrorField=(label, value)=>{
    let error_field = `${label}_error`;
    this.setState({error_field:value})
  };

  /**
   * handle input chnage function used to set field value in set variable
   * @param options
   * @param label
   */
  handleInputChange=(options, label)=>{
    this.setState({[label]:options})
  };

  /**
   * set values in state variable for variables having data of array
   * it will check first is data is already exist or not
   * @param options
   * @param label
   */
  handleMultipleInputChange=(options, label)=>{
    const opt = this.state[label];
    if (options) {
      for (let option of options) {
        let index = opt.findIndex((optionSelected) => optionSelected.key === option.value);
        if (index > -1) {
        } else {
          opt.push({key: option.value, value: option.label})
        }
      }
      this.setState({[label]: opt}, () => {})
    }
  };

  /**
   * under process
   * @param field_error
   * @param error_handler
   */
  onErrorChange=(field_error,error_handler)=>{};

  /**
   * handle radio button change and upade values for radio change in state variable
   * @param e
   */
  handleChangeRadio=(e)=>{
    this.setState({radio_out:e.target.value})
  };

  /**
   * update language data in state variable depends upon index
   * @param data
   * @param index
   */
  onLanguageDataChange=(data, index)=>{
    let language = this.state.language;
    language.map((value,ind)=>{
      if(index==ind){
        value['language'] = data["language"];
        value['read'] = data["read"];
        value['write'] = data["write"];
        value['speak'] = data["speak"];
      }
    });
    this.setState({language:language})
  };
  /**
   * deleting specified object by index in language state variable
   * @param index
   */
  onDeleteLanguageData=(index)=>{
    const { language } = this.state;
    language.splice(index,1);
    this.setState({language:language})
  };
  /**
   * adding empty language details in language state variable of language for add language
   */
  addLanguageClick=()=>{
    const { language } = this.state;
    language.push({ language:'', read:false, write:false, speak:false });
    this.setState({language:language})
  };

  render(){
    const { birth_date_error, birth_date, permanent_address, permanent_address_error , marital, marital_error,
      area_pincode, area_pincode_error, category, category_error, radio_out, hometown, hometown_error, language,
      passport_number,passport_number_error, permanent_residency_for, permanent_residency_for_error } = this.state;
    const { classes } = this.props;
    return (
      <div className='edit-personal-details-main-wrapper'>
        <div style={{"paddingBottom":"44px"}}>
          <Grid container spacing={16} >
            <Grid item xs={12} md={6}>
              <FormControl style={{width:"90%"}} error={!!birth_date_error}>
                <label className="date-label-name date-label-margin"> Date of Birth</label>
                <MuiThemeProvider theme={customTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      className="date-picker-margin-0"
                      id="birth_date"
                      name="birth_date"
                      margin="normal"
                      clearable={true}
                      value={birth_date}
                      format="dd MMM yyyy"
                      maxDate={new Date()}
                      onChange={(value)=>this.handleInputChange(value, 'birth_date')}
                      onBlur={()=>this.validateFields('birth_date')}
                      onFocus={this.removeErrorFocus}
                      error={birth_date_error}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <CustomIcon icon={calendar} className="search-icon" />
                        </InputAdornment>,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </MuiThemeProvider>
                {birth_date_error && <FormHelperText style={{color:"#f0582b"}}>{birth_date_error}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabelValueComponent label='Gender' value={"Female"}/>
            </Grid>
          </Grid>
        </div>
        <div style={{"paddingBottom":"34px"}}>
          <Grid container spacing={16} >
            <Grid item xs={12} md={12}>
              <FormControl error={permanent_address_error} fullWidth={true}>
                <label className="field-label-name date-label-margin"> Permanent Address </label>
                <Input
                  name="permanent_address"
                  onChange={(e)=>this.handleInputChange(e.target.value, 'permanent_address')}
                  value={permanent_address}
                  multiline={true}
                  classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
                >
                </Input>
                <div className='max-limit-number-wrapper'>
                  <CustomTag text="Character Count of : " className="maximum-character-limit" />
                  <CustomTag text={permanent_address ? 100-permanent_address.length: 100} className="count" />
                </div>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div style={{"paddingBottom":"44px"}}>
          <Grid container spacing={16} >
            <Grid item xs={12} md={6}>
              <FormControl error={area_pincode_error} fullWidth={true}>
                <label className="field-label-name date-label-margin"> Area Pincode</label>
                <Input
                  name="area_pincode"
                  onChange={(e)=>this.handleInputChange(e.target.value, 'area_pincode')}
                  value={area_pincode}
                  multiline={true}
                  classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
                >
                </Input>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl error={hometown_error} fullWidth={true}>
                <label className="field-label-name"> Hometown (City) </label>
                <NonCreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={CITY}
                  queryParams={{search:'', country:'', state:'', format:'json'}}
                  getSelectedOption={(option)=>this.handleInputChange(option, 'hometown')}
                  isClearable={false}
                  defaultValue={hometown?hometown:{}}
                  error={hometown_error}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div style={{"paddingBottom":"44px"}}>
          <Grid container spacing={16} >
            <Grid item xs={12} md={6}>
              <FormControl error={permanent_residency_for_error} fullWidth={true}>
                <label className="field-label-name"> Permanent Residency for </label>
                <NonCreatableRemoteDataMultiSelectDropdown
                  isSearchable={true}
                  apiUrl={COUNTRY}
                  queryParams={{ search: '', format: 'json' }}
                  getSelectedOption={(option) => this.handleMultipleInputChange(option,'permanent_residency_for')}
                  editable={true}
                  defaultValue={permanent_residency_for?permanent_residency_for:[]}
                  error={permanent_residency_for_error}
                  // maxOptions={4}
                  gettingError={(error)=>this.onErrorChange('permanent_residency_for' , error)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl error={passport_number_error} fullWidth={true}>
                <label className="field-label-name date-label-margin"> Passport Number</label>
                <Input
                  name="passport_number"
                  onChange={(e)=>this.handleInputChange(e.target.value,'passport_number')}
                  value={passport_number}
                  multiline={true}
                  classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
                >
                </Input>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div style={{"paddingBottom":"44px"}}>
          <Grid container spacing={16} >
            <Grid item xs={12} md={6}>
              <FormControl error={marital_error} fullWidth={true}>
                <label className="date-label-name"> Marital Status</label>
                <NonCreatableSingleSelectDropdown
                  getSelectedOption={(option)=>this.handleInputChange(option, 'marital')}
                  defaultValue={marital?marital:''}
                  options={marital_options}
                  error={''}
                  style={{width:"90%"}}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl error={category_error} fullWidth={true}>
                <label className="date-label-name"> Category </label>
                <NonCreatableSingleSelectDropdown
                  getSelectedOption={(option)=>this.handleInputChange(option, 'category')}
                  defaultValue={category?category:''}
                  options={category_options}
                  error={''}
                  style={{width:"90%"}}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div style={{"paddingBottom":"34px"}}>
          <Grid container spacing={16} >
            <Grid item xs={12} md={6}>
              <FormControl style={{width:'100%'}}>
                <label className="date-label-name"> Differently Abled </label>
                <RadioGroup aria-label="position" name="position" value={radio_out} onChange={this.handleChangeRadio} row>
                  <FormControlLabel
                    style={{width:'50%'}}
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    classes={{label:classes.RadioButtonLabel}}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    style={{width:'40%'}}
                    value="No"
                    control={<Radio />}
                    label="No"
                    classes={{label:classes.RadioButtonLabel}}
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div>
          <div className={'language-main-wrapper'}>
            <div className={'language-proficiency-wrapper'}>
              <div className={'language-container'}>
                <span>Language</span>
                <span className='add-icon' onClick={()=>this.addLanguageClick()}><CustomIcon icon={add} > </CustomIcon></span>
              </div>
              <div className={'proficiency-container'}>
                Proficiency
              </div>
            </div>
            {language.map((value, index)=>{
              return <EditLanguageComponent
                onChangeData={(data)=>this.onLanguageDataChange(data, index)}
                onDeleteData={()=>this.onDeleteLanguageData(index)}
                data={value}
              />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default  withStyles(styles)(EditPersonalDetails);
