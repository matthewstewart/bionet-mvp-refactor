import React, { Component } from 'react';
//import shortid from 'shortid';
//import Api from '../modules/Api';
import { CardBody, CardText, Button, ButtonGroup, Form, InputText, InputNumber, InputTextArea, InputColor } from './Bootstrap';

class ModelEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: this.props.selectedRecord
    };
    this.onFormInputChange = this.onFormInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  onFormInputChange(e) {
    const form = this.state.form;
    const inputType = e.target.getAttribute('type');
    const name = e.target.getAttribute('name');
    form[name] = inputType === 'number' ? Number(e.target.value) : e.target.value;
    this.setState({form});
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log('ModelEdit.onFormSubmit called');
    this.validateForm();
  }

  onCancel(e) {
    e.preventDefault();
    console.log('Cancel Edit Clicked!');
    this.props.setModelState({
      mode: 'Profile'
    });
  }

  onDeleteClick(e) {
    e.preventDefault();
    console.log('Delete Clicked!');
    this.props.setModelState({
      mode: 'Delete'
    });    
  }

  validateForm() {
    
  }

  componentDidMount() {
    //console.log(this.props.fields);
  }

  componentDidUpdate() {}

  render() {
    const modelReady = this.props.modelReady === true;
    const isLoggedIn = this.props.isLoggedIn === true;
    //const modelName = this.props.modelName;


    //const modelFields = this.props.fields;

    let allFormFields = [];

    // const textFields = modelFields.text.map((attr, fieldIndex) => {
    //   attr.type = 'text';
    //   allFormFields.push(attr);
    //   return <InputText key={attr.name} label={attr.name} placeholder="Text" attribute={attr.name} value={this.state.form[attr.name]} onChange={this.onFormInputChange} />
    // });
    
    // const textAreaFields = modelFields.textArea.map((attr, fieldIndex) => {
    //   attr.type = 'textarea';
    //   allFormFields.push(attr);
    //   return <InputTextArea key={attr.name} placeholder="Text" attribute={attr.name} value={this.state.form[attr.name]} onChange={this.onFormInputChange} /> 
    // });

    // const numberFields = modelFields.number.map((attr, fieldIndex) => {
    //   attr.type = 'number';
    //   allFormFields.push(attr);
    //   return <InputNumber key={attr.name} label={attr.name} placeholder="Number" attribute={attr.name} value={this.state.form[attr.name] || ""} onChange={this.onFormInputChange} /> 
    // });

    // const colorFields = modelFields.color.map((attr, fieldIndex) => {
    //   attr.type = 'color';
    //   allFormFields.push(attr);
    //   return <InputColor key={attr.name} placeholder="Text" attribute={attr.name} value={this.state.form[attr.name]} onChange={this.onFormInputChange} /> 
    // });

    let allFormFieldsSorted = [];

    for(let i = 0; i < allFormFields.length; i++){
      
      for(let j = 0; j < allFormFields.length; j++){
        let formField = allFormFields[i];
        if (formField.name === 'name'){
          allFormFieldsSorted[0] = formField;
        }
        if (formField.name === 'username'){
          allFormFieldsSorted[0] = formField;
        }
        if (formField.name === 'description'){
          allFormFieldsSorted[1] = formField;
        }
      }
    }

    const formInputs = Object.keys(this.props.selectedRecord).map((attr, attrIndex) => {
      
      console.log(`attr.${attrIndex + 1}`, attr)
      const isTextField = existsInArray(attr, allFormFieldsSorted);
      const isTextAreaField = existsInArray(attr, allFormFieldsSorted);
      const isNumberField = existsInArray(attr, allFormFieldsSorted);
      const isColorField = existsInArray(attr, allFormFieldsSorted);
      
      const fieldType = isTextField ? 'text' : isTextAreaField ? 'textarea' : isNumberField ? 'number' : isColorField ? 'color' : null;
      if (fieldType) {
        switch (fieldType) {
          case 'text':
            return <InputText key={attr.name} label={attr.name} placeholder="Text" attribute={attr.name} value={this.state.form[attr.name]} onChange={this.onFormInputChange} />
          case 'number':
            return <InputNumber key={attr.name} label={attr.name} placeholder="Number" attribute={attr.name} value={this.state.form[attr.name] || ""} onChange={this.onFormInputChange} />
          case 'textarea':
            return <InputTextArea key={attr.name} placeholder="Text" attribute={attr.name} value={this.state.form[attr.name]} onChange={this.onFormInputChange} /> 
          case 'color':
            return <InputColor key={attr.name} placeholder="Text" attribute={attr.name} value={this.state.form[attr.name]} onChange={this.onFormInputChange} />           
          default:
            return null;  
        }
      } else { return null; }
    });


    return (
      <CardBody className="ModelEdit">
        {isLoggedIn && modelReady ? (
          <Form className="form" onSubmit={this.onFormSubmit}>
            {formInputs}
            <CardText>* Required</CardText>
            <ButtonGroup className="mt-3">
              <Button mode="Profile" onClick={this.onCancel}>
                <i mode="Profile" className="mdi mdi-arrow-left-bold-circle mr-2"/>Back To Profile
              </Button>
              <Button color="success" submit>
                <i className="mdi mdi-content-save mr-2"/>Save
              </Button>
              <Button className="ml-3" color="danger" onClick={this.onDeleteClick}>
                <i className="mdi mdi-delete mr-3"/>Delete
              </Button>
            </ButtonGroup>
          </Form>
        ) : (
          <CardBody>
            <CardText>
              <i className="mdi text-lg mdi-timer-sand mr-2"/>Loading...
            </CardText>
          </CardBody>  
        )}  
      </CardBody>
    );
  }

}

export default ModelEdit;


function existsInArray(attr, objArray) {
  let objectFound = false;
  for(let i = 0; i < objArray.length; i++){
    let thisObj = objArray[i];
    if (thisObj.name === attr) { objectFound = true; }
  }
  return objectFound;
}