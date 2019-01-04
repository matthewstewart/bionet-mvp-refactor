import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Api from '../modules/Api';
import { ContainerFluid, Row, Column, Card, CardHeader, CardTitle, CardBody } from '../components/Bootstrap';
import FadeIn from 'react-fade-in';

import NewLabForm from '../components/NewLabForm';

class NewLab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      form: {
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
          this.setState({ redirect: true });
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
    if (this.state.redirect) { 
      return (
        <Redirect to="/" />
      );
    } 
    return (
      
      <div className="NewLab">
        { appReady ? (  
          <FadeIn>
            <ContainerFluid>
              <Row className="justify-content-lg-center">
                <Column col="12" colLg="6">
                  <Card className="mt-3">
                    <CardHeader dark>
                      <CardTitle>
                        <i className="mdi mdi-teach mr-2" />New Lab
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Column col="12" colLg="6">
                          <NewLabForm 
                            {...this.props} 
                            {...this.state} 
                            onInputChange={this.onInputChange} 
                            onFormSubmit={this.onFormSubmit} 
                          />
                        </Column>
                        <Column col="12" colLg="6">
                          <h5 className="">Lab Preview</h5>
                          
                        </Column>
                      </Row>
                    </CardBody>
                  </Card>                  
                </Column>
              </Row>
            </ContainerFluid>
          </FadeIn>     
        ) : (
          <div className="page-loading"></div>
        )}  
        
      </div>
    );
  }

}

export default NewLab;
