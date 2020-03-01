//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
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
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
//style
import classNames from 'classnames';
import '../EmployerSideNav/style.scss'
import './styles.scss';
//icon
import CustomIcon from '../../components/CustomIcon';
import profileImage from '../../../assets/media/images/profile.jpg';
import dropdown from '../../../assets/media/icons/down.svg'
import notification from '../../../assets/media/icons/notification.svg';
import group from '../../../assets/media/icons/group.svg';
import search from '../../../assets/media/icons/search.svg';
import home from '../../../assets/media/icons/home.svg';
import profile from '../../../assets/media/icons/manager.svg';
import settings from '../../../assets/media/icons/settings.svg';
import shape from '../../../assets/media/icons/Shape.svg';
import jobsIcon from '../../../assets/media/icons/jobs-icon.svg';
//custom component
import CustomTag from '../../components/CustomTag'
//drawer width
const drawerWidth = 146;
//materail ui theme customizations
const styles = theme => ({
  root: {display: 'flex', width: `100%`},
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
    width: drawerWidth,
    overflowY: 'auto',
    overflowX: 'hidden',
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
    [theme.breakpoints.up('sm')]: {width: '0px',},
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
  content: {
    flexGrow: 1,
    marginTop: 72,
    width: `calc(100vw - ${drawerWidth / 2}px)`,
    height: `calc(100vh - ${72}px)`,
    overflow: `scroll`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100vw - ${theme.spacing.unit * 9 + 1})`,
    },
  },
});

/**
 * @function functional component to show main menu item
 * @param props
 * @return {XML}
 * @constructor
 */
function SideMenuItemSmall(props) {
  return (
    <div className={props.className}
         style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <img src={props.icon} className={props.className} style={{height: 32, objectFit: 'scale-down'}}/>
    </div>
  );
}

/**
 * @function functional component to show main menu item
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
};


class EmployeeSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: window.innerWidth > 767,
      selected: 0,
      drawerType: window.innerWidth > 767 ? 'persistent' : 'temporary',
      openProfileMenu: false,
      anchorEl: '',
      popoverJobsOpen: false,
      anchorJobEl: '',
    };
    this.changeSideNavSelected = this.changeSideNavSelected.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  };

  componentWillMount() {
    //handle to change the drawer and hamburger menu
    window.addEventListener('resize', this.handleWindowResize);
    if (this.props.hasOwnProperty('selected')) {
      this.setState({selected: this.props.selected});
    }
  }

  /**
   * handle to change menu to hamburger menu and vice versa
   * */
  handleWindowResize(e) {
    if (window.innerWidth <= 767 && this.state.open === true) {
      this.setState({open: false, drawerType: 'temporary'})
    } else if (window.innerWidth > 768 && this.state.open === false) {
      this.setState({open: true, drawerType: 'persistent'})
    }
  }

  /**
   * handle to show jobs sub menu
   * */
  onMouseEnterJob = (e) => {
    if (e.currentTarget.id === 'Jobs') {
      this.setState({popoverJobsOpen: true, anchorJobEl: e.currentTarget});
    }
    else this.setState({popoverJobsOpen: false});
  };
  /**
   * handle to close jobs sub menu
   * */
  onMouseLeaveJob = (e) => {
    this.setState({popoverJobsOpen: false})
  };

  /**
   * @function to handle menu click item
   * @param obj
   * @param index
   * */
  changeSideNavSelected(obj, index) {
    if (!this.props.hasOwnProperty('history')) {
      return;
    }
    switch (obj.name) {
      case 'Settings':
        this.setState({selected: index});
      case 'Home':
        this.setState({selected: index});
      case 'Profile':
        this.setState({selected: index});
        return;
      case 'Jobs':
        return;
      case 'Job Application Status':
        this.setState({selected: index});
        return this.props.history.push('/job-application-status');
    }
  }

  /**
   * @function to handle jobs sub menu click item
   * @param obj
   * @param index
   * */
  changeSettingsSideNavSelected = (obj, type, index) => {
    this.setState({selected: index});
    if (this.props.hasOwnProperty('history')) {
      switch (type) {
        case "Search Jobs":
          return this.props.history.push('/jobs');
        case "Saved Jobs":
          return this.props.history.push('/saved-jobs');
      }
    }
  };

  /**
   * @function to open drawer
   * */
  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  /**
   * @function to close drawer
   * */
  handleDrawerClose = () => {
    this.setState({open: false});
  };

  /**
   * @function to clear the localstorage and redirect to the landing  page
   * @param item
   * */
  handleMenuItemClick = (item) => {
    if (item === 'logout') {
      localStorage.clear();
      this.props.history.push('/')
    }
  };

  /**
   * @function to clear the localstorage
   * @param e
   * */
  openProfileMenuFunction = (e) => {
    this.setState(state => ({openProfileMenu: true, anchorEl: e.currentTarget}));
    localStorage.clear()
  };

  /**
   * @function to open profile menu
   * @param e
   * */
  closeLoginTrigger = (e) => {
    this.setState({openProfileMenu: false})
  };

  /**
   * @function to redirect landing page
   * */
  logoutTrigger = () => {
    window.location.href = '/'
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
                   className={this.props.hasOwnProperty('selected') && this.props.selected == 4 ? "logout-profile-icon" : null}
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
                      this.changeSideNavSelected({name: 'Home', icon: home}, 0)
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
                      this.changeSideNavSelected({name: 'Profile', icon: profile}, 1)
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
                      this.changeSideNavSelected({name: 'Jobs', icon: jobsIcon}, 2)
                    }}
                  >
                    {2 === this.state.selected ? <div className="selected-line"/> : <div className="unselected-line"/>}
                    <SideMenuItem
                      icon={jobsIcon}
                      text={'Jobs'}
                      className="Home"
                    />
                    <div className="side-dropdown-wrapper" onMouseLeave={this.onMouseLeaveJob}>
                      <div className="sub-user-settings-list-item" onClick={(e) => this.changeSettingsSideNavSelected({
                        name: 'Jobs',
                        icon: jobsIcon
                      }, "Search Jobs", 2)}>Search Jobs
                      </div>
                      <div className="account-settings-list-item" onClick={(e) => this.changeSettingsSideNavSelected({
                        name: 'Jobs',
                        icon: jobsIcon
                      }, "Saved Jobs", 2)}>Saved Jobs
                      </div>
                    </div>
                  </div>
                </ListItem>
              </React.Fragment>
              <React.Fragment>
                <ListItem button key={'Job Application Status'} style={{padding: 0}}>
                  <div
                    id={'Job Application Status'}
                    aria-owns={this.state.popoverOpen ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={this.onMouseEnterListItem}
                    className={3 === this.state.selected ? 'selected' : 'unselected'}
                    onClick={(e) => {
                      this.changeSideNavSelected({name: 'Job Application Status', icon: jobsIcon}, 3)
                    }}
                  >
                    {3 === this.state.selected ? <div className="selected-line"/> : <div className="unselected-line"/>}
                    <SideMenuItem
                      icon={jobsIcon}
                      text={'Job Application Status'}
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
                      this.changeSideNavSelected({name: 'Settings', icon: settings}, 4)
                    }}
                  >
                    {4 === this.state.selected ? <div className="selected-line"/> : <div className="unselected-line"/>}
                    <SideMenuItem
                      icon={settings}
                      text={'Settings'}
                      className="Home"
                    />
                  </div>
                </ListItem>
              </React.Fragment>
              {/*{[{name: 'Home', icon: home}, {name: 'Profile', icon: profile}, {*/}
              {/*name: 'Jobs',*/}
              {/*icon: jobsIcon*/}
              {/*}, {name: 'Job Application Status', icon: jobsIcon}, {name: 'Settings', icon: settings}].map((obj, index) => (*/}
              {/*<React.Fragment>*/}
              {/*<ListItem button key={obj.name} style={{padding: 0}}>*/}
              {/*<div*/}
              {/*id={obj.name}*/}
              {/*className={index === this.state.selected ? 'selected' : 'unselected'} onClick={(e)=> {*/}
              {/*this.changeSideNavSelected(obj,index);*/}
              {/*}}*/}
              {/*onMouseEnter={this.onMouseEnterJob}*/}
              {/*>*/}
              {/*{index === this.state.selected ? <div className="selected-line"/> :*/}
              {/*<div className="unselected-line"/> }*/}
              {/*<SideMenuItem*/}
              {/*icon={obj.icon}*/}
              {/*text={obj.name}*/}
              {/*className="Home"*/}
              {/*/>*/}
              {/*</div>*/}
              {/*</ListItem>*/}
              {/*{*/}
              {/*<Popover*/}
              {/*id="mouse-over-job-popover"*/}
              {/*classes={{paper: classes.paper}}*/}
              {/*open={this.state.popoverJobsOpen}*/}
              {/*anchorEl={this.state.anchorJobEl}*/}
              {/*anchorOrigin={{*/}
              {/*vertical: 'top',*/}
              {/*horizontal: 'right',*/}
              {/*}}*/}
              {/*transformOrigin={{*/}
              {/*vertical: 'top',*/}
              {/*horizontal: 'left',*/}
              {/*}}*/}
              {/*onClose={this.onMouseLeaveJob}*/}
              {/*>*/}
              {/*<div className="settings-list-wrapper" onMouseLeave={this.onMouseLeaveJob}>*/}
              {/*<div className="sub-user-settings-list-item" onClick={(e) => this.changeSettingsSideNavSelected(obj, "Search Jobs", index)}>Search Jobs</div>*/}
              {/*<div className="account-settings-list-item" onClick={(e) => this.changeSettingsSideNavSelected(obj, "Saved Jobs", index)}>Saved Jobs</div>*/}

              {/*</div>*/}
              {/*</Popover>*/}
              {/*/!*}*!/*/}
              {/*</React.Fragment>*/}
              {/*))}*/}
            </List> : <List style={{padding: 0}}>
              {[{name: 'Home', icon: home}, {name: 'Profile', icon: profile}, {
                name: 'Jobs',
                icon: jobsIcon
              }, {name: 'Job Application Status', icon: jobsIcon}, {
                name: 'Settings',
                icon: settings
              }].map((obj, index) => (
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

EmployeeSideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(EmployeeSideNav);
