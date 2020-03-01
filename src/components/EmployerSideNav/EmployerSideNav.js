//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  Popover,
  Toolbar,
  withStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
//style
import './style.scss';
//icon
import profileImage from '../../../assets/media/images/profile.jpg';
import dropdown from '../../../assets/media/icons/down.svg'
import notification from '../../../assets/media/icons/notification.svg';
import group from '../../../assets/media/icons/group.svg';
import search from '../../../assets/media/icons/search.svg';
import home from '../../../assets/media/icons/home.svg';
import inbox from '../../../assets/media/icons/inbox.svg';
import profile from '../../../assets/media/icons/manager.svg';
import settings from '../../../assets/media/icons/settings.svg';
import shape from '../../../assets/media/icons/Shape.svg';
import jobsIcon from '../../../assets/media/icons/jobs-icon.svg';
//custom component
import CustomIcon from '../../components/CustomIcon';
import CustomTag from '../../components/CustomTag';
//side navigation drawer width
const drawerWidth = 146;

//material ui theme customizations
const styles = theme => ({
  root: {display: 'flex', width: `100%`},
  popover: {pointerEvents: 'none',},
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#ffffff',
    boxShadow: "1px 2px 4px 0 rgba(0, 0, 0, 0.1)"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    padding: 0
  },
  menuButton: {marginLeft: 0, marginRight: 0, padding: 0,},
  hide: {display: 'none',},
  drawer: {width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap',},
  drawerColor: {backgroundColor: '#2e2a43', color: '#ffffff'},
  drawerOpen: {
    width: drawerWidth, overflowY: 'auto', overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 999999,
    width: '0px',
    [theme.breakpoints.up('sm')]: {
      width: '0px',
    },
  },
  drawerItems: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: 'hidden',
    overflowX: 'hidden',
    zIndex: 999999,
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {display: 'flex', alignItems: 'center', ...theme.mixins.toolbar,},
  toolbarCss: {padding: 0, justifyContent: 'flex-end'},
  paper: {borderRadius: '0px'},
  content: {
    flexGrow: 1, marginTop: 72, width: `calc(100vw - ${drawerWidth / 2}px)`, height: `calc(100vh - ${72}px)`,
    overflow: `scroll`, [theme.breakpoints.up('sm')]: {width: `calc(100vw - ${theme.spacing.unit * 9 + 1})`,},
  },
});

/**
 * functional component to show navigation menu item
 * @param props
 * @return {XML}
 * @constructor
 */
function SideMenuItemSmall(props) {
  return (
    <div className={props.className}
         style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <img src={props.icon} className={props.className} style={{height: 32, width: 42, objectFit: 'scale-down'}}/>
    </div>
  );
}

/**
 * functional component to show navigation menu item
 * @param props
 * @return {XML}
 * @constructor
 */
function SideMenuItem(props) {
  return (
    <div className="side-menu-item">
      <CustomIcon icon={props.icon}/>
      <CustomTag text={props.text} className={props.className}/>
    </div>
  );
}

class EmployerSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: window.innerWidth > 767,
      selected: 0,
      popoverOpen: false,
      drawerType: window.innerWidth > 767 ? 'persistent' : 'temporary',
      openProfileMenu: false,
      anchorEl: '',
      popoverJobsOpen: false,
      anchorJobEl: '',

    };
    //bind this to the functions to access class variables and functions
    this.changeSideNavSelected = this.changeSideNavSelected.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentWillMount() {
    // listen resize event to change to hide and show hamburger menu icon
    window.addEventListener('resize', this.handleWindowResize);
    if (this.props.hasOwnProperty('selected')) {
      this.setState({selected: this.props.selected});
    }
  }

  /**
   * @function to listen resize event to change to hide and show hamburger menu icon
   * @param e
   */
  handleWindowResize(e) {
    if (window.innerWidth <= 767 && this.state.open === true) {
      this.setState({open: false, drawerType: 'temporary'})
    } else if (window.innerWidth > 768 && this.state.open === false) {
      this.setState({open: true, drawerType: 'persistent'})
    }
  };

  /**
   * @function to capture menu item click even and redirect to respective page
   * @param e
   * @param obj
   * @param index
   */
  changeSideNavSelected(e, obj, index) {
    this.setState({selected: index});
    if (this.props.hasOwnProperty('history')) {
      switch (obj.name) {
        case 'Settings':
          this.onMouseEnterListItem(e);
          return;
        case 'Home':
          return this.props.history.push('/employer-dashboard');
        case 'Profile':
          return this.props.history.push('/employer-home-page');
        case 'Inbox':
          return this.props.history.push('/employer-inbox');
      }
    }
  }

  /**
   * @function to capture settings sub menu item click event and redirect to respective page
   * @param obj
   * @param type
   * @param index
   */
  changeSettingsSideNavSelected = (obj, type, index) => {
    this.setState({selected: index});
    if (this.props.hasOwnProperty('history')) {
      switch (type) {
        case "Account Settings":
          return this.props.history.push('/account-settings');
        case "Subuser Settings":
          return this.props.history.push('/subuser');
      }
    }
  };

  /**
   * @function to capture jobs sub menu click event and redirect to respective page
   * @param obj
   * @param type
   * @param index
   */
  changeJobSettingsSideNavSelected = (obj, type, index) => {
    this.setState({selected: index});
    if (this.props.hasOwnProperty('history')) {
      switch (type) {
        case "Create Job":
          return this.props.history.push('/post-job-modal');
        case "Saved Jobs":
          return this.props.history.push('/employer-saved-jobs');
        case "Drafted Jobs":
          return this.props.history.push('/employer-drafted-jobs');
      }
    }
  };

  /**
   * @function to update drawer status open as true
   */
  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  /**
   * @function to update drawer status open as false
   */
  handleDrawerClose = () => {
    this.setState({open: false});
  };

  /**
   * @function to open logout dropdown on click of profile icon
   */
  openProfileMenuFunction = (e) => {
    this.setState(state => ({openProfileMenu: !this.state.openProfileMenu, anchorEl: e.currentTarget}));
    localStorage.clear()
  };

  /**
   * @function to clear the localstorage and redirect to the landing page on click of logout.
   * @param item
   */
  handleMenuItemClick = (item) => {
    if (item === 'logout') {
      localStorage.clear()
      this.props.history.push('/')
    }
  };

  /**
   *
   * @param e
   */
  onMouseEnterListItem = (e) => {
    if (e.currentTarget.id === 'Settings') {
      this.setState({popoverOpen: true, anchorEl: e.currentTarget});
    }
    else if (e.currentTarget.id === 'Jobs') {
      this.setState({popoverJobsOpen: true, anchorJobEl: e.currentTarget});
    }
    else this.setState({popoverOpen: false, popoverJobsOpen: false});
  };

  /**
   * @function to capture settings sub menu item hover event to open submenu
   * @param e
   */
  onSubMenuMouseEnterListItem = (e) => {
    this.setState({popoverOpen: true});
  };

  /**
   * @function to capture settings sub menu item hover event to close submenu
   * @param e
   */
  onMouseLeaveListItem = (e) => {
    this.setState({popoverOpen: false, popoverJobsOpen: false})
  };

  /**
   * redirect to landing page
   */
  logoutTrigger = () => {
    window.location.href = '/'
  };

  closeLoginTrigger = (e) => {
    this.setState({openProfileMenu: false})
  };

  render() {
    const {classes, children} = this.props;
    const {drawerType} = this.state
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}>
          <Toolbar disableGutters={!this.state.open}
                   className={classNames(classes.toolbarCss)}>
            <IconButton
              color="secondary"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon/>
            </IconButton>
            <div className="employer-top-menu">
              {this.props.hasOwnProperty('selected') && this.props.selected == 4 ? null :
                <div className="employer-search-field">
                  <Input
                    placeholder="Search"
                    startAdornment={
                      <InputAdornment position="start">
                        <CustomIcon icon={search} iconStyle="search-icon"/>
                      </InputAdornment>
                    }
                    classes={{input: this.props.classes['input']}}
                  />
                </div>}
              {this.props.hasOwnProperty('selected') && this.props.selected == 4 ? null :
                <CustomIcon icon={group} className="message-icon"/>}
              {this.props.hasOwnProperty('selected') && this.props.selected == 4 ? null :
                <CustomIcon icon={notification}/>}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '12px',
                cursor: 'pointer'
              }}
                   className={this.props.hasOwnProperty('selected') && this.props.selected == 4 ? "logout-profile-icon-without-search" : null}
                   onClick={this.openProfileMenuFunction}>
                <CustomIcon
                  icon={profileImage}
                  className="profile-icon"
                  iconStyle="logout-profile-icon"

                />
                <CustomIcon icon={dropdown} iconStyle="logout-drop-down"></CustomIcon>
              </div>
              {
                <Popover
                  id="mouse-over-popover"
                  classes={{paper: classes.paper}}
                  open={this.state.openProfileMenu}
                  anchorEl={this.state.anchorEl}
                  onClose={this.closeLoginTrigger}
                  anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                  transformOrigin={{vertical: 'top', horizontal: 'left',}}
                  style={{marginTop: '50px'}}
                >
                  <div class="logout-wrapper" onMouseLeave={this.onMouseLeaveListItem}>
                    <div className="logout" onClick={this.logoutTrigger}>Logout</div>
                  </div>
                </Popover>
              }
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant={drawerType}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          }, 'scrollbars')}
          classes={{
            paper: classNames(classes.drawerColor, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }, 'scrollbars'),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <div className="menu-and-logo">
              <div className="menu-shenzyn-wrapper">
                <div className="shenzyn-logo-home" style={{backgroundImage: `url(${shape})`}}>
                </div>
                <div className="menu">
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerClose}
                    className={classNames(classes.menuButton, {
                      [classes.hide]: !this.state.open,
                    })}>
                    <MenuIcon/>
                  </IconButton>
                </div>
                <div className="shenzyn">
                  Shenzyn
                </div>
              </div>
            </div>
          </div>
          {this.state.open ?
            <List style={{padding: 0}}>
              <React.Fragment>
                <ListItem button key={'Home'} style={{padding: 0}}>
                  <div
                    id={'Home'}
                    aria-owns={this.state.popoverOpen ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={this.onMouseEnterListItem}
                    className={0 === this.state.selected ? 'selected' : 'unselected'}
                    onClick={(e) => {
                      this.changeSideNavSelected(e, {name: 'Home', icon: home}, 0)
                    }}
                  >
                    {0 === this.state.selected ? <div className="selected-line"/> : <div className="unselected-line"/>}
                    <SideMenuItem
                      icon={home}
                      text={'Home'}
                      className="Home"
                    />
                  </div>
                </ListItem>
              </React.Fragment>
              <React.Fragment>
                <ListItem button key={'Profile'} style={{padding: 0}}>
                  <div
                    id={'Profile'}
                    aria-owns={this.state.popoverOpen ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={this.onMouseEnterListItem}
                    className={1 === this.state.selected ? 'selected' : 'unselected'}
                    onClick={(e) => {
                      this.changeSideNavSelected(e, {name: 'Profile', icon: profile}, 1)
                    }}
                  >
                    {1 === this.state.selected ? <div className="selected-line"/> : <div className="unselected-line"/>}
                    <SideMenuItem
                      icon={profile}
                      text={'Profile'}
                      className="Home"
                    />
                  </div>
                </ListItem>
              </React.Fragment>
              <React.Fragment>
                <ListItem button key={'Jobs'} style={{padding: 0}}>
                  <div
                    id={'Jobs'}
                    aria-owns={this.state.popoverOpen ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={this.onMouseEnterListItem}
                    className={2 === this.state.selected ? 'selected setting-popup' : 'unselected setting-popup'}
                    onClick={(e) => {
                      this.changeSideNavSelected(e, {name: 'Jobs', icon: jobsIcon}, 2)
                    }}
                  >
                    {2 === this.state.selected ? <div className="selected-line"/> : <div className="unselected-line"/>}
                    <SideMenuItem
                      icon={jobsIcon}
                      text={'Jobs'}
                      className="Home"
                    />
                    <div className="side-dropdown-wrapper" onMouseLeave={this.onMouseLeaveListItem}>
                      <div className="sub-user-settings-list-item"
                           onClick={(e) => this.changeJobSettingsSideNavSelected({name: 'Settings', icon: settings},
                             "Create Job", 2)}>Create Job
                      </div>
                      <div className="account-settings-list-item"
                           onClick={(e) => this.changeJobSettingsSideNavSelected({name: 'Settings', icon: settings},
                             "Saved Jobs", 2)}>Saved Jobs
                      </div>
                    </div>
                  </div>
                </ListItem>
              </React.Fragment>
              <React.Fragment>
                <ListItem button key={'Inbox'} style={{padding: 0}}>
                  <div
                    id={'Inbox'}
                    aria-owns={this.state.popoverOpen ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={this.onMouseEnterListItem}
                    className={3 === this.state.selected ? 'selected' : 'unselected'}
                    onClick={(e) => {
                      this.changeSideNavSelected(e, {name: 'Inbox', icon: inbox}, 3)
                    }}
                  >
                    {3 === this.state.selected ? <div className="selected-line"/> : <div className="unselected-line"/>}
                    <SideMenuItem
                      icon={inbox}
                      text={'Inbox'}
                      className="Home"
                    />
                  </div>
                </ListItem>
              </React.Fragment>
              <React.Fragment>
                <ListItem button key={'Settings'} style={{padding: 0}}>
                  <div
                    id={'Settings'}
                    aria-owns={this.state.popoverOpen ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={this.onMouseEnterListItem}
                    className={4 === this.state.selected ? 'selected setting-popup' : 'unselected setting-popup'}
                    onClick={(e) => {
                      this.changeSideNavSelected(e, {name: 'Settings', icon: settings}, 4)
                    }}
                  >
                    {4 === this.state.selected ? <div className="selected-line"/> : <div className="unselected-line"/>}
                    <SideMenuItem
                      icon={settings}
                      text={'Settings'}
                      className="Home"
                    />
                    <div className="side-dropdown-wrapper" onMouseLeave={this.onMouseLeaveListItem}>
                      <div className="sub-user-settings-list-item"
                           onClick={(e) => this.changeSettingsSideNavSelected({name: 'Settings', icon: settings},
                             "Subuser Settings", 4)}>User Settings
                      </div>
                      <div className="account-settings-list-item"
                           onClick={(e) => this.changeSettingsSideNavSelected({name: 'Settings', icon: settings},
                             "Account Settings", 4)}>Account Settings
                      </div>
                    </div>
                  </div>
                </ListItem>
              </React.Fragment>
            </List> : <List style={{padding: 0}}>
              {[{name: 'Home', icon: home}, {name: 'Profile', icon: profile}, {
                name: 'Jobs',
                icon: jobsIcon
              }, {name: 'Inbox', icon: inbox}, {name: 'Settings', icon: settings}].map((obj, index) => (
                <ListItem button key={obj.name} style={{padding: 0}}>
                  <div className={index === this.state.selected ? 'selected' : 'unselected'} onClick={(e) => {
                    this.changeSideNavSelected(obj, index);
                  }}>
                    {index === this.state.selected ? <div className="selected-line"/> :
                      <div className="unselected-line"/>}
                    <SideMenuItemSmall
                      icon={obj.icon}
                      text={''}
                      className={`${classes.drawerItems} scrollbars`}
                    />
                  </div>
                </ListItem>
              ))}
            </List>}
        </Drawer>
        <main className={classes.content + " shenzyn-main"}>
          {children}
        </main>
      </div>
    );
  }
}

EmployerSideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(EmployerSideNav);
