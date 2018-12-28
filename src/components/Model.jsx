import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from '../components/Bootstrap';

class Model extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      namePlural: "",
      all: [],
      selected: {},
      newForm: {},
      editForm: {} 
    };
  }

  render() {
    const iconClass = this.props.iconClass ? this.props.iconClass : "help-circle-outline";
    const iconClasses = `mdi mdi-${iconClass} mr-2 ${this.props.className}`;
    const title = this.props.name ? this.props.name : "Model";
    return (
      <Card className="Model">
        <CardHeader dark>
          <CardTitle>
            <i className={iconClasses}/>{title}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </CardBody>
      </Card>
    );
  }

}

export default Model;
