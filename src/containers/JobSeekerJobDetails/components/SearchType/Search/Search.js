//library dependencies
import React, {Component} from 'react';
import {withStyles, Input, InputLabel} from '@material-ui/core';
import PropTypes from 'prop-types';

//styles
import './styles.scss';

//custom components
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';

//utilities
import {JOB_LISTING_SKILLS_COMPANY_DESIGNATION, CITY} from '../../../../../../config/constants';

// styles used to overrides material ui styles
const styles = theme => ({
  container: {display: 'flex', flexWrap: 'wrap',},
  textField: {marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, width: 200,},
  dense: {marginTop: 19,},
  menu: {width: 200,},
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'search', experience: '', salary: '', text: '',};
  }

  /**
   * this function used to handle search text and stores in state variable
   * @param experience
   * @returns {function(*): void}
   */
  handleTextChange = experience => event => this.setState({[experience]: event.target.value});

  /**
   * this function used to handle salary change and stores in state variable
   * @param salary
   * @returns {function(*): void}
   */
  handleSalaryChange = salary => event => this.setState({salary: event.target.value});

  /**
   * this function use to handle state variable change as per input change
   * @param event
   */
  handleChange = event => this.setState({value: event.target.value});

  render() {
    const {classes} = this.props;
    return (
      <div className="search-type-fields-div">
        <div className="search-type-skill-multiselect">
          <div className="search-type-skills">
            <MultiSelect
              apiUrl={JOB_LISTING_SKILLS_COMPANY_DESIGNATION}
              fieldWidth="500px"
              label="Skills, Designation, Companies"
            />
          </div>
          <div className="search-type-location">
            <MultiSelect apiUrl={CITY} label="Location" fieldWidth="225px"/>
          </div>
        </div>
        <div className="search-type-textfields">
          <div className="search-type-req-experience">
            <InputLabel
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Experience (in years)
            </InputLabel>
            <Input
              name="standard-name"
              classes={{
                underline: classes.cssUnderline,
                focused: classes.cssFocused,
              }}
              value={this.state.experience}
              onChange={this.handleTextChange('experience')}
              margin="normal"
              style={{marginTop: '0px'}}
              type="number"
            />
          </div>
          <div className="search-type-salary">
            <InputLabel
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Salary (in lacs)
            </InputLabel>
            <Input
              name="standard-name"
              classes={{
                underline: classes.cssUnderline,
                focused: classes.cssFocused,
              }}
              value={this.state.salary}
              onChange={this.handleSalaryChange('salary')}
              margin="normal"
              style={{marginTop: '0px'}}
              type="number"
            />
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {classes: PropTypes.object.isRequired,};

export default withStyles(styles)(Search);
