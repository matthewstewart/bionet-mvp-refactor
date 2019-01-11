import React, { Component } from 'react';
import Api from '../modules/Api';
import { Row, Column, Form, InputText, InputTextArea, InputNumber, Button, ButtonGroup } from '../components/Bootstrap';
import FadeIn from 'react-fade-in';
import PreviewGrid from './PreviewGrid';

class NewLabForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      form: {
        name: "",
        description: "",
        innerWidth: 15,
        innerHeight: 15,
        children: [],
        users: [],
        joinRequests: []
      },
      errors: {
        summary: null,
        name: null,
        description: null,
        innerWidth: null,
        innerHeight: null
      },
      instructions: {
        name: null,
        description: null,
        innerWidth: "The inner width of the Lab.",
        innerHeight: "The inner height of the Lab."
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
          /*********************************************************/
          /* Insert App.jsx Method To Set Selected Record + Action */
          /*********************************************************/
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
      if (!nameValid) { errors.name = "You must provide a valid lab name with 4 or more characters." } else { instructions.username = "Name Valid" }
      this.setState({form, errors, instructions});
    }
  }  

  render() {
    const appReady = this.props.appReady === true;
    return (
      <Form 
        className="NewLabForm"
        onSubmit={this.onFormSubmit}
      >
        { appReady && (  
          <FadeIn>
            <Row>  
              {/* Left Side Of Card Body Containing Form */}
              <Column col="12" colLg="6">
                {this.state.errors.summary && (
                  <div className="form-group">
                    <p className="text-danger">{this.state.errors.summary}</p>
                  </div>
                )}
            
                <InputText 
                  label="Name"
                  attribute="name"
                  placeholder="Lab Name"
                  value={this.state.form.name}
                  onChange={this.onInputChange} 
                  instructions={this.state.instructions.name}
                  error={this.state.errors.name}
                />

                <InputTextArea 
                  label="Description"
                  attribute="description"
                  placeholder="A short description of the Lab."
                  value={this.state.form.description}
                  onChange={this.onInputChange} 
                  instructions={this.state.instructions.description}
                  error={this.state.errors.description}
                />

                <Row>
                  <Column col="12" colLg="6">
                    <InputNumber 
                      label="Inner Width"
                      attribute="innerWidth"
                      value={this.state.form.innerWidth}
                      onChange={this.onInputChange} 
                      instructions={this.state.instructions.innerWidth}
                      error={this.state.errors.innerWidth}
                      min="1"
                      max="100"
                      step="1"
                    />
                  </Column>
                  <Column col="12" colLg="6">
                    <InputNumber 
                      label="Inner Height"
                      attribute="innerHeight"
                      value={this.state.form.innerHeight}
                      onChange={this.onInputChange} 
                      instructions={this.state.instructions.innerHeight}
                      error={this.state.errors.innerHeight}
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
                      <i className="mdi mdi-plus mr-1" />Create Lab
                    </Button>     
                  </ButtonGroup>
                </Column>

              </Column>

              {/* Right Side Of Card Body Containing PreviewGrid */}
              <Column col="12" colLg="6" style={{'overflowX': 'scroll'}}>
                <label>Lab Preview</label>
                <PreviewGrid {...this.state} />
              </Column>              

            </Row>  
          </FadeIn>
        )}  
      </Form>
    );
  }

}

export default NewLabForm;
