import React, { Component } from 'react';
import styles from './app.css';
import RenderText from './RenderText.js';
import SpeechButton from './SpeechButton';


class App extends Component {

  constructor(props) {
    super(props);
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onstart = this._recordingStart;
    recognition.onerror = () => {
      this.setState({
        recognizing: false
      });

      console.error('Error buddy');
    };
    recognition.onend = this._recordingEnd;
    recognition.onresult = this._record;

    this.state = {
      final_transcript: '',
      interim_transcript: '',
      recognizing: false,
      recognition,
      data: null
    }

  }

render() {
  const renderText = this.state.data
  ? <RenderText data={this.state.data} />
  : null;

  return (
    <div className="mike_title">
      <h1>MIKE</h1>
      
     <div>
      { this.state.interim_transcript || this.state.final_transcript }
    </div>
  
      <SpeechButton onStart={this._onStart} text={this.state.final_transcript}/>
      
      { renderText }
    </div>
  );
};

  _onStart = (e) => {
    const { recognizing, recognition } = this.state;

    if (recognizing) {
      recognition.stop();
      return;
    }

    this.setState({ 
      final_transcript: '',
      interim_transcript: ''
    });

    recognition.start();
  };

  _recordingStart = (e) => {
    this.setState({
      recognizing: true
    });
  };

  _recordingEnd = (e) => {
    this.setState({
      recognizing: false
    });

    this._callApi();
  };

  _record = (e) => {

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        this.setState({
          final_transcript: event.results[i][0].transcript
        });
      } else {
        this.setState({
          interim_transcript: event.results[i][0].transcript
        });
      }
    }
  };

  _callApi = () => {
    const self = this;

    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        question: this.state.final_transcript
      })
    })
    .then(response => response.json())
    .then(data => self.setState({ data: data.data }))
    .catch(err => console.error(err.message)); 
  }

}

export default App