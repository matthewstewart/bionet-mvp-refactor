import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from '../components/Bootstrap';

class MessageCard extends Component {
  
  render() {
    const iconClass = this.props.iconClass ? this.props.iconClass : "message-alert-outline";
    const iconClasses = `mdi mdi-${iconClass} mr-2 ${this.props.className}`;
    const title = this.props.title ? this.props.title : "Message";
    return (
        <Card className="MessageCard">
          <CardHeader dark>
            <CardTitle>
              <i className={iconClasses}/>{title}
            </CardTitle>
          </CardHeader>
          <CardBody>
            {this.props.children}
          </CardBody>
        </Card>
    );
     
  }

}

export default MessageCard;
