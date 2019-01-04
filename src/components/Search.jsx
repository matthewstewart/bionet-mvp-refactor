import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import Api from '../modules/Api';
import './Search.scss';

class Search extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
    this.getData = this.getData.bind(this);
  }

  async getData() {
    try {
      let records = [];

      let labsResponse = await Api.get("labs");
      for(let i = 0; i < labsResponse.data.length; i++){
        labsResponse.data[i]['type'] = 'Lab';
        labsResponse.data[i]['icon'] = 'teach';
      }
      const labs = labsResponse.data;
      records = records.concat(labsResponse.data);

      let containersResponse = await Api.get("containers");
  
      for(let i = 0; i < containersResponse.data.length; i++){
        containersResponse.data[i]['type'] = 'Container';
        containersResponse.data[i]['icon'] = 'grid';
      }
      const containers = containersResponse.data;
      records = records.concat(containersResponse.data);

      let physicalsResponse = await Api.get("physicals");
      for(let i = 0; i < physicalsResponse.data.length; i++){
        physicalsResponse.data[i]['type'] = 'Physical';
        physicalsResponse.data[i]['icon'] = 'flask';
      }
      const physicals = physicalsResponse.data;
      records = records.concat(physicalsResponse.data);

      let virtualsResponse = await Api.get("virtuals");
      for(let i = 0; i < virtualsResponse.data.length; i++){
        virtualsResponse.data[i]['type'] = 'Virtual';
        virtualsResponse.data[i]['icon'] = 'dna';
      }
      const virtuals = virtualsResponse.data;
      records = records.concat(virtualsResponse.data);

      const result = {
        labs,
        containers,
        physicals,
        virtuals,
        records
      };

      return result;     
    } catch (error) {
      console.log('Search.getData', error);
    }
  }

  onChange(selectedRecords) {
    let selectedRecord = selectedRecords[0];
    this.props.debuggingMode && console.log('search.onChange', selectedRecord);
    this.props.setSelectedRecord(selectedRecord);
  }

  componentDidMount() {
    this.getData()
    .then((result) => {
      this.props.setRecords(result.records);
      this.props.setLabs(result.labs);
      this.props.setContainers(result.containers);
      this.props.setPhysicals(result.physicals);
      this.props.setVirtuals(result.virtuals);
    })
    .catch((error) => {
      console.log('Search.componentDidMount.getData.error', error);
    });
  }

  render() {
    return (
      <div className="Search">
        <Typeahead
          labelKey={(option) => {
            let isLab = option.type === 'Lab';
            let isContainer = option.type === 'Container';
            let isPhysical = option.type === 'Physical';
            let isVirtual = option.type === 'Virtual';
            let label = isLab || isVirtual ? `${option.name}` : isContainer ? `${option.lab.name} / ${option.name}` : isPhysical ? `${option.lab.name} / ${option.name}` : null;
            return label; 
          }}
          name="search"
          placeholder="<enter search here>"
          className="border-0"
          options={this.props.records}
          onChange={(selected) => { this.onChange(selected) }}
        />
      </div>
    );
  }
}

export default Search;

