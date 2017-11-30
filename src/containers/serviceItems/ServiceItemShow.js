import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';

import ServiceItemDeleteDialog from '../../components/serviceItems/ServiceItemDeleteDialog';
import ServiceItemEditDialog from '../../components/serviceItems/ServiceItemEditDialog';
import DefaultIntervalsTable from '../../components/defaultIntervals/DefaultIntervalsTable'

import { fetchServiceItemInfo, deleteServiceItem, updateServiceItem } from '../../store/serviceItems/actions';
import * as vehicleTypesSelectors from '../../store/vehicleTypes/reducer'
import * as serviceItemsSelectors from '../../store/serviceItems/reducer'

function TabContainer(props) {
  return <div>{props.children}</div>;
}

class ServiceItemShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'intervals'
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.props.fetchInfo(this.props.serviceItem.id)
  }

  deleteServiceItem = (serviceItemid) => {
    this.props.deleteServiceItem(serviceItemid)
  }

  updateServiceItem = (serviceItem) => {
    this.props.updateServiceItem(serviceItem)
  }

  render () {
    if (this.props.serviceItem) {
      return (
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="display1">
              {this.props.serviceItem.name}
            </Typography>
            <ServiceItemEditDialog serviceItem={this.props.serviceItem} updateServiceItem={this.updateServiceItem} />
            <ServiceItemDeleteDialog serviceItem={this.props.serviceItem} deleteServiceItem={this.deleteServiceItem} />
          </Paper>
          <Paper>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="accent"
              textColor="accent"
            >
              <Tab value="intervals" icon={<PhoneIcon />} label="INTERVALS" />
            </Tabs>
          </Paper>
          <Paper>
            {
              this.state.value === 'intervals' &&
              <TabContainer>
                <DefaultIntervalsTable
                  serviceItem={this.props.serviceItem}
                  serviceItemsById={this.props.serviceItemsById}
                  vehicleTypesById={this.props.vehicleTypesById}
                />
              </TabContainer>
            }
          </Paper>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Wait...</h1>
        </div>
    )}
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    serviceItem: serviceItemsSelectors.getServiceItemById(state, ownProps.match.params.serviceItemId),
    serviceItemsById: serviceItemsSelectors.getServiceItemsById(state),
    vehicleTypesById: vehicleTypesSelectors.getVehicleTypesById(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (serviceItemId) => dispatch(fetchServiceItemInfo(serviceItemId)),
    deleteServiceItem: (serviceItemId) => dispatch(deleteServiceItem(serviceItemId)),
    updateServiceItem: (serviceItem) => dispatch(updateServiceItem(serviceItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceItemShow)
