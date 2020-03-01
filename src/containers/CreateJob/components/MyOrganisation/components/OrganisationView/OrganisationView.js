//library dependencies
import React, {Component} from 'react';
import {TablePagination, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

//style
import './style.scss';

//custom component
import OrganisationCard from './component/OrganisationCard';
import LoadingIcon from '../../../../../../components/LoadingIcon/LoadingIcon';

//utilities
import * as actions from "../../../../../../actions/createAJob";
import TablePaginationActions from '../TablePaginationActions/TablePaginationActions';

// customised material ui style
const styles = theme => ({
  root: {justifyContent: 'center', flexWrap: 'wrap',},
  spacer: {flex: '1 1 50%', border: '1px solid black'}
});

//customised style
const actionsStyles = theme => ({
  root: {flexShrink: 0, color: theme.palette.text.secondary, marginLeft: '104px',},
  spacer: {flex: '1 1 50%', border: '1px solid black'}
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(TablePaginationActions,);

class OrganisationView extends Component {
  constructor(props) {
    super(props);
    this.state = {no_organisation: false, activeOrg: '', intialPage: 0,}
  }

  /**
   * on click of radio button to select the organisation
   * @param value
   */
  onOrganisationRadioChange(value) {
    this.setState({activeOrg: value,});
    this.props.onOrganisationChange({page: this.props.createAJob.my_organisation.page, selectedOrganisation: value});
  }

  componentWillReceiveProps(nextProps, nextContext) {

    // receiving the previous selected organisation from redux, if not selected updating the first as selected by default
    if (this.props.createAJob.my_organisation.selectedOrganisation && this.props.createAJob.my_organisation.selectedOrganisation !== 0) {
      this.setState({
        activeOrg: this.props.createAJob.my_organisation.selectedOrganisation,
      });
    }
  }

  /**
   * To handle change of page in pagination
   * @param: event, page
   * @return: updating state, the redux store
   * */
  handleChangePage(e, page) {
    if (e != null) {
      this.setState({intialPage: page,});
      this.props.onOrganisationChange({
        page: page,
        selectedOrganisation: this.props.createAJob.my_organisation.selectedOrganisation
      });
      this.props.pagination(page)
    }
  }

  render() {
    if (!this.props.Loading) {
      const {page, selectedOrganisation} = this.props.createAJob.my_organisation;
      return (
        <div>
          {!this.props.Loading && (this.props.organsisation_data && this.props.organsisation_data.length > 0) ?
            <div className="my-organisation-container">
              <div>
                <button className="shenzyn-btn outline-primary-button add-organisation"
                        onClick={this.props.addOrganisation}> Add Organisation
                </button>
              </div>
              <div className="my-organisations">
                <div className="pagination-style ">
                  <div style={{float: "right"}} className="my-organisation-pagination-wrapper">
                    <TablePagination
                      labelRowsPerPage=''
                      labelDisplayedRows={({from, to, count}) => ''}
                      rowsPerPageOptions={4}
                      colSpan={7}
                      count={this.props.cardsCount}
                      rowsPerPage={10}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={(e, page) => this.handleChangePage(e, page)}
                      ActionsComponent={TablePaginationActionsWrapped}
                      align="center"
                    />
                  </div>
                </div>
                <div className="my-organisation-container">
                  <div className="data-container">
                    {this.props.organsisation_data.map((key, index) => (
                      <OrganisationCard
                        organisation={key}
                        index={index}
                        isActive={selectedOrganisation === 0 ? this.props.organsisation_data[0].key === key.key : selectedOrganisation === key.key}
                        onOrganisationRadioChange={() => this.onOrganisationRadioChange(key.key)}
                        deleteCard={() => this.props.deleteOrganisationDetail(key.key, key.organisation_name.value)}
                        editCard={() =>  this.props.editOrganisationDetail(key)}
                      />))}
                  </div>
                </div>
              </div>
              <div className="my-organisation-hr">
                <hr className="hr-class-organisation"/>
                <div className="save-btn">
                  <button className="shenzyn-btn filled-primary-button  px-40 mr-20 next-button"
                          onClick={() => this.props.saveNext(this.state.activeOrg)}>Next
                  </button>
                </div>
              </div>
            </div>
            :
            <div className="my-organisations">
              <div className="no-organisation-style">
                Please add your Organisation to proceed further
                <div>
                  <button className="shenzyn-btn filled-primary-button add-organisation"
                          onClick={this.props.firstaddOrganisation}> Add Organisation
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      );
    }
    return (
      <div>
        <LoadingIcon/>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = dispatch => ({
  onOrganisationChange: bindActionCreators(
    actions.updateMyOrganisation,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationView);

