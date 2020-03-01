//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, InputAdornment} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
//style
import './style.scss';
//icon
import profileImage1 from '../../../assets/media/images/profile-image.jpg';
import notification from '../../../assets/media/icons/notification.svg';
import group from '../../../assets/media/icons/group.svg';
import search from '../../../assets/media/icons/search.svg';
//custom component
import CustomIcon from '../../components/CustomIcon';
//material ui theme customizations
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  'input': {
    '&::placeholder': {
      width: '51px', height: '19px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'normal',
      fontStyle: 'normal', fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: '#656565',
      opacity: '1'
    }
  }
});

class EmployerTopMenu extends Component {
  render() {
    return (
      <div className="employer-top-menu">
        <div className="employer-search-field">
          <Input
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <CustomIcon icon={search} className="search-icon"/>
              </InputAdornment>
            }
            classes={{input: this.props.classes['input']}}
          />
        </div>
        <CustomIcon icon={group} className="message-icon"/>
        <CustomIcon icon={notification}/>
        <CustomIcon icon={profileImage1} className="profile-icon"/>
      </div>
    );
  }
}

EmployerTopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployerTopMenu);
