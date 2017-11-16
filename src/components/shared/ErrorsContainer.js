import React, { Component } from 'react';

class ErrorsContainer extends Component {
  render () {
    const errors = this.props.errors
    return (
      <div className='error-container'>
        <h3>The Following Errors Occured:</h3>
        {Object.keys(errors).map(function(key,index) {
          return (<div><strong>{key}:</strong> {errors[key].join(', ')}</div>);
        })}
      </div>
    )
  }
}

export default ErrorsContainer;
