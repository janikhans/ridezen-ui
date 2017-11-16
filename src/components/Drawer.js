import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
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

class PermanentDrawer extends React.Component {
  state = {
    anchor: 'left',
  };

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
            <Toolbar>
              <Typography type="title" color="inherit" noWrap>
                Permanent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor={anchor}
          >
            <div className={classes.drawerHeader} />
            <Divider />
            <List>1</List>
            <Divider />
            <List>1</List>
          </Drawer>
          <main className={classes.content}>
            <Typography type="body1">
              {'You think water moves fast? You should see ice.'}
            </Typography>
          </main>
        </div>
      </div>
    );
  }
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
