import React, { Component } from 'react';
import styles from './app.css';
import RenderText from './RenderText.js';
import SpeechButton from './SpeechButton';

import logo from './images/withoutbackcrapcrapcrap.png';

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
            <img className="logo" src={logo} />
            <button className="border_button"> Login </button>
            <button className="border_button"> Signup </button>
              <h1 className="mike_title">MIKE</h1>
            </div>
            <h2 className="tag_line"> Man, I Know Everything</h2>
              <div className="speech_button">
              <SpeechButton onStart={this._onStart} text={this.state.final_transcript}/>
              <div className="transcript">
                { this.state.interim_transcript || this.state.final_transcript }
              </div>
            </div>

            <img className="appstore" src="
            http://static1.squarespace.com/static/56db06fc9f7266f8a1014e34/5718e9ce1d07c0048883b2eb/5718e9f61d07c0048883b456/1461250635270/app-store-badge.png" />
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