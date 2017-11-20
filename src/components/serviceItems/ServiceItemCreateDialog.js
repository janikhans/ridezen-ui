import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createServiceItem } from '../../store/serviceItems/actions';
import ErrorsContainer from '../shared/ErrorsContainer'
import UnitsSelect from '../shared/UnitsSelect'

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class ServiceItemCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      units: '',
      distance: '',
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const serviceItem = {
      name: this.state.name,
      units: this.state.units,
      distance: this.state.distance
    }
    
    this.props.createServiceItem(serviceItem)
    e.preventDefault();
  }

  updateUnits = (units) => {
    this.setState({ units: units })
  }

  resetForm = () => {
    this.setState({
      open: false,
      units: '',
      distance: '',
      name: ''
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" className="pull-right" aria-label="add" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Add to Garage</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Add new service items that will be used for all vehicles. Select the default distance and units.`}
            </DialogContentText>
            {this.props.errors && <ErrorsContainer errors={this.props.errors}/>}
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
            <UnitsSelect units={this.state.units} updateUnits={this.updateUnits}/>
            <TextField
              margin="dense"
              name="distance"
              label="Distance"
              type="text"
              fullWidth
              value={this.state.distance}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetForm} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSaving: state.serviceItems.isSaving,
    errors: state.serviceItems.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createServiceItem: (serviceItem) => dispatch(createServiceItem(serviceItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceItemCreateDialog)

