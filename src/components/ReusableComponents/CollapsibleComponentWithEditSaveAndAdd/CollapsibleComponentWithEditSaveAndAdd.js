//library dependencies
import React, {Component} from 'react';
import {withStyles, Typography} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

//style
import './styles.scss';

//icons
import dropDown from '../../../../assets/media/icons/dropdown.svg'
import add from '../../../../assets/media/icons/add.png'

//custom component
import CustomIcon from '../../CustomIcon';

//customization of style CollapsibleComponentWithEditSaveAndAdd component
const styles = () => ({
  root: {width: '100%',}
});

// customization of ExpansionPanel style
const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {borderBottom: 0,},
    '&:before': {display: 'none',},
    '&$expanded': {margin: 'auto',},
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {minHeight: 56,},
  },
  content: {'&$expanded': {margin: '12px 0',}},
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {padding: theme.spacing.unit * 2,},
}))(MuiExpansionPanelDetails);

class CollapsibleComponentWithEditSaveAndAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: true, iconFlag: false, isEdit: false};
  }

  /**
   * on change of Expansion panel,updating the state to change the view
   * @param panel
   * @returns {Function}
   */
  handleChange = panel => (event, newExpanded) => {
    // this.setState({expanded:newExpanded ? panel : false});
  };

  componentWillMount() {
    //initially recieved the props to expand the panel and updating the state
    this.setState({expanded: this.props.collapsibleTitle})
  }

  /**
   * on click of Add icon , managing the state and call back function
   */
  addMoreIconClick = () => {
    this.props.addMoreClickEvent();
  };
  /**
   * on click of close button , managing the state and call back function
   */
  CancelButtonClick = () => {
    this.props.cancelClickEvent();
  };
  /**
   * on click of save button, managing the state and call back function
   */
  SaveButtonClick = () => {
    this.props.saveClickEvent();
  };
  /**
   * on click of Edit button , managing the state and call back function
   */
  EditButtonClick = () => {
    this.props.editClickEvent();
  };

  render() {
    const {collapsibleTitle, classes, isEditable, children, addMore} = this.props;
    const {expanded} = this.state;
    return (
      <div>
        <ExpansionPanel style={{position: 'relative'}} className="wrraper-expansion-panel" square
                        expanded={expanded === collapsibleTitle} onChange={this.handleChange(collapsibleTitle)}>
          <ExpansionPanelSummary className="wrraper-expansion-panel-summary"
                                 style={{"border-bottom": "1px solid #f1f1f1"}} aria-controls="panel1d-content"
                                 id="panel1d-header">
            <div style={{width: '100%'}}>
              <div className="wrapper-expansion-header">
                <div className='dropdown-title-wrapper'>
                  <div>{expanded === collapsibleTitle ? <CustomIcon icon={dropDown}> </CustomIcon> :
                    <CustomIcon icon={dropDown} iconStyle="collapse-panel"> </CustomIcon>}</div>
                  <div className="filter-type">{collapsibleTitle}</div>
                  {addMore && isEditable &&
                  <div className='add-more-styles' onClick={this.addMoreIconClick}><CustomIcon icon={add}> </CustomIcon>
                  </div>}
                </div>
                <div className='save-edit-alignments'>
                  {isEditable ?
                    <div className='save-edit-wrapper'>
                      <span className='save-button' onClick={this.SaveButtonClick}>Save</span>
                      <span className='cancel-button' onClick={this.CancelButtonClick}>Cancel</span>
                    </div> :
                    <div className='save-edit-wrapper'>
                      <span className='edit-button' onClick={this.EditButtonClick}> Edit </span>
                    </div>
                  }
                </div>
              </div>

            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography style={{width: "100%"}}>
              {children}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  ExpansionPanel
}

export default withStyles(styles)(CollapsibleComponentWithEditSaveAndAdd);

