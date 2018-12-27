import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from '../components/Bootstrap';

class Debug extends Component {
  
  render() {
    const title = this.props.title ? this.props.title : "Debug Console";
    return (
      <Card className="Debug">
        <CardHeader dark>
          <CardTitle>
            <i className="mdi mdi-bug mr-1"/>{title}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </CardBody>
      </Card>
    );
  }

}

export default Debug;
