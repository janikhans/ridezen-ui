import React, { Component } from 'react';
import ridesApi from '../../services/member/rides'

import ErrorsContainer from '../shared/ErrorsContainer'
import ServiceItemSelect from '../../containers/shared/ServiceItemSelect'

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
      mileage: this.props.ride.current_mileage,
      price: '',
      note: '',
      open: false,
      errors: null
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const new_service = {
      date: this.state.date,
      service_item_id: this.state.serviceItemId,
      mileage: this.state.mileage,
      price: this.state.price,
      note: this.state.note,
    }

    ridesApi.createRideService(this.props.ride.id, new_service)
    .then(response => {
      this.props.addRideService(this.props.ride.id, response.data)
      this.resetForm()
    })
    .catch(error => {
      this.setState({ errors: error.response.data })
    })
    e.preventDefault();
  }

  updateServiceItem = (serviceItem) => {
    this.setState({ serviceItemId: serviceItem.id })
  }

  resetForm = () => {
    this.setState({
      date: '',
      serviceItemId: '',
      mileage: '',
      price: '',
      note: '',
      open: false,
      errors: null
    })
  }

  render() {
    return (
      <div>
        <Button dense raised color="primary" className="pull-right" aria-label="add" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.resetForm}>
          <DialogTitle>Add Service</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Add new service`}
            </DialogContentText>
            {this.state.errors && <ErrorsContainer errors={this.state.errors}/>}
            <TextField
              autoFocus
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={this.state.date}
              onChange={this.handleChange}
            />
            <ServiceItemSelect
              serviceItems={this.props.serviceItems}
              serviceItemId={this.state.serviceItemId}
              updateServiceItem={this.updateServiceItem}
            />
            <TextField
              margin="dense"
              name="mileage"
              label="Mileage"
              type="number"
              fullWidth
              value={this.state.mileage}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={this.state.price}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="note"
              label="Additional Notes"
              type="text"
              fullWidth
              value={this.state.note}
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


export default ServiceCreateDialog;
