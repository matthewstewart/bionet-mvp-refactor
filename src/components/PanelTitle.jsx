import React, { Component } from 'react';

class PanelTitle extends Component {
  
  render() {
    let title;
    switch (this.props.action) {
      case 'View':
        title = this.props.title;
        break;
      case 'Edit':
        title = `Edit ${this.props.title}`;
        break;
      case 'Delete':
        title = `Delete ${this.props.title}`;
        break;
      case 'New':
        title = `New ${this.props.title}`;
        break;  
      default:
        title = "Select From Search"    
    }
    return (
      <>
        <i className={`mdi mdi-${this.props.icon} mr-2`}/>{title}
      </>
    )
  }

}

export default PanelTitle;