import React, { Component } from 'react';
import Api from '../modules/Api';
import { Form, InputText, InputPassword, Button } from './Bootstrap';

class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
      },
      successMessage: "",
      errors: {
        summary: null,
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
      },
      instructions: {
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
      }
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    e.preventDefault();
    let form = this.state.form;
    let attribute = e.target.getAttribute('name');
    let newValue = e.target.value;
    form[attribute] = newValue;
    this.setState({form});
  }

  onFormSubmit(e) {
    e.preventDefault();
    const form = this.state.form;

    const name = form.name;
    const nameValid = name && name.length > 7; 
    const email = form.email;
    // Todo: Provide email regex validation
    const emailValid = email && email.length > 12; 
    const username = form.username;
    const usernameValid = username && username.length > 4; 
    const password = form.password; 
    const passwordValid = password && password.length > 6;
    const passwordConfirm = form.passwordConfirm;
    const passwordConfirmValid = passwordConfirm === password;

    const formValid = nameValid && emailValid && usernameValid && passwordValid && passwordConfirmValid;
    let errors = this.state.errors;
    let instructions = this.state.instructions;
    if (formValid) {
      Api.signup(this.state.form)
      .then((result) => {
        this.props.debuggingMode && console.log('SignupForm.onFormSubmit.Api.signup.result', result);
        let successMessage = "";
        if (result.success) {
          //Auth.authenticateUser(result.token);
          //this.props.refreshAppState();
          successMessage = "Signup Successful. Login.";
          errors.summary = null;
        } else {
          errors.summary = result.message;
        }  
        form.name = "";
        form.email = "";
        form.username = "";
        form.password = "";
        form.passwordConfirm = "";
        errors.name = null;
        errors.email = null;
        errors.username = null;
        errors.password = null;
        errors.passwordConfirm = null;
        instructions.name = null;
        instructions.email = null;
        instructions.username = null;
        instructions.password = null;
        instructions.passwordConfirm = null;
        this.setState({form, errors, instructions, successMessage}); 
      });
    } else {
      if (!nameValid) { errors.name = "You must provide a valid name." } else { instructions.name = "Name Valid" }
      if (!emailValid) { errors.email = "You must provide a valid email." } else { instructions.email = "Email Valid" }
      if (!usernameValid) { errors.username = "You must provide a valid username." } else { instructions.username = "Username Valid" }
      if (!passwordValid) { errors.password = "You must provide a valid password." } else { instructions.password = "Password Valid" }
      if (!passwordConfirmValid) { errors.passwordConfirm = "Passwords do not match." } else { instructions.passwordConfirm = "Passwords Match" }
      this.setState({form, errors, instructions});
    }
  }

  render() {
    return (
      <Form 
        style={{'width': '200px'}}
        onSubmit={this.onFormSubmit}
      >
        {this.state.errors.summary && (
          <div className="form-group">
            <p className="text-danger">{this.state.errors.summary}</p>
          </div>
        )}
        {this.state.successMessage && (
          <div className="form-group">
            <p className="text-success">{this.state.successMessage}</p>
          </div>
        )}
        <InputText 
          label="Name"
          attribute="name"
          placeholder="name"
          value={this.state.form.name}
          onChange={this.onInputChange} 
          instructions={this.state.instructions.name}
          error={this.state.errors.name}
        />
        <InputText 
          label="Email"
          attribute="email"
          placeholder="youremailaddress@example.com"
          value={this.state.form.email}
          onChange={this.onInputChange} 
          instructions={this.state.instructions.email}
          error={this.state.errors.email}
        />
        <InputText 
          label="Username"
          attribute="username"
          placeholder="username"
          value={this.state.form.username}
          onChange={this.onInputChange} 
          instructions={this.state.instructions.username}
          error={this.state.errors.username}
        />
        <InputPassword
          label="Password"
          attribute="password"
          placeholder="password"
          value={this.state.form.password}
          onChange={this.onInputChange} 
          instructions={this.state.instructions.password}
          error={this.state.errors.password}
        />
        <InputPassword
          label="Confirm Password"
          attribute="passwordConfirm"
          placeholder="password (again)"
          value={this.state.form.passwordConfirm}
          onChange={this.onInputChange} 
          instructions={this.state.instructions.passwordConfirm}
          error={this.state.errors.passwordConfirm}
        />
        <Button
          className="btn-block mt-3"
          color="success"
          submit
        >
          <i className="mdi text-lg mdi-clipboard-account mr-2" />Sign Up
        </Button>
      </Form>
    );
  }

}

export default SignupForm;
