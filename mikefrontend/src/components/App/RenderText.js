import React, { Component } from 'react';
var Linkify = require('react-linkify');

class RenderText extends  Component {

  constructor(props) {
    super(props);

  }

  render() {
    const rows = this.props.data.map((val, idx) => {

      return (
        <div key={`item-${idx}`}>
          <h2>{ val.title[0] }</h2>
          <p>{ val.body[0] }</p>
          <p>{ val.bibliography[0] }</p>
          <Linkify>{ val.author[0] }</Linkify>
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