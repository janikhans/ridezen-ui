import React, { Component } from 'react';

class FillUpRow extends Component {

  handleDelete = () => {
    this.props.deleteFillUp(this.props.fillUp.id)
  }

  render () {
    return (
      <tr className='fill-up'>
        <td>{this.props.fillUp.date}</td>
        <td>{this.props.fillUp.mileage}</td>
        <td>{this.props.fillUp.volume}</td>
        <td>{this.props.fillUp.price}</td>
        <td>{this.props.fillUp.topped_off ? 'Yes' : 'No'}</td>
        <td>{this.props.fillUp.note}</td>
        <td>
          <span onClick={this.handleDelete}>x</span>
        </td>
      </tr>
    )
  }
}

export default FillUpRow;
