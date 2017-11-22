import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createService } from '../../store/services/actions';
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

class ServiceCreateDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      serviceItemId: '',
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
    const service = {
      name: this.state.name,
      units: this.state.units,
      distance: this.state.distance
    }
    
    this.props.createService(service)
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
              {`Add new service`}
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
    isSaving: state.services.isSaving,
    errors: state.services.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createService: (service) => dispatch(createService(service))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCreateDialog)

