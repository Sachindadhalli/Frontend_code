//library dependencies
import React, {Component} from 'react';
import {withStyles, InputLabel, FormControl, FormHelperText} from '@material-ui/core';
import PropTypes from 'prop-types';

//style
import customisedMaterial from '../../../../styles/customisedMaterial';
import './style.scss';

//icon

//custom component
import NonCreatableRemoteDataSingleSelectDropdown from
    "../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown/NonCreatableRemoteDataSingleSelectDropdown";
//utilities
import {COUNTRY, CITY, JOB_ROLE} from '../../../../../config/constants';

// customised the material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  Input: {flexBasis: 200,},
  button: {margin: '11px', borderRadius: '20px'},
  input: {display: 'none',},
  formControl: {marginBottom: '5px',},
  paper: {padding: theme.spacing.unit * 2, textAlign: 'center', color: theme.palette.text.secondary,},
  label: {
    fontSize: '16px', color: 'black', fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal',
    lineHeight: 'normal', letterSpacing: 'normal',
  },
  helperText: {
    color: '#656565', fontSize: '16px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',
  },
  selectText: {
    color: 'black', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal', overFlow: 'hidden',
  },
  ...customisedMaterial
});

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.country,
      location: this.props.location,
      country_error: '',
      location_error: '',
      isValid: true,
    }
  }

  componentDidMount() {
    // creating references of component to performing validation from parent component
    this.props.onRef(this)
  }

  componentWillUnmount() {
    // removing the reference of this component
    this.props.onRef(null)
  }

  componentWillReceiveProps(nextProps) {
    // receiving the values after every change to update
    this.setState({country: nextProps.country, location: nextProps.location})
  }

  /**
   * To validate country
   * @return: updating state with new target value
   * */
  validateCountry = () => {
    const locations = {location: this.state.location, country: this.state.country};
    const country = this.state.country.value;
    this.props.modifyLocation(this.props.index, locations);
    let errorHere = "";
    if (country === "" || country === undefined) errorHere = "Kindly specify  your location";
    this.setState({'country_error': errorHere,});
    return !!errorHere;
  };

  /**
   * To validate city
   * @return: updating state with new target value
   * */
  validateLocation = () => {
    let isValid = true;
    const locations = {location: this.state.location, country: this.state.country};
    this.props.modifyLocation(this.props.index, locations);
    const location = this.state.location && this.state.location.value ? this.state.location.value : "";
    let errorHere = ""
    if (location === "" || location === undefined) errorHere = "Kindly specify City";
    this.setState({'location_error': errorHere,});
    return !!errorHere;
  };

  /**
   * To validate country and location with child ref
   * @return: a boolean
   * */
  validateLocationCountry = async () => {
    return !(!(await this.validateCountry()) && !(await this.validateLocation()));
  };
  /**
   * To change of country
   * @param: name,value
   * @return: updating state with new target value
   * */
  changeCountry = (name, value) => {
    this.setState({[name]: value,}, () => this.validateCountry())
  };
  /**
   * To change of city
   * @param: name,value
   * @return: updating state with new target value
   * */
  changeCity = (name, value) => {
    this.setState({[name]: value,}, () => this.validateLocation())
  };

  render() {
    const {classes, index} = this.props;
    const {country, location, country_error, location_error} = this.state;
    return (
      <div className="location-item" key={index}>
        <FormControl className={"form-child left-child-form " + classes.formControl} error={country_error !== ""}>
          <InputLabel
            style={{marginTop: '-12px'}}
            className="change-label-style"
            shrink={true}
            classes={{root: classes.cssLabel, focused: classes.cssFocused, error: classes.cssError}}>
            {'Country'}
          </InputLabel>

          <NonCreatableRemoteDataSingleSelectDropdown
            isSearchable={true}
            apiUrl={COUNTRY}
            queryParams={{search: ''}}
            getSelectedOption={(option) => this.changeCountry('country', {key: option.value, value: option.label})}
            isClearable={false}
            defaultValue={country ? {value: country.key, label: country.value} : {}}
            error={country_error}/>

          <FormHelperText><span className="field_error">{country_error}</span></FormHelperText>
        </FormControl>

        <FormControl className="form-child-locaion" style={{'width': '45.5%'}} error={location_error !== ""}>
          <InputLabel
            style={{marginTop: '-12px'}}
            className="change-label-style"
            shrink={true}
            classes={{root: classes.cssLabel, focused: classes.cssFocused, error: classes.cssError}}>
            {'City'}
          </InputLabel>

          <NonCreatableRemoteDataSingleSelectDropdown
            isSearchable={true}
            apiUrl={CITY}
            queryParams={{search: '', state: '', country: this.state.country.value}}
            getSelectedOption={(option) => this.changeCity('location', {key: option.value, value: option.label})}
            isClearable={false}
            defaultValue={location ? {value: location.key, label: location.value} : {}}
            error={location_error}/>
          <FormHelperText><span className="field_error">{location_error}</span></FormHelperText>
        </FormControl>
        {
          index !== 0 ? <FormControl style={{marginLeft: '11px'}} className="shape-minus">
            <div className="shape" style={{marginTop: '-12px'}} onClick={this.props.removeLocation}>
              <div className="minus">-</div>
            </div>
          </FormControl> : null
        }
      </div>
    );
  }
}

Location.propTypes = {classes: PropTypes.object.isRequired,};

export default withStyles(styles)(Location);
