import React, { Component } from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }
  
  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.handleRequestClose}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          {this.props.children}
        </DialogContent>
        <DialogActions>
          {this.props.actions}
        </DialogActions>
      </Dialog>
    )
  }
}

export default Modal;
