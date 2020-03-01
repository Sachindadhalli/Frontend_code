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
import ExperiencedBasicDetailsEdit from '../../../UserProfileExperienced/components/ExperiencedBasicDetails/components/ExperiencedBasicDetailsEdit';
import CreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
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

class UserBasicDetailsExperienced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.user_profile,

      value: 'search',
      currency_error: '',
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
    this.expBasicDetailsReference.checkForErrors();
  };
  render() {
    const { classes } = this.props;
    const { currency, month, year } = this.state;
    const { currency_error } = this.state;
    const { fullWidth } = allDropDownWidth;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Basic Details"
        onSaveClick={this.checkValidationsOnSave}
        showAddButtow={false}
      >
        <ExperiencedBasicDetailsEdit
          onRef={ref => (this.expBasicDetailsReference = ref)}
          type={'experience'}
          history={this.props.history}
          {...{
            classes,
            year,
            month,
            dropdown,
          }}
        />
      </CollapsibleComponentUserProfile>
    );
  }
}

export default withStyles(styles)(UserBasicDetailsExperienced);
