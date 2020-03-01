//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Popover,
  Typography,
  withStyles
} from '@material-ui/core';
//styles
import './styles.scss';
//icon
import dropDown from '../../../assets/media/icons/dropdown.svg';
//custom component
import CustomIcon from '../CustomIcon';
import MultiOptionCheckListSearch from '../MultiOptionCheckListSearch/MultiOptionCheckListSearch';
//material ui theme customizations
const styles = theme => ({
  root: {width: '100%',},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  content: {padding: 0}
});

class FilterJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      open: false,
      filterData: [],
      selectedFilters: {title: '', values: []},
    };
  }

  /**
   * on click of more, showing all option in a popover
   * @param e
   */
  handleClick = e => {
    e.preventDefault();
    let i;
    let j;
    for (i = 0; i < this.props.filterData.values.length; i++) {
      this.props.filterData.values[i].flag = false;
      for (j = 0; j < this.state.selectedFilters.values.length; j++) {
        if (this.props.filterData.values[i].key == this.state.selectedFilters.values[j].key) {
          const obj = this.props.filterData.values[i];
          this.props.filterData.values[i].flag = true;
        }
      }
    }
    this.setState({open: true, anchorEl: e.currentTarget,});
  };

  /**
   * close popover
   */
  handleClose = () => {
    this.setState({open: false,});
  };

  componentWillMount() {
    let filterValuesFromProps = this.state.filterData
    filterValuesFromProps.push(this.props.filterData)
    const filterDataFromProps = {title: filterValuesFromProps.title, values: filterValuesFromProps.values}
    this.setState({filterData: filterDataFromProps})
  }

  /**
   * handle expansion panel
   * @param panel
   */
  expandToggle = panel => (event, expanded) => {
    this.setState({expanded: expanded ? panel : false,});
  };

  /**
   * send checked filters to the parent component
   * @param e
   * @param filter
   * @param filterData
   */
  sendCheckedFilters = (e, filter, filterData) => {
    filterData && filterData.values.map((option) => {
      if (filter.name === option.name) {
        option.isChecked = e.target.checked;
      }
    });
    const filterValuesArr = [];
    filterData.values.map(option => {
      if (option.isChecked === true)
        filterValuesArr.push(option)
    });
    this.props.sendCheckedFilters({title: filterData.title, values: filterValuesArr})
  };

  render() {
    const {filterData, classes} = this.props;
    const {expanded, open} = this.state;
    const id = open ? 'FilterJobs' : null;
    return (
      <div style={{width: '100%'}}>
        <ExpansionPanel
          hideToggle
          className="expansion-panel"
          expanded={expanded === filterData.title}
          onChange={this.expandToggle(filterData.title)}
        >
          <ExpansionPanelSummary className="expansion-summary" classes={{content: classes.content}}>
            <div className="expansion-header">
              <div>
                {expanded === filterData.title ? (
                  <CustomIcon icon={dropDown}/>
                ) : (
                  <CustomIcon icon={dropDown} iconStyle="collapse-panel"/>
                )}
              </div>
              <div className="filter-type">{filterData.title}</div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="expansion-details">
            <Typography className='overflow-class' style={{width: "100%"}}>
              <div className='overflow-class'>
                <table>
                  <tbody>
                  {filterData.values.map((option, index) => (
                    index < 5 ? (<tr>
                      <td width="10%">
                        <Checkbox
                          onChange={e => this.sendCheckedFilters(e, option, filterData)}
                          checked={option.isChecked == true ? true : false}
                          style={{padding: 'unset'}}
                        />
                      </td>
                      <td width="75%" className="filter-name">{option.name}</td>
                      <td width="15%">({option.count})</td>
                    </tr>) : null
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="more-pop-over">
                {filterData.values && filterData.values.length > 5 ? (
                  <div className="more py-20" aria-describedby={id} onClick={this.handleClick}>
                    More
                  </div>) : null}
                <div className="multi-option-pop-over">
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                    transformOrigin={{vertical: 'bottom', horizontal: 'right',}}
                  >
                    <MultiOptionCheckListSearch
                      checkListData={filterData}
                      closeChecklist={this.handleClose}
                      sendCheckedFilters={(e, filter, data) => this.sendCheckedFilters(e, filter, filterData)}
                    />
                  </Popover>
                </div>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

FilterJobs.PropTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterJobs);
