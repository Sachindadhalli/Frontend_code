//library dependencies
import React, {Component} from 'react';
import {withStyles, Typography} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

//style
import './styles.scss';

//icons
import dropDown from '../../../../assets/media/icons/dropdown.svg';

//custom component
import CustomIcon from '../../CustomIcon';

//customised style CollapsibleComponent
const styles = () => ({
  root: {width: '100%',}
});
// customised Expansion panel style
const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {borderBottom: 0,},
    '&:before': {display: 'none',},
    '&$expanded': {margin: 'auto',},
  },
  expanded: {},
})(MuiExpansionPanel);

//customised ExpansionPanelSummary style
const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {minHeight: 56,},
  },
  content: {
    '&$expanded': {margin: '12px 0',},
  },
  expanded: {},
})(MuiExpansionPanelSummary);

//customised ExpansionPanelDetails component style
const ExpansionPanelDetails = withStyles(theme => ({
  root: {padding: theme.spacing.unit * 2,},
}))(MuiExpansionPanelDetails);

class CollapsibleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: true, iconFlag: false};
  }

  /**
   * on click of panel, opening and closing the panel
   * @param panel
   * @returns {Function}
   */
  handleChange = panel => (event, newExpanded) => {
    this.setState({expanded: newExpanded ? panel : false});
  };

  componentWillMount() {
    //initially receiving the props to opening the panel,updating the state
    this.setState({expanded: this.props.collapsibleTitle})
  }

  render() {
    const {collapsibleTitle, children} = this.props;
    const {expanded} = this.state;
    return (
      <div>
        <ExpansionPanel className="wrraper-expansion-panel" square expanded={expanded === collapsibleTitle}
                        onChange={this.handleChange(collapsibleTitle)}>
          <ExpansionPanelSummary className="wrraper-expansion-panel-summary"
                                 style={{"border-bottom": "1px solid #f1f1f1"}} aria-controls="panel1d-content"
                                 id="panel1d-header">
            <Typography>
              <div className="wrapper-expansion-header">
                <div>{expanded === collapsibleTitle ? <CustomIcon icon={dropDown}/> :
                  <CustomIcon icon={dropDown} iconStyle="collapse-panel"/>}</div>
                <div className="filter-type">{collapsibleTitle}</div>
              </div>
            </Typography>
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
}

export default withStyles(styles)(CollapsibleComponent);

