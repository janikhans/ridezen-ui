import React from 'react';
import {
  Route,
  BrowserRouter
} from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';

import Navigation from './components/layout/Navigation'

import Home from "./views/Home";
import Garage from "./views/Garage";
import Contact from "./views/Contact";
import Vehicles from "./views/Vehicles";
import ServiceItems from "./views/ServiceItems";

import RideShow from "./components/rides/RideShow"
import VehicleShow from "./components/vehicles/VehicleShow"
import ServiceItemShow from "./components/serviceItems/ServiceItemShow"

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

class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <BrowserRouter>
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
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
