import React, { Component } from 'react';

class RenderText extends  Component {

  constructor(props) {
    super(props);

  }

  render() {
    const rows = this.props.data.map((val, idx) => {

      return (
        <div key={`item-${idx}`}>
          <h2>{ val.title[0] }</h2>
          <p>{ val.bibliography[0] }</p>
        </div>
      );
      
    });

    return(
      <div>
        { rows }
      </div>
    )
  }
}
export default RenderText;