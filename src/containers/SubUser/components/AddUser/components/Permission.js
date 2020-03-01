//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {toast} from 'react-toastify';
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  withStyles
} from '@material-ui/core';
//styles
import './style.scss';
//utilities
//icons
import tooltipIcon from '../../../../../../assets/media/icons/tooltip-2.svg';
//custom components
import CustomIcon from '../../../../../components/CustomIcon';
//toast message style customizatons
toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});

//material ui theme customizations
const styles = theme => ({
  root: {width: '100%', boxShadow: 'none'},
  table: {minWidth: 500},
  tableWrapper: {overflowX: 'auto'},
});

const checkBoxsToastMessages = {
  'Admin': 'This Subuser now has the right to access and grant everything for the employer profile',
  'Add Sub User': 'This Subuser now has the right to add another sub user',
  'Post Jobs': 'This Subuser now has the right to post a job and hire a candidate',
  'Search Resume - Video': 'This Subuser now has the right to view the video resume of a candidate',
  'Search Resume': 'This Subuser now has the right to view and download the resume of a candidate',
  'Report': 'This Subuser now has the right to view and download the employer report',

};
//tooltip messages to show on permission hover
const checkBoxsTooltips = {
  'Admin': 'This feature shall make Subuser an admin, and will grant them access to all the activities of the Employer',
  'Add Sub User': 'This feature shall allow the user to add the Subuser. Anyone who is having this permission can add another Subuser, but can grant permission within his limits only. For example, if the user has the permission to ‘Post Jobs’ and ‘Add SubUser’ and he  tries to add another Subuser, he can only grant them ‘Post Jobs’ and ‘Add Subuser’ permission',
  'Post Jobs': 'This feature shall allow the Subuser to post jobs and hire a candidate',
  'Search Resume - Video': 'This feature shall allow the Subuser to view the video resume of a candidate',
  'Search Resume': 'This feature shall allow the Subuser to view and download the resume of a candidate',
  'Report': 'This feature shall allow the Subuser to view and download the employer report',

};

/**
 * This component used to show each permission of a subuser
 */
class Permission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
  }

  permission = '';

  componentWillReceiveProps(nextProps) {
    this.setState({
      rows: nextProps.permissionData
    })
  }

  /**
   * @function to handle the checkbox change of a permission
   * @param event: checkbox field events object
   * @param row: permission data
   */
  checkPermission(event, row) {
    if (event.target.checked) {
      toast(`${checkBoxsToastMessages[row.permission_name]}`, {});
      //If Permission name is admin, all permissions are checked
      if (row.permission_name == 'Admin') {
        const {rows} = this.state;
        for (let permission of rows) {
          permission.isPermissionChecked = true
        }
        this.setState({rows}, () => {
          this.props.savedData(this.state.rows)
        })
      } else {
        //other than admin, check only those permission which we got from props
        const {rows} = this.state;
        rows.find(permission => permission.permission_name == row.permission_name).isPermissionChecked = true
        this.setState({rows}, () => {
          this.props.savedData(this.state.rows)
        })
      }
    } else {
      const {rows} = this.state;
      //If Permission name is admin, all permissions are unchecked
      if (row.permission_name == 'Admin')
        for (let permission of rows) {
          permission.isPermissionChecked = false
        }
      else {
        //other than admin, uncheck only those permission which we got from props
        rows.find(permission => permission.permission_name == row.permission_name).isPermissionChecked = false
      }
      this.setState({rows}, () => {
        this.props.savedData(this.state.rows)
      })
    }
  }

  render() {
    const {classes} = this.props;
    const {rows} = this.state;
    return (
      <Paper className={classes.root}>
        <div className="userList">
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell align="left">Permissions</TableCell>
                <TableCell align="left">All Rights</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="left" style={{display: 'flex', alignItems: 'center'}}>
                    {row.permission_name}
                    {checkBoxsTooltips[row.permission_name] &&
                    <Tooltip disableFocusListener disableTouchListener title={checkBoxsTooltips[row.permission_name]}
                             placement="right">
                      <span className="ml-8"><CustomIcon icon={tooltipIcon}/></span>
                    </Tooltip>
                    }
                  </TableCell>
                  <TableCell align="left" scope="row">
                    <Checkbox disabled={this.props.checkboxEnable == true || this.props.isEmailValidUpdateCheck}
                              checked={row.isPermissionChecked}
                              onClick={(e) => this.checkPermission(event, row, index)}></Checkbox>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

Permission.propTypes = {classes: PropTypes.object.isRequired};
const mapStateToProps = state => ({formData: state.form.ProfileSection});

export default connect(mapStateToProps)(withStyles(styles)(Permission));
