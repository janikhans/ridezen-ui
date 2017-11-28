import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class MembershipDeleteDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.deleteMembership(this.props.membership.id)
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}><DeleteIcon /></IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{"Remove this Member?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this member? This deletes all records associated with them.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Nevermind
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Yes Please
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MembershipDeleteDialog;
