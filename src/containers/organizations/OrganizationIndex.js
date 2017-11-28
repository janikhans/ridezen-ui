import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { addOrganization } from '../../store/organizations/actions';
import * as organizationsSelectors from '../../store/organizations/reducer';

import OrganizationCard from '../../components/organizations/OrganizationCard';
import OrganizationCreateDialog from '../../components/organizations/OrganizationCreateDialog';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class OrganizationIndex extends Component {
  addNewOrganization = (organization) => {
    this.props.addOrganization(organization)
  }

  renderCardById(organizationId) {
    const organization = _.get(this.props.organizationsById, organizationId)
    return (
      <OrganizationCard key={organizationId} organization={organization}/>
    )
  }

  render () {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <div>
        <div>
          <Paper className="paper-header" elevation={1}>
            <Typography type="headline" component="h2">
              Your Organizations
              <OrganizationCreateDialog addNewOrganization={this.addNewOrganization}/>
            </Typography>
          </Paper>
        </div>
        <Grid container spacing={24}>
          {_.map(this.props.organizationsIdArray, this.renderCardById.bind(this))}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.organizations.hasErrored,
    isLoading: state.organizations.isLoading,
    organizationsById: organizationsSelectors.getOrganizationsById(state),
    organizationsIdArray: organizationsSelectors.getOrganizationsIdArray(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addOrganization: (organization) => dispatch(addOrganization(organization))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationIndex)
