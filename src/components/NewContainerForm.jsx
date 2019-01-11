import React, { Component } from 'react';
import Api from '../modules/Api';
import { Row, Column, Form, InputText, InputTextArea, InputNumber, Button, ButtonGroup } from '../components/Bootstrap';
import FadeIn from 'react-fade-in';

class NewContainerForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      form: {
        lab: "",
        name: "",
        description: "",
        width: 3,
        height: 3,
        users: [] 
      },
      errors: {
        summary: null,
        name: null,
        description: null,
        width: null,
        height: null
      },
      instructions: {
        name: null,
        description: null,
        width: null,
        height: null
      }
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onInputChange(e) {
    e.preventDefault();
    let form = this.state.form;
    let attribute = e.target.getAttribute('name');
    let type = e.target.getAttribute('type');
    let newValue = type === 'number' ? Number(e.target.value) : e.target.value;
    form[attribute] = newValue;
    this.setState({form});
  }

  onCancel(e) {
    e.preventDefault();
    this.props.setAction('View', 'Labs');
  }

  onFormSubmit(e) {
    e.preventDefault();
    let form = this.state.form;
    form['createdBy'] = this.props.currentUser._id;
    form['updatedBy'] = this.props.currentUser._id;
    form['users'][0] = this.props.currentUser._id;
    const name = form.name;
    const nameValid = name && name.length > 4;
    const formValid = nameValid;
    let errors = this.state.errors;
    let instructions = this.state.instructions;
    if (formValid) {
      Api.post('labs/new', this.state.form)
      .then((result) => {
        console.log('NewLab.onFormSubmit.Api.post.result', result);
        if (result.success) {
          //this.setState({ redirect: true });
        } else {
          // form.username = "";
          // form.password = "";
          // errors.summary = result.message;
          // errors.username = null;
          // errors.password = null;
          // instructions.username = null;
          // instructions.password = null;
          // this.setState({form, errors, instructions});
        }  
      });
    } else {
      if (!nameValid) { errors.name = "You must provide a valid container name with 4 or more characters." } else { instructions.username = "Name Valid" }
      this.setState({form, errors, instructions});
    }
  }  

  render() {
    const appReady = this.props.appReady === true;
    return (
      <Form 
        className="NewContainerForm"
        onSubmit={this.onFormSubmit}
      >
        { appReady && (  
          <FadeIn>  
            {this.state.errors.summary && (
              <div className="form-group">
                <p className="text-danger">{this.state.errors.summary}</p>
              </div>
            )}
            
            <InputText 
              label="Name"
              attribute="name"
              placeholder="Container Name"
              value={this.state.form.name}
              onChange={this.state.onInputChange} 
              instructions={this.state.instructions.name}
              error={this.state.errors.name}
            />
            <InputTextArea 
              label="Description"
              attribute="description"
              placeholder="A short description of the Container."
              value={this.state.form.description}
              onChange={this.state.onInputChange} 
              instructions={this.state.instructions.description}
              error={this.state.errors.description}
            />
            <Row>
              <Column col="12" colLg="6">
                <InputNumber 
                  label="Width"
                  attribute="width"
                  value={this.state.form.width}
                  onChange={this.state.onInputChange} 
                  instructions={this.state.instructions.width}
                  error={this.state.errors.width}
                  min="1"
                  max="100"
                  step="1"
                />
              </Column>
              <Column col="12" colLg="6">
                <InputNumber 
                  label="Height"
                  attribute="height"
                  value={this.state.form.height}
                  onChange={this.state.onInputChange} 
                  instructions={this.state.instructions.height}
                  error={this.state.errors.height}
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
                  onClick={this.onCancel}
                >
                  <i className="mdi mdi-cancel mr-1" />Cancel
                </Button>
                <Button
                  className="mt-3"
                  color="success"
                  submit
                >
                  <i className="mdi mdi-plus mr-1" />Create Container
                </Button>     
              </ButtonGroup>
            </Column>
          </FadeIn>
        )}  
      </Form>
    );
  }

}

export default NewContainerForm;
