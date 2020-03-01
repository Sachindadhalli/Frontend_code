//library dependencies
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types';
import {FormControl, InputLabel, Input, FormHelperText} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

//style
import './style.scss';

//utilities
import {apiCall, handleLocalStorage} from '../../../../../../Utilities';

//custom components
import CustomTag from '../../../../../../components/CustomTag';

//customised material ui style
const styles = theme => ({
  root: {
    display: 'flex', flexWrap: 'wrap', flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  margin: { margin: theme.spacing.unit, },
  withoutLabel: { marginTop: theme.spacing.unit * 3, },
  textField: { flexBasis: 200, },
  formControl: { margin: theme.spacing.unit,  minWidth: 120, },
  selectEmpty: { marginTop: theme.spacing.unit * 2, },
  cssLabel: { color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400, },
  cssError: { color: '#656565 !important',  fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400, },
});

class ProfileHeadLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headLine: ''
    }
    this.getDataFromApiAndMapToProps()
  }

  /**
   * on change in input field headline
   * @param event
   */
  handleInput = (event = false) => {
    const {name} = event.target
    const {value} = event.target
    if (value.length <= 300) {
      this.setState({
        [name]: value
      }, () => {
        if (name == "headLine") this.validateProfileHeadLine();
      })
    }
  };
  /**
   * on click save button
   * @returns {Promise<void>}
   */
  handleSave = async () => {
    if (this.validateProfileHeadLine())
      return;
    try {
      let headers = {
        'authorization': handleLocalStorage('get', 'employerLogin'),
        'Content-Type': 'application/json',
      };
      const preparedData ={ headline: this.state.headLine };
      let responseAfterSave = await apiCall('get', preparedData, 'employer-homepage/update-profile-headline/', headers);
      if (responseAfterSave && responseAfterSave.status) {
        this.props.toast(`${responseAfterSave.message}`, {})
        this.props.toggleEditMode()
      } else {
        this.props.toast(`${responseAfterSave.message}`, {})
      }
    } catch (e) {
      this.props.toast(`${"Unable to reach our servers at this moment"}`, {})
    }
  };

  /**
   * on click Discard changes button
   * @returns {Promise<void>}
   */
  disCardChanges = async () => {
    this.getDataFromApiAndMapToProps();
    this.props.toggleEditMode()
  };

  /**
   * To get the previously saved data from an api
   * @returns {Promise<void>}
   */
  getDataFromApiAndMapToProps = async () => {
    try {
      let headers = {
        'authorization': handleLocalStorage('get', 'employerLogin'),
        'Content-Type': 'application/json',
      };
      let headLineData = await apiCall('get', null, 'employer-homepage/get-profile-headline/', headers);
      if (headLineData && headLineData.status) {
        this.setState({
          headLine: headLineData.data || ''
        })
      }
    }
    catch (e) {}
  };
  /**
   * validate the profile Headline
   * @returns {boolean}
   */
  validateProfileHeadLine = () => {
    const {headLine} = this.state;
    let headLineError = '';
    if (!headLine || headLine.length > 300)
      headLineError = "Kindly enter a valid profile headline";
    else headLineError = '';
    this.setState({headLineError})
    return headLineError ? true : false;
  };

  render() {
    const {isItEditMode, toggleEditMode, classes} = this.props;
    const {
      headLine,
      headLineError
    } = this.state
    return (
      <div id="profile-head-line">
        <div className="section px-16 px-sm-44 pt-sm-40 pt-16 pb-20 pb-sm-44">
          <div className="header">
            <div className="shenzyn-classic-text">
              Let us create your profile headline.
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
            {isItEditMode ?
              <div className="row">
                <FormControl
                  className={"w-100-p"}
                  error={!!headLineError}
                >
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    }}
                    shrink={true}
                  >
                    Enter your headline here
                  </InputLabel>
                  <Input
                    name="headLine"
                    value={headLine}
                    margin="normal"
                    multiline={true}
                    onChange={this.handleInput}
                  />
                  {headLineError && <FormHelperText>{headLineError}</FormHelperText>}
                </FormControl>
                <div className="character-info-section w-100-p mt-8">
                  <CustomTag text="Character left: " className="character-left"/>&nbsp;
                  <CustomTag text={headLine === "" ? 300 : 300 - headLine.length} className="count"/>
                </div>
              </div> :
              <div className="row word-break">
                {headLine}
              </div>
            }

          </div>
        </div>

      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    headLine: state.empHomePage.jobDetails.headLine || ''
  }
}

ProfileHeadLine = connect(mapSateToProps)(withStyles(styles)(ProfileHeadLine));

export default ProfileHeadLine;
