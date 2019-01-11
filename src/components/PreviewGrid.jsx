import React, { Component } from 'react';
import shortid from 'shortid';
import FadeIn from 'react-fade-in';


class PreviewGrid extends Component {
  
  render() { 
    const form = this.props.form;
    const innerWidth = Number(form.innerWidth);
    const innerHeight = Number(form.innerHeight);
    
    // this logic works for the full size grid, the preview for forms should use 1fr for the smaller responsive grid.
    // const cellWidth = 50;
    // const cellHeight = 50;
    // const gridContainerStyles = {
    //   'width': `${innerWidth * cellWidth}px`,
    //   'height': `${innerHeight * cellHeight}px`
    // };
    // const gridStyles = {
    //   'display': 'grid',
    //   'gridTemplateColumns': `repeat(${innerWidth}, ${cellWidth}px)`,
    //   'gridTemplateRows': `repeat(${innerHeight}, ${cellHeight}px)`
    // };   

    const cellWidth = 20;
    const cellHeight = 20;

    const gridContainerStyles = {
      'width': `${innerWidth * cellWidth}px`,
      'height': `auto`,
      'maxWidth': '100%',
      'overflowX': 'scroll'
    };

    const gridStyles = {
      'display': 'grid',
      'gridTemplateColumns': `repeat(${innerWidth}, ${cellWidth}px)`,
      'gridTemplateRows': `repeat(${innerHeight}, ${cellHeight}px)`
    };  

    const gridCellStyles = {
      'border': '1px solid #ccc'
    };

    const gridCellCount = innerWidth * innerHeight;

    let gridCells = [];

    for(let i = 0; i < gridCellCount; i++){
      // gridCells.push[(
      //   <div className="preview-grid-cell"></div>
      // )];
      gridCells[i] = <div key={shortid.generate()} className="preview-grid-cell" style={gridCellStyles}></div>;
    }

    return (
      <div className="PreviewGrid"> 
        <FadeIn>
          <div className="grid-container" style={gridContainerStyles}>
            <div className="grid" style={gridStyles}>
              {gridCells}
            </div>
          </div>
        </FadeIn>     
      </div>
    );
  }

}

export default PreviewGrid;
