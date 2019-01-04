import React, { Component } from 'react';
import Api from '../modules/Api';
import Auth from '../modules/Auth';
import { Form, InputText, InputPassword, Button } from './Bootstrap';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: ""
      },
      errors: {
        summary: null,
        username: null,
        password: null
      },
      instructions: {
        username: null,
        password: null
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
    const username = form.username;
    const usernameValid = username && username.length > 4;
    const password = form.password; 
    const passwordValid = password && password.length > 6;
    const formValid = usernameValid && passwordValid;
    let errors = this.state.errors;
    let instructions = this.state.instructions;
    if (formValid) {
      Api.login(this.state.form)
      .then((result) => {
        this.props.debuggingMode && console.log('LoginForm.onFormSubmit.Api.login.result', result);
        if (result.success) {
          Auth.authenticateUser(result.token);
          this.props.refreshAppState();
        } else {
          form.username = "";
          form.password = "";
          errors.summary = result.message;
          errors.username = null;
          errors.password = null;
          instructions.username = null;
          instructions.password = null;
          this.setState({form, errors, instructions});
        }  
      });
    } else {
      if (!usernameValid) { errors.username = "You must provide a valid username." } else { instructions.username = "Username Valid" }
      if (!passwordValid) { errors.password = "You must provide a valid password." } else { instructions.password = "Password Valid" }
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
        <Button
          className="btn-block mt-3"
          color="success"
          submit
        >
          <i className="mdi text-lg mdi-login-variant mr-2" />Login
        </Button>
      </Form>
    );
  }

}

export default LoginForm;
