import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import compose from 'recompose/compose';

import * as ridesSelectors from '../../store/rides/reducer'
import * as vehiclesSelectors from '../../store/vehicles/reducer'
import * as serviceItemsSelectors from '../../store/serviceItems/reducer'
import * as userSelectors from '../../store/user/reducer'

import { fetchRides } from '../../store/rides/actions'
import { fetchVehicles } from '../../store/vehicles/actions'
import { fetchServiceItems } from '../../store/serviceItems/actions'
import { fetchOrganizations } from '../../store/organizations/actions'
import { fetchVehicleTypes } from '../../store/vehicleTypes/actions'
import { logoutUser } from '../../store/user/actions'

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

import Navigation from '../../components/layout/Navigation'
import ModalRoot from '../../containers/modals/modalRoot';

import Dashboard from "../../views/Dashboard";
import Garage from "../../views/Garage";
import Contact from "../../views/Contact";
import Vehicles from "../../views/Vehicles";
import VehicleTypes from "../../views/VehicleTypes";
import ServiceItems from "../../views/ServiceItems";
import Organizations from "../../views/Organizations";

import RideShow from "../../containers/rides/RideShow"
import VehicleShow from "../../containers/vehicles/VehicleShow"
import ServiceItemShow from "../../containers/serviceItems/ServiceItemShow"
import OrganizationShow from "../../containers/organizations/OrganizationShow"

const drawerWidth = 240;
var Spinner = require('react-spinkit');

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      'min-height': '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    },
  },
});

class Member extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      anchorEl: null,
    }
  }

  componentDidMount() {
    this.props.fetchVehiclesData()
    this.props.fetchRidesData()
    this.props.fetchServiceItemsData()
    this.props.fetchOrganizationsData()
    this.props.fetchVehicleTypesData()
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.logoutUser()
  };

  render() {
    const loading =   {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh',
        flexDirection: 'column'
      },
      header: {
        marginBottom: '35px'
      }
    }

    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let content = ''

    if (this.props.ridesLoaded && this.props.vehiclesLoaded && this.props.serviceItemsLoaded) {
      content =
        <main className={classes.content}>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/garage" component={Garage} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/vehicle-types" component={VehicleTypes} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route exact path="/vehicles/:vehicleId" component={VehicleShow} />
          <Route exact path="/service-items" component={ServiceItems} />
          <Route exact path="/service-items/:serviceItemId" component={ServiceItemShow} />
          <Route exact path="/organizations" component={Organizations} />
          <Route exact path="/organizations/:organizationId" component={OrganizationShow} />
          <Route exact path="/organizations/:organizationId/rides/:rideId" component={RideShow} />
        </main>
    } else {
      content =
        <main className={classes.content}>
          <div style={loading.container}>
            <h3 style={loading.header}>Your TrackR is Loading...</h3>
            <Spinner name="ball-clip-rotate-multiple" fadeIn="half"/>
          </div>
        </main>
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="contrast"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onRequestClose={this.handleRequestClose}
              >
                <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <Navigation user={this.props.user}/>
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              type="persistent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Navigation user={this.props.user}/>
            </Drawer>
          </Hidden>
          {content}
        </div>
        <ModalRoot />
      </div>
    );
  }
}

Member.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    serviceItemsLoaded: serviceItemsSelectors.isServiceItemsLoaded(state),
    ridesLoaded: ridesSelectors.isRidesLoaded(state),
    vehiclesLoaded: vehiclesSelectors.isVehiclesLoaded(state),
    user: userSelectors.getUser(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRidesData: () => dispatch(fetchRides()),
    fetchServiceItemsData: () => dispatch(fetchServiceItems()),
    fetchVehiclesData: () => dispatch(fetchVehicles()),
    fetchOrganizationsData: () => dispatch(fetchOrganizations()),
    fetchVehicleTypesData: () => dispatch(fetchVehicleTypes()),
    logoutUser: () => dispatch(logoutUser())
  };
};

export default
  withRouter(
    compose(
      withStyles(styles, {
        withTheme: true
      }),
      connect(mapStateToProps, mapDispatchToProps)
  )(Member)
);
