import React, { Component } from 'react';
import organizationsApi from '../../services/organizations'
import update from 'immutability-helper'
import _ from 'lodash';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import MembershipCreateDialog from './MembershipCreateDialog'
import MembershipRow from './MembershipRow';

class MembershipsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organization: this.props.organization,
      memberships: []
    }
  }

  componentDidMount = () => {
    organizationsApi.getOrganizationMemberships(this.state.organization.id)
    .then(response => {
      this.setState({
        memberships: response.data
      })
    })
    .catch(error => console.log(error))
  }

  addMembership = (membership) => {
    this.setState({
      memberships: this.state.memberships.concat(membership)
    })
  }

  deleteMembership = (id) => {
    organizationsApi.deleteOrganizationMembership(this.state.organization.id, id)
    .then(response => {
      const membershipIndex = this.state.memberships.findIndex(x => x.id === id)
      const memberships = update(this.state.memberships, { $splice: [[membershipIndex, 1]]})
      this.setState({memberships: memberships})
    })
    .catch(error => console.log(error))
  }

  renderMembershipRow(membership) {
    return (
      <MembershipRow key={membership.id}
        membership={membership}
        deleteMembership={this.deleteMembership}
      />
    )
  }

  render () {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell numeric>Role</TableCell>
                <TableCell numeric>Invitation</TableCell>
                <TableCell numeric>Invited On</TableCell>
                <TableCell numeric><MembershipCreateDialog organization={this.props.organization} addMembership={this.addMembership}/></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(this.state.memberships, this.renderMembershipRow.bind(this))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default MembershipsTable;
