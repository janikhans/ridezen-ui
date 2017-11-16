import React from 'react';
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import DirectionsCar from 'material-ui-icons/DirectionsCar';

import Home from "./Home";
import Vehicles from "./Vehicles";
import Contact from "./Contact";
import Vehicle from "./components/Vehicle";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
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
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100vh',
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
      marginTop: 64,
    },
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <List>
        <ListItem button component={NavLink} to='/'>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          Home
        </ListItem>
        <ListItem button component={NavLink} to="/vehicles">
          <ListItemIcon>
            <DirectionsCar />
          </ListItemIcon>
          Vehicles
        </ListItem>
        <ListItem button component={NavLink} to="/contact">
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          Contact
        </ListItem>
      </List>
    );

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
                <Typography type="title" color="inherit" noWrap>
                  TrackR
                </Typography>
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
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden mdDown implementation="css">
              <Drawer
                type="permanent"
                open
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <main className={classes.content}>
              <Route exact path="/" component={Home} />
              <Route exact path="/vehicles" component={Vehicles} />
              <Route path="/contact" component={Contact} />
              <Route exact path="/vehicles/:vehicleId" component={Vehicle} />
            </main>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
