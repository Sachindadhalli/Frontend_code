//library dependencies
import React, {Component} from 'react';
import {withStyles, InputAdornment, Input} from '@material-ui/core';

//icons
import search from '../../../assets/media/icons/search.svg';

//custom component
import CustomIcon from '../CustomIcon';

//Customised material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  input: { '&::placeholder': {width: '51px', height: '19px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'normal',
      fontStyle: 'normal', fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: '#656565', opacity: '1',},
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  /**
   * on change in input field,updating state and call back to parent for action
   * @param event
   */
  handleChange = event => {
    this.setState({
      inputValue: event.target.value,
    });
    this.props.onSearchChange(event);
  };

  render() {
    return (
      <div className="employer-search-field">
        <Input
          placeholder="Search"
          onChange={this.handleChange}
          value={this.state.inputValue}
          startAdornment={
            <InputAdornment position="start">
              <CustomIcon icon={search} className="search-icon"/>
            </InputAdornment>
          }
          classes={{input: this.props.classes.input}}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
