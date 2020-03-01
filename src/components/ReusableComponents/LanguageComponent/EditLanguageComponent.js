//library dependency
import React, {Component} from 'react';
import {FormControl, withStyles, Grid, FormControlLabel, Checkbox} from '@material-ui/core';

//style
import './styles.scss';

//utilities
import language_options from './Languages.json';

//icons
import Close from '../../../../assets/media/icons/croosIcon.png';

//custom component
import NonCreatableSingleSelectDropdown
  from '../../SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';

//customization of material
const styles = () => ({
  CheckboxLabel: {
    fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal',
    lineHeight: 'normal', letterSpacing: 'normal', color: '#212121'
  }
});

//customization of checkbox
const PinkCheckbox = withStyles({
  root: {color: "#e0e0e0", '&$checked': {color: "#e73a9e",},},
})(props => <Checkbox color="default" {...props} />);


class EditLanguageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      language_error: '',
      read: false,
      write: false,
      speak: false
    }
  }

  /**
   * on change in the language Drop down
   * @param option
   */
  handleInput = (option) => {
    this.setState({language: option}, () => this.props.onChangeData(this.state))
  };
  /**
   * on change in the checkbox
   * @param label
   */
  handleChange = (label) => {
    this.setState({[label]: !this.state[label]}, () => this.props.onChangeData(this.state))
  };

  componentWillReceiveProps(nextProps) {
    // on change in the value,receiving props,updating the state
    const {data} = nextProps;
    this.setState({language: data.language, read: data.read, write: data.write, speak: data.speak})
  }

  render() {
    const {language, language_error} = this.state;
    const {classes} = this.props;
    return (
      <div className="edit-language-component-main-wrapper">
        <div className='language-dropdown-container'>
          <FormControl error={language_error} fullWidth={true}>
            <NonCreatableSingleSelectDropdown
              getSelectedOption={(option) => this.handleInput(option)}
              defaultValue={language ? language : ''}
              options={language_options}
              error={''}
              isSearchable={true}
              style={{width: "90%"}}
            />
          </FormControl>
        </div>
        <div className="proficiency-checkbox-container">
          <div>
            <FormControlLabel
              control={
                <PinkCheckbox
                  checked={this.state.read}
                  onChange={() => this.handleChange('read')}
                  value="read"
                />
              }
              classes={{label: classes.CheckboxLabel}}
              label="Read"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <PinkCheckbox
                  checked={this.state.write}
                  onChange={() => this.handleChange('write')}
                  value="write"
                />
              }
              classes={{label: classes.CheckboxLabel}}
              label="Write"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <PinkCheckbox
                  checked={this.state.speak}
                  onChange={() => this.handleChange('speak')}
                  value="speak"
                />
              }
              classes={{label: classes.CheckboxLabel}}
              label="Speak"
            />
          </div>
          <div>
            <img src={Close} width={"20px"} height={"20px"} onClick={() => this.props.onDeleteData()}/>
          </div>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(EditLanguageComponent);
