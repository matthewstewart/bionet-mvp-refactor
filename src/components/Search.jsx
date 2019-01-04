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

      let labs = await Api.get("labs");
      for(let i = 0; i < labs.data.length; i++){
        labs.data[i]['type'] = 'Lab';
        labs.data[i]['icon'] = 'teach';
      }
      records = records.concat(labs.data);

      let containers = await Api.get("containers");
  
      for(let i = 0; i < containers.data.length; i++){
        containers.data[i]['type'] = 'Container';
        containers.data[i]['icon'] = 'grid';
      }
      records = records.concat(containers.data);

      let physicals= await Api.get("physicals");
      for(let i = 0; i < physicals.data.length; i++){
        physicals.data[i]['type'] = 'Physical';
        physicals.data[i]['icon'] = 'flask';
      }
      records = records.concat(physicals.data);

      let virtuals = await Api.get("virtuals");
      for(let i = 0; i < virtuals.data.length; i++){
        virtuals.data[i]['type'] = 'Virtual';
        virtuals.data[i]['icon'] = 'dna';
      }
      records = records.concat(virtuals.data);
      //console.log('records', records)
      return records;     
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
    .then((records) => {
      //console.log('result', records);
      this.setState({ records });
    })
    .catch((error) => {
      console.log('Search.componentDidMount.getData.error', error);
    });
  }

  render() {
    const appReady = this.props.appReady === true;
    
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
          placeholder={appReady ? "Search Bionet" : "Search..."}
          className="border-0"
          options={this.state.records}
          onChange={(selected) => { this.onChange(selected) }}
        />

      </div>
    );
  }
}

export default Search;

      // <form className="Search form-inline my-2 my-lg-0">
      //   <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      //   <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      // </form>