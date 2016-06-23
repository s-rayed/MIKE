import React, { Component } from 'react';
var Linkify = require('react-linkify');

class RenderText extends  Component {

  constructor(props) {
    super(props);

  }

  render() {
    const rows = this.props.data.map((val, idx) => {

      return (
        <div className="queries" key={`item-${idx}`}>
          <h2 className="query_title">{ val.title[0] }</h2>
          <p className="textRender">{ val.body[0] }</p>
          <p className="textRender">{ val.bibliography[0] }</p>
          <p className="textRender"><Linkify>{ val.author[0] }</Linkify></p>
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