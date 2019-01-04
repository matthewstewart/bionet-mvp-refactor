import React, { Component } from 'react';
import { CardBody, CardText, ButtonGroup, Button } from '../components/Bootstrap';

class ModelDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onCancelClick(e) {
    e.preventDefault();
    console.log('Cancel Delete Clicked!');
    this.props.setModelState({
      mode: 'Edit'
    });
  }

  onDeleteClick(e) {
    e.preventDefault();
    console.log('Delete Clicked!');
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {

    return (
      <CardBody className="ModelDelete">
        <CardText>
          <i className="mdi mdi-alert mr-2" /><strong>Warning!</strong> Deleting {this.props.selectedRecord.name} cannot be undone! Are you sure you want to proceed?
        </CardText>
        <ButtonGroup className="mt-3">
          <Button onClick={this.onCancelClick}>
            <i className="mdi mdi-arrow-left-bold-circle mr-2"/>Back To Edit
          </Button>
          <Button color="danger" onClick={this.onDeleteClick}>
            <i className="mdi mdi-delete mr-3"/>Delete
          </Button>
        </ButtonGroup>
      </CardBody>
    );
  }

}

export default ModelDelete;
