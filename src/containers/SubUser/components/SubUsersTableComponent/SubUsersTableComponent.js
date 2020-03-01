//third party library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Modal, TableHead, Tooltip} from '@material-ui/core';
//styles
import './styles.scss';
//custom components
import ConformationDialog from '../../../../components/ConformationDialog';
import DeleteWithReason from '../../../../components/DeleteWithReason/DeleteWithReason';
import CustomIcon from '../../../../containers/JobSeekerSignup/CustomIcon';
//icons
import deleteIcon from '../../../../../assets/media/icons/delete.svg';
import edit from '../../../../../assets/media/icons/edit.svg';
import suspend from '../../../../../assets/media/icons/suspend.svg';
import reactive from "../../../../../assets/media/icons/reactivate.svg";
//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';
import {SUB_USER_LIST} from '../../../../../config/constants';

// TablePaginationActions's material ui theme customizations
const actionsStyles = theme => ({
  root: {flexShrink: 0, color: theme.palette.text.secondary, marginLeft: '104px',},
  spacer: {flex: '1 1 50%', border: '1px solid black',},
  caption: {display: 'none'}
});

//SubUsersTableComponent's material ui theme customizations
const styles = theme => ({
  root: {width: '100%', boxShadow: 'none'},
  table: {minWidth: 500,},
  tableWrapper: {overflowX: 'auto',},
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#626366',
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 13px 10px 15px',
    fontfamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.86,
    letterSpacing: 'normal'
  },
});

/**
 * Listing subuser accounts in a table and manipulate the subuser accounts.
 */
class SubUsersTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 10,
      buttonActionType: '',
      actionConformation: false,
      deleteConformation: false,
      deletedUser: '',
      actionType: '',
      table_headers: {},
      reason: '',
      modalHeadingText: '',
    };

    /**
     * bind this context to the userAction function,
     * to access SubUsersTableComponent's state and functions
     * @type {function(this:SubUsersTableComponent)}
     */
    this.userAction = this.userAction.bind(this)
  }

  /**
   * @function to get the sub users list on page change in pagination
   * @param {number} page: current page number
   */
  handleChangePage = (page) => {
    this.setState({page});
    this.props.currentPage({page: page, limit: this.state.rowsPerPage})
  };

  /**
   * @function to get the sub users list on rowsPerPage dropdown change
   * @param event
   */
  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: event.target.value}, () => {
      this.props.currentPage({page: this.state.page, limit: this.state.rowsPerPage})
    });
  };

  /**
   * @function to capture the actions trigger from subusers table
   * @param {Object} row: single subuser data
   * @param {string} actionType: type of action
   */
  userAction = (row, actionType) => {
    // if actionType is edit, redirecting to the edit page(means add new subuser page)
    if (actionType === 'edit') this.props.history.push({pathname: `/subuser/user/${row.id}/`});
    else if (actionType === 'deleted') {
      /**
       * if action type is deleted, open popup for user confirmation and
       * store the rowId and actionType in the component state
       */
      this.setState({
        deleteConformation: true,
        currentDeleteId: row.id,
        actionType: actionType,
        buttonActionType: actionType
      })
    } else {
      /**
       * if actionType is suspended or reactivate, open popup for user confirmation and
       * store the rowId and actionType in the component state
       */
      this.setState({
        actionConformation: true,
        deletedUser: row,
        actionType: actionType,
        buttonActionType: actionType === 'suspended' ? 'Suspend' : 'Reactive',
        modalHeadingText: actionType === 'suspended' ? "Are you sure you want to suspend this sub user?" : "Are you sure you want to Reactive this sub user?",
        currentDeleteId: row.id
      })
    }
  };

  /**
   * @function to capture the event of subuser delete or suspend or reactivate,
   * once user confirmed, we will make an api call to delete or suspend or reactivate the subuser
   * If actionType is delete, subuser reason should be sent to the backend.
   * else subuser reason will be ''
   */
  getConformationStatus = () => {
    //get the token from the localstorage
    let headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    let apiUrl = SUB_USER_LIST + this.state.currentDeleteId + '/';
    let requestBody = {
      employer_profile_status: this.state.actionType,
      sub_user_reason: this.state.reason
    };
    apiCall('patch', requestBody, apiUrl, headers).then(res => {
      if (res.status) {
        this.props.listUpdated(res.status);
        this.setState({
          actionConformation: false,
          deleteConformation: false,
          currentDeleteId: null
        })
      }
    })
  };

  /**
   * @function to close all the modals(popup)
   * @param {boolean} closeStatus
   */
  closeDialog = (closeStatus) => {
    if (closeStatus) {
      this.setState({
        actionConformation: false,
        deleteConformation: false,
        currentDeleteId: null
      })
    }
  };

  closeDeleteDialog = () => {
    this.setState({deleteConformation: false})
  };

  /**
   * @function to delete the subuser account.
   * @param deleteReason: reson to delete the subuser account
   */
  deleteMyAccount = (deleteReason) => {
    this.setState({reason: deleteReason.reason}, () => this.getConformationStatus());
  };

  render() {
    const {classes, rows, headers, selectedType, listCount} = this.props;
    const {rowsPerPage, page} = this.state;
    return (
      <React.Fragment>
        {rows.length > 0 ?
          <Paper className={classes.root}>
            <div className="subUserList" style={{minWidth: '99.99%', overflow: 'auto'}}>
              <Table style={{minWidth: '1024px', overflowY: 'hidden'}}>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell className="table-header-cell" align="center">Sr. No.</TableCell>
                    <TableCell className="table-header-cell" align="left">{headers.name}</TableCell>
                    <TableCell className="table-header-cell" align="left">{headers.email}</TableCell>
                    <TableCell className="table-header-cell" align="left">{headers.designation}</TableCell>
                    <TableCell className="table-header-cell" align="left">{headers.permissions}</TableCell>
                    {selectedType === 'active' &&
                    <TableCell className="table-header-cell" align="left">{headers.added_by}</TableCell>}
                    {selectedType === 'active' &&
                    <TableCell className="table-header-cell" align="left">Actions</TableCell>}
                    {selectedType === 'suspended' &&
                    <TableCell className="table-header-cell" align="left">{headers.suspended_for}</TableCell>}
                    {selectedType === 'suspended' &&
                    <TableCell className="table-header-cell" align="left">Actions</TableCell>}
                    {selectedType === 'deleted' &&
                    <TableCell className="table-header-cell" align="left">{headers.reason}</TableCell>}
                    {selectedType === 'deleted' &&
                    <TableCell className="table-header-cell" align="left">{headers.updated_on}</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={v4()}>
                      <TableCell className="table-data-cell"
                                 align="center">{this.state.page * this.state.rowsPerPage + (index + 1)}</TableCell>
                      <TableCell align="left" scope="row" className="table-data-cell">
                        {row.name}
                      </TableCell>
                      <TableCell className="table-data-cell" align="left">{row.email}</TableCell>
                      <TableCell className="table-data-cell" align="left">{row.designation}</TableCell>
                      <TableCell className="permission-data-cell table-data-cell" align="left" scope="row">
                        <div style={{display: 'flex', width: '100%', justifyContent: 'start', alignItems: 'center'}}>
                          <div>{row.permissions.split(",")[0]}</div>
                          {row.permissions && row.permissions.split(",").length > 1 &&
                          <Tooltip disableFocusListener disableTouchListener
                                   title={row.permissions.split(",").map(permission => (
                                     <div>{permission}</div>
                                   ))}
                                   placement="right-end" classes={{tooltip: classes.lightTooltip}}>
                            <div className="permission-count">
                              +{row.permissions.split(",").length >= 2 ? row.permissions.split(",").length - 1 : null}</div>
                          </Tooltip>}
                        </div>
                      </TableCell>
                      {
                        selectedType === "active" &&
                        <TableCell align="left" className="table-data-cell">{row.added_by}</TableCell>
                      }
                      {selectedType === "active" && <TableCell align="left" scope="row" className="table-data-cell">
                        <div style={{display: 'flex', textAlign: 'center', width: '100%'}}>
                          <CustomIcon title="Edit" icon={edit} style={{cursor: 'pointer', paddingRight: '24px'}}
                                      onClick={(e) => this.userAction(row, 'edit')}/>
                          <CustomIcon title="Suspend" icon={suspend} style={{cursor: 'pointer', paddingRight: '24px'}}
                                      onClick={(e) => this.userAction(row, 'suspended')}/>
                          <CustomIcon title="Delete" icon={deleteIcon} style={{cursor: 'pointer', paddingRight: '24px'}}
                                      onClick={(e) => this.userAction(row, 'deleted')}/>
                        </div>
                      </TableCell>}

                      {selectedType === "suspended" &&
                      <TableCell className="table-data-cell" align="left">{row.suspended_for}</TableCell>}
                      {selectedType === "suspended" && <TableCell className="table-data-cell" align="left">
                        <div style={{display: 'flex', textAlign: 'center', width: '100%'}}>
                          <CustomIcon title="Reactive" icon={reactive} style={{cursor: 'pointer', paddingRight: '24px'}}
                                      onClick={(e) => this.userAction(row, 'active')}/>
                          <CustomIcon title="Delete" icon={deleteIcon} style={{cursor: 'pointer', paddingRight: '24px'}}
                                      onClick={(e) => this.userAction(row, 'deleted')}/>
                        </div>
                      </TableCell>
                      }
                      {selectedType === "deleted" &&
                      <TableCell className="table-data-cell reason-data-cell" align="left">
                        <Tooltip disableFocusListener disableTouchListener title={row.reason}>
                          <div className="reason-ellipsis">{row.reason}</div>
                        </Tooltip>
                      </TableCell>}
                      {selectedType === "deleted" &&
                      <TableCell className="table-data-cell" align="left">{row.updated_on}</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      labelRowsPerPage=''
                      labelDisplayedRows={({from, to, count}) => ''}
                      rowsPerPageOptions={[]}
                      colSpan={7}
                      count={listCount[selectedType + "_count"] || ''}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      ActionsComponent={TablePaginationActionsWrapped}
                      align="center"
                    />
                  </TableRow>
                </TableFooter>
              </Table>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.actionConformation}
                onClose={this.closeDialog}
                eachUser={this.state}
              >
                <ConformationDialog eachUser={this.state.deletedUser} actionType={this.state.actionType}
                                    conformationStatus={() => this.getConformationStatus()}
                                    handleClose={this.closeDialog} Text={this.state.buttonActionType}
                                    headingText={this.state.modalHeadingText}/>
              </Modal>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.actionConformation}
                onClose={this.closeDialog}
                eachUser={this.state}
              >
                <ConformationDialog eachUser={this.state.deletedUser} actionType={this.state.actionType}
                                    conformationStatus={() => this.getConformationStatus()}
                                    handleClose={this.closeDialog} Text={this.state.buttonActionType}
                                    headingText={this.state.modalHeadingText}/>
              </Modal>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.deleteConformation}
              >
                <DeleteWithReason
                  closeDeleteDialog={this.closeDeleteDialog}
                  isdeleteMyAccount={(deleteReason) => this.deleteMyAccount(deleteReason)}
                  headingText="Reasons"
                />
              </Modal>
            </div>
          </Paper>
          : null}
      </React.Fragment>
    )
  }
}

/**
 * component to capture pagination events
 */
class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page || props.page === 0 ? props.page : ''
    }
  }

  /**
   * @function to get first page subusers list
   */
  handleFirstPageButtonClick = () => this.props.onChangePage(0);

  /**
   * @function to get previous page subusers list
   */
  handleBackButtonClick = () => {
    if (this.state.page - 1 >= 0) this.props.onChangePage(this.props.page - 1);
  };

  /**
   * @function to get next page subusers list
   */
  handleNextButtonClick = () => {
    const lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
    if (this.state.page + 1 <= lastPage) this.props.onChangePage(this.props.page + 1);
  };

  /**
   * @function to get last page subusers list
   */
  handleLastPageButtonClick = () => {
    this.props.onChangePage(
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  componentWillReceiveProps(nextProps) {
    //update page number in component state
    this.setState({page: nextProps.page || nextProps.page === 0 ? nextProps.page : ''});
  }

  /**
   * @function to validate the user entered page number
   * @param e: input events object
   */
  onPageChange = (e) => {
    if (e.target.value === "" || e.target.value < Math.ceil(this.props.count / this.props.rowsPerPage) || e.target.value == Math.ceil(this.props.count / this.props.rowsPerPage)) {
      //If entered page number is valid update it in component state
      this.setState({page: e.target.value ? parseInt(e.target.value) - 1 : null});
    }
  };

  /**
   * @function to get the entered page number subusers list
   * @param e: input reference event object
   */
  onEnterCheck = (e) => {
    if ((this.state.page || this.state.page === 0) && e.key === 'Enter') {
      this.props.onChangePage(this.state.page);
    }
  };

  render() {
    const {classes, count, page, rowsPerPage, theme} = this.props;
    return (
      <div className={classes.root}>
        <span
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
          className="mr-16"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Last Page' : 'First Page'}
        </span>
        <span
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
          className="mr-16"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Next' : 'Prev'}
        </span>
        <span className="mr-16">
          Page <input className="pagination-input-box" type='number' onKeyDown={this.onEnterCheck}
                      onChange={this.onPageChange}
                      value={this.state.page ? this.state.page + 1 : this.state.page == 0 ? this.state.page + 1 : ''}/> of {Math.ceil(count / rowsPerPage)}
        </span>
        <span
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
          className="mr-16"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Prev' : 'Next'}
        </span>
        <span
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'First Page' : 'Last Page'}
        </span>
      </div>
    );
  }
}

// Define the propTypes of the TablePaginationActions component
TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
  TablePaginationActions,
);

SubUsersTableComponent.propTypes = {classes: PropTypes.object.isRequired,};

export default withStyles(styles)(SubUsersTableComponent);
