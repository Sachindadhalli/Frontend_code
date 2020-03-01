import React, { Component } from 'react';
import './styles.scss';
import dropDown from '../../../../../assets/media/icons/dropdown.svg';
import CustomIcon from '../../../../components/CustomIcon';
import CustomTag from '../../../../components/CustomTag';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Flex from 'styled-minimal/Flex';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

const ExpansionPanel = withStyles({
  root: {
    // border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    // backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);

class CollapsibleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: true, iconFlag: false };
  }
  expandToggle = panel => (event, expanded) => {
    this.setState({
      iconFlag: !this.state.iconFlag,
      expanded: expanded ? panel : false,
    });
  };
  handleChange = panel => (event, newExpanded) => {
    this.setState({ expanded: newExpanded ? panel : false });
  };
  componentWillMount() {
    this.setState({ expanded: this.props.collapsibleTitle });
  }
  checkCollapse = e => {};
  render() {
    const { collapsibleTitle, classes, children } = this.props;
    const { expanded, iconFlag } = this.state;
    return (
      <div style={{ position: 'relative' }}>
        {/* <div
          style={{ position: 'absolute', right: '226px', top: '24px', zIndex: '1' }}
          onClick={this.props.onSaveClick}
        >
          Hello world
        </div> */}
        {this.props.showEdit ? (
          <div
            style={{ position: 'absolute', right: '108px', top: '24px', zIndex: '1' }}
            className="save"
            onClick={this.props.onEditClick}
          >
            {' '}
            Edit{' '}
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              right: '108px',
              top: '24px',
              zIndex: '1',
              display: 'flex',
            }}
          >
            <div className="save" onClick={this.props.onSaveClick}>
              {' '}
              Save{' '}
            </div>

            <div className="cancel_btn" onClick={this.props.onclick}>
              {' '}
              Cancel{' '}
            </div>
          </div>
        )}
        <ExpansionPanel
          className="wrraper-expansion-panel"
          square
          expanded={expanded === collapsibleTitle}
          onChange={this.handleChange(collapsibleTitle)}
        >
          <ExpansionPanelSummary
            className="wrraper-expansion-panel-summary"
            style={{ 'border-bottom': '1px solid #f1f1f1' }}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography style={{ width: '100%' }}>
              <div className="wrapper-expansion-header wrapper-expansion-header1">
                <div className="title-text-wrapper">
                  {expanded === collapsibleTitle ? (
                    <CustomIcon icon={dropDown} />
                  ) : (
                    <CustomIcon icon={dropDown} iconStyle="collapse-panel" />
                  )}

                  <div className="filter-type">{collapsibleTitle}</div>
                  {this.props.showAddButtow == 'true' ? (
                    <div className="shape">
                      <div className="plus">+</div>
                    </div>
                  ) : null}
                </div>

                {/* <div className= "hr-line1"> */}
                <div className="save-emp-header1">
                  <div className="save-discard1 save-discard-responsive">
                    {/* {this.props.showEdit ? (
                      <CustomTag
                        text="Edit"
                        className="cancel_btn"
                        onclick={this.props.onEditClick}
                      />
                    ) : (
                      <>
                        <CustomTag
                          text="Save"
                          //onClick={this.createItem}
                          className="save"
                          //onclick={this.props.onclick}
                          //onclick={this.props.onSaveClick}
                        />
                        <CustomTag
                          text="Cancel"
                          className="cancel_btn"
                          onclick={this.props.onclick}
                        />
                      </>
                    )} */}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{children}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(CollapsibleComponent);
