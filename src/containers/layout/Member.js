import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import compose from 'recompose/compose';

import * as ridesSelectors from '../../store/rides/reducer'
import * as vehiclesSelectors from '../../store/vehicles/reducer'
import * as serviceItemsSelectors from '../../store/serviceItems/reducer'

import { fetchRides } from '../../store/rides/actions'
import { fetchVehicles } from '../../store/vehicles/actions'
import { fetchServiceItems } from '../../store/serviceItems/actions'

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';

import Navigation from '../../components/layout/Navigation'
import ModalRoot from '../../containers/modals/modalRoot';

import Home from "../../views/Home";
import Garage from "../../views/Garage";
import Contact from "../../views/Contact";
import Vehicles from "../../views/Vehicles";
import ServiceItems from "../../views/ServiceItems";

import RideShow from "../../containers/rides/RideShow"
import VehicleShow from "../../containers/vehicles/VehicleShow"
import ServiceItemShow from "../../components/serviceItems/ServiceItemShow"

const drawerWidth = 240;

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
  state = {
    mobileOpen: false,
  };

  componentDidMount() {
    if (!this.props.vehiclesLoaded) {
      this.props.fetchVehiclesData()
    }
    if (!this.props.ridesLoaded) {
      this.props.fetchRidesData()
    }
    if (!this.props.serviceItemsLoaded) {
      this.props.fetchServiceItemsData()
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    let content = ''

    if (this.props.ridesLoaded && this.props.vehiclesLoaded && this.props.serviceItemsLoaded) {
      content =
        <main className={classes.content}>
          <Route exact path="/" component={Home} />
          <Route exact path="/garage" component={Garage} />
          <Route exact path="/rides/:rideId" component={RideShow} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route exact path="/vehicles/:vehicleId" component={VehicleShow} />
          <Route exact path="/service-items" component={ServiceItems} />
          <Route exact path="/service-items/:serviceItemId" component={ServiceItemShow} />
        </main>
    } else {
      content = <main className={classes.content}>Loading...</main>
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
              <Navigation />
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
              <Navigation />
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
    vehiclesLoaded: vehiclesSelectors.isVehiclesLoaded(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRidesData: () => dispatch(fetchRides()),
    fetchServiceItemsData: () => dispatch(fetchServiceItems()),
    fetchVehiclesData: () => dispatch(fetchVehicles())
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
