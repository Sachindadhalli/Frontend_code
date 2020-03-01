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
import { withRouter } from 'react-router-dom';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import { CURRENCY } from '../../../../../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../Utilities/';
import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import BasicEdit from './components/BasicEdit';
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
  //rightHalf: '100%',
  //leftHalf: '47.5%',
  fullWidth: '275px',
};
const experiences = [];
for (let i = 1; i <= 30; i++) {
  experiences.push(i.toString());
}

class UserBasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.user_profile,

      value: 'search',
      currency_error: '',
      editMode: false,
    };
  }
  componentWillMount() {
    //debugger;
    // this.setState({
    //   value: this.props.history.location.pathname == 'user-profile' ? 'search' : 'advance',
    // });
  }
  valdiateCurrency = () => {
    const currency = this.state.currency.value;
    let errorHere = '';
    if (currency == '') {
      errorHere = 'Kindly specify currency';
    }
    this.setParticularState('currency_error', errorHere);
  };

  validateFormData = name => {
    switch (name) {
      case 'currency':
        this.valdiateCurrency();
        break;
    }
  };

  validateAllForm = () => {
    const fields = ['currency', 'month', 'year'];
    fields.map(value => {
      this.validateFormData(value);
    });
  };

  handleChange = event => {
    //debugger;
    this.setState({ value: event.target.value });
    if (event.target.value == 'advance') {
      this.props.history.push({ pathname: 'exp-profile' });
    } else {
      this.props.history.push({ pathname: 'user-profile' });
    }
  };
  toggle = () => {
    this.setState({ usersave: !this.state.usersave });
  };
  createItem = () => {
    this.setState({ activeItem: item, usersave: !this.state.usersave });
  };
  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleNavigationClick = () => {
    //debugger;
    this.props.history.push({ pathname: 'exp-profile' });
  };
  checkValidationsOnSave = e => {
    this.basicDetailsReference.checkForErrors();
  };
  render() {
    const { classes } = this.props;
    const { currency, month, year } = this.state;
    const { currency_error } = this.state;
    const { fullWidth } = allDropDownWidth;
    return (
      <CollapsibleComponentUserProfile
        onSaveClick={this.checkValidationsOnSave}
        collapsibleTitle="Basic Details"
        showAddButtow={false}
        showEdit={this.state.editMode}
      >
        <BasicEdit
          type={'fresher'}
          onRef={ref => (this.basicDetailsReference = ref)}
          history={this.props.history}
        />
        {/* <div className={'basic-user-container'}> */}
        {/* {this.props.type == 'fresher' ? <div>im fresher</div> : <div>Im experienced</div>} */}

        {/* <div className="save-emp-header">
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
              <CustomTag text="Basic Details" className="mx-15" />
            </div>
          </div>
          <div className="hr-line" /> */}
        {/* <CollapsibleComponentUserProfile collapsibleTitle="Basic Details" showAddButtow={false}> */}
        {/* <div className="first">
            <div className="box-pro">
              <div className="fres-text">Experience</div>
              <div className="search-type-radio-buttons wrapper1">
                <div className="second">
                  <FormControl component="fieldset" className="radio-button-control">
                    <RadioGroup
                      aria-label="Gender"
                      name="gender1"
                      className="search-radio-buttons"
                      //value={this.state.value}
                      value={this.props.type == 'fresher' ? 'search' : 'advance'}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="search" control={<Radio />} label="Fresher" />
                      <FormControlLabel value="advance" control={<Radio />} label="Experienced" />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="annual-salary">
              <div className="full-form-child annual-salary-fields">
                <div className="form-child" style={{ marginLeft: '-14px' }}>
                  <div className="save-details-header">
                    <div className="update">
                      <CustomTag text="Update" className="save" />
                    </div>
                    <Input
                      id="mobile"
                      placeholder="Mobile Number"
                      className="mobile"
                      // onChange={this.handleChange('name')}
                      margin="normal"
                      //style={{ marginTop: '30px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div> */}
      </CollapsibleComponentUserProfile>
    );
  }
}

export default withStyles(styles)(UserBasicDetails);
