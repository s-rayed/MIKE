import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class TextBox extends Component{
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    Object.assign(this, {
      handleSubmit: () => {
        fetch('http://localhost:3000', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            question: this.state.term
          })
        })
        .then(response => response.json())
        .then(data => this.setState({ this.text }))
        .catch(err => console.error(err.message)); 
      },

    });
  }

  onInputChange(term) {
    this.setState({term});
  };
  
  render() {

    const apiData = this.state.data 
    ? JSON.stringify(this.state.data)
    : null;
    
    return (
      <div id="textInput">
        <input onChange = {event => this.onInputChange(event.target.value)} />      
        <p onClick = {this.handleSubmit}>Click me</p>

        { apiData }
      </div>
      );
    }
  }

export default TextBox;
