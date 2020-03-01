//library dependencies
import React, {Component} from 'react';
import {Checkbox, Grid} from '@material-ui/core';

//style
import './styles.scss';

//icon
import close from '../../../assets/media/images/close.png';

//custom components
import SearchBar from '../SearchBar/SearchBar';

class MultiOptionCheckListSearch extends Component {

  state = {checkListData: []};

  componentWillMount() {
    this.setState({checkListData: this.props.checkListData.values})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({checkListData: nextProps.checkListData.values})
  }

  /**
   * On Click of chackbox, filtering the data
   * @param e
   * @param filter
   * @param filterData
   */
  checkedFilterdata = (e, filter, filterData) => {
    this.props.sendCheckedFilters(e, filter, filterData);
  };

  /**
   * @function, on change in search, finding the searching data
   * @param e
   */
  onSearchChange = (e) => {
    let searchResArr = [];
    this.props.checkListData.values.forEach(option => {
      if (option.name.toLowerCase().includes(e.target.value)) {
        searchResArr.push(option)
      }
    });
    this.setState({checkListData: searchResArr});
  };

  render() {
    const {checkListData} = this.state;
    return (
      <div className="main-container" style={{height: "auto !important"}}>
        <div className="close-image-search-field-div">
          <div className="delete-modal-close">
            <img src={close} style={{position: "absolute", right: "20px"}} className="close" alt="close"
                 onClick={this.props.closeChecklist}/>
          </div>
          <div className="search-bar-container">
            <SearchBar onSearchChange={this.onSearchChange}/>
          </div>
        </div>
        <div className="check-list-container">
          <Grid className="more-checkbox-wrapper">
            {checkListData && checkListData.map((option, index) => (
              <Grid className="more-checkbox-item">
                    <span>
                      <Checkbox
                        onChange={e => this.checkedFilterdata(e, option, checkListData)}
                        checked={option.isChecked ? true : false}
                        style={{padding: 'unset'}}
                      />
                    </span>
                <span className="filter-name">{option.name}</span>
                <span className="filter-count">({option.count})</span>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default MultiOptionCheckListSearch;
