import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';

import OrganizationDeleteDialog from '../../components/organizations/OrganizationDeleteDialog';
import OrganizationEditDialog from '../../components/organizations/OrganizationEditDialog';
import MembershipsTable from '../../components/memberships/MembershipsTable'
import RidesTable from '../../containers/rides/RidesTable'

import { fetchOrganizationInfo, deleteOrganization, updateOrganization } from '../../store/organizations/actions';

import { getOrganizationById } from '../../store/organizations/reducer'

function TabContainer(props) {
  return <div>{props.children}</div>;
}

class OrganizationShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'members'
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.props.fetchInfo(this.props.organization.id)
  }

  deleteOrganization = (id) => {
    this.props.deleteOrganization(this.props.organization.id)
  }

  updateOrganization = (organization) => {
    this.props.updateOrganization(organization)
  }

  render () {
    if (this.props.organization) {
      return (
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="display1" component="h2">
              {this.props.organization.name}
            </Typography>
            <Typography component="h3">
              {this.props.organization.description}
            </Typography>
            <OrganizationEditDialog organization={this.props.organization} updateOrganization={this.updateOrganization} />
            <OrganizationDeleteDialog organization={this.props.organization} deleteOrganization={this.deleteOrganization} />
          </Paper>
          <Paper>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="accent"
              textColor="accent"
            >
              <Tab value="members" icon={<PhoneIcon />} label="Members" />
              <Tab value="rides" icon={<PhoneIcon />} label="Rides" />
            </Tabs>
          </Paper>
          <Paper>
            {this.state.value === 'members' && <TabContainer><MembershipsTable organization={this.props.organization} /></TabContainer>}
            {this.state.value === 'rides' && <TabContainer><RidesTable organization={this.props.organization} /></TabContainer>}
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
  const organization = getOrganizationById(state, ownProps.match.params.organizationId)
  return {
    organization: organization
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (organizationId) => dispatch(fetchOrganizationInfo(organizationId)),
    deleteOrganization: (organizationId) => dispatch(deleteOrganization(organizationId)),
    updateOrganization: (organization) => dispatch(updateOrganization(organization))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationShow)
