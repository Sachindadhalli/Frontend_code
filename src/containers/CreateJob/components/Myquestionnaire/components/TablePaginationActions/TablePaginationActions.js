// library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TablePaginationActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page || props.page === 0 ? props.page : ''
    }
  }

  /**
   * On click of first page button in pagination
   * @param: event
   * @return:  call back a function
   * */
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  /**
   * On click of back button in pagination
   * @param: event
   * @return:  call back a function
   * */
  handleBackButtonClick = event => {
    if (this.state.page - 1 >= 0) this.props.onChangePage(event, this.props.page - 1);
  };

  /**
   * On click of next button in pagination
   * @param: event
   * @return:  call back a function
   * */
  handleNextButtonClick = event => {
    const lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
    if (this.state.page + 1 <= lastPage) this.props.onChangePage(event, this.props.page + 1);
  };

  /**
   * On click of last page button in pagination
   * @param: event
   * @return:  call back a function
   * */
  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({page: nextProps.page || nextProps.page === 0 ? nextProps.page : ''});
  }

  /**
   * To validate the on click of buttons in pagination
   * @param: event
   * @return:  call back a function
   * */
  onPageChange = (e) => {
    if (e.target.value === "" || e.target.value < Math.ceil(this.props.count / this.props.rowsPerPage) ||
      e.target.value === Math.ceil(this.props.count / this.props.rowsPerPage)) {
      this.setState({page: e.target.value ? parseInt(e.target.value) - 1 : null});
    }
  };

  /**
   * To handle Enter key
   * @param: event
   * @return:  call back a function
   * */
  onEnterCheck = (e) => {
    if ((this.state.page || this.state.page === 0) && e.key === 'Enter') {
      this.props.onChangePage(e, this.state.page,);
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
                      value={this.state.page ? this.state.page + 1 : this.state.page === 0 ? this.state.page + 1 : ''}/> of {Math.ceil(count / rowsPerPage)}
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

export default TablePaginationActions;

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};
