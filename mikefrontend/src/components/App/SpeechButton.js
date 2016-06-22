import React, { Component } from 'react';


class SpeechButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recording: false
    }
  }

  render() {
    const recordImage = this.state.recording
    ? <img id="button" src="http://www.clker.com/cliparts/f/t/B/8/8/8/recodring-md.png"/>
    : <img id="button" src="http://www.clker.com/cliparts/W/R/D/s/e/v/microphone-md.png"/>

    return(
      <div onClick = { this._onClick } >
        { recordImage }
      </div>
    )
  };

  _onClick = e => {
    this.setState({
      recording: !this.state.recording 
    });

    this.props.onStart(e);
  }
}

export default SpeechButton;
