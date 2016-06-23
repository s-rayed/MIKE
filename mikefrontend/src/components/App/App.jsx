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
  _startOver = (e) => {
    this.setState({
      final_transcript: '',
      interim_transcript: '',
      recognizing: false,
      data: null
    });
  };
  render() {
    return (
      <div>
        {!this.state.data ? (
          <div>
            <div className="top_border">
              <h1 className="mike_title">MIKE</h1>
              <img src="https://www.dropbox.com/s/lk397y9x3uah7k5/withoutbackcrapcrapcrap%20%281%29.png?dl=0" />
            </div>
            <h2 className="waddup"> Man, I Know Everything</h2>
            <div className="speech_button">
              <SpeechButton onStart={this._onStart} text={this.state.final_transcript}/>
            </div>
            <div className="transcript">
              { this.state.interim_transcript || this.state.final_transcript }
            </div>
          </div>
          ) : (
          <div>
            <a href="#" onClick={this._startOver}><img id="redirect_button" src="http://www.clker.com/cliparts/W/R/D/s/e/v/microphone-md.png"/></a>


              <RenderText data={this.state.data} />

          </div>
          )}
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

    fetch('https://pure-bastion-73183.herokuapp.com/', {
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