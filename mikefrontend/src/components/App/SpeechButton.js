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
    ? <img id="button" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSL9mZU83OuUsrCxajkqYx_MKL12ACcmhRwjJsRHby9sCn6tV9R"/>
    : <img id="button" src="http://previews.123rf.com/images/arcady31/arcady311204/arcady31120400026/13310777-microphone-button-Stock-Vector-microphone-logo-podcast.jpg"/>

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
