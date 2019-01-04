import React, { Component } from 'react';
import { Row, Column, Form, InputText, InputTextArea, InputNumber, Button, ButtonGroup } from '../components/Bootstrap';
import FadeIn from 'react-fade-in';

class NewLabForm extends Component {

  render() {
    return (
      <Form 
        className="NewLabForm"
        onSubmit={this.props.onFormSubmit}
      >
        {this.props.errors.summary && (
          <div className="form-group">
            <p className="text-danger">{this.props.errors.summary}</p>
          </div>
        )}
        <FadeIn>
        <InputText 
          label="Name"
          attribute="name"
          placeholder="Lab Name"
          value={this.props.form.name}
          onChange={this.props.onInputChange} 
          instructions={this.props.instructions.name}
          error={this.props.errors.name}
        />
        <InputTextArea 
          label="Description"
          attribute="description"
          placeholder="A short description of the Lab."
          value={this.props.form.description}
          onChange={this.props.onInputChange} 
          instructions={this.props.instructions.description}
          error={this.props.errors.description}
        />
        <Row>
          <Column col="12" colLg="6">
            <InputNumber 
              label="Width"
              attribute="width"
              value={this.props.form.width}
              onChange={this.props.onInputChange} 
              instructions={this.props.instructions.width}
              error={this.props.errors.width}
              min="1"
              max="100"
              step="1"
            />
          </Column>
          <Column col="12" colLg="6">
            <InputNumber 
              label="Height"
              attribute="height"
              value={this.props.form.height}
              onChange={this.props.onInputChange} 
              instructions={this.props.instructions.height}
              error={this.props.errors.height}
              min="1"
              max="100"
              step="1"
            />
          </Column>
        </Row>  
        <Column className="text-center">
          <ButtonGroup>
            <Button
              className="mt-3"
              color="secondary"
              onClick={this.props.onCancel}
            >
              <i className="mdi mdi-cancel mr-1" />Cancel
            </Button>
            <Button
              className="mt-3"
              color="success"
              submit
            >
              <i className="mdi mdi-plus mr-1" />Create Lab
            </Button>     
          </ButtonGroup>
        </Column>
        </FadeIn>
      </Form>
    );
  }

}

export default NewLabForm;
