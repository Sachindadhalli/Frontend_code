//library dependencies
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

//custom components
import SingleJobItem from './SingleJobItem';

class PreviousJobSearchField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      job_details: this.props.job_details,
      sort: this.props.sort,
    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    //event, close the DropDown component
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    //on UnMount event, closing the DropDown component
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * creating reference
   * @param node
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * handeling event,on click outside the drop down
   * @param event
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.changePreviousJobFocus(null, false);
    }
  }

  componentWillReceiveProps(nextProps) {

    //on change of selected option,updating the state
    this.setState({
      job_details: nextProps.job_details,
      sort: nextProps.sort,
    })
  }

  render() {
    const {sort, job_details} = this.state;
    return (
      <div className="post-job-modal-dropdown"
           ref={this.setWrapperRef}>
        <div className="sort-buttons">
          <div className="sort-by-text">Sort by</div>
          <div className="old-new-buttons">
            <Button
              className={sort ? 'selected latest' : 'unselected latest'}
              onClick={() => this.props.toggleSort('latest')}
              name="latest"
            >
              Latest
            </Button>
            <Button
              className={sort ? 'unselected oldest' : 'selected oldest'}
              onClick={() => this.props.toggleSort('oldest')}
              name="oldest"
            >
              Oldest
            </Button>
          </div>
        </div>
        <div className="job-options">
          {
            job_details.map((item, key) => {
              return (
                <SingleJobItem key={key} jobItem={item} setPreviousJob={this.props.setPreviousJob}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default PreviousJobSearchField;
