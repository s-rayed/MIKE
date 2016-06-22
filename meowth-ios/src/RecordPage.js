const React = require('react-native');
const base64 = require('base-64');
const Constants = require('./Constants');
const AudioRecorder = require('NativeModules').AudioRecorder;
const HttpRequest = require('NativeModules').HttpRequest;
const RecordButton = require('./RecordButton');
const Transcript = require('./Transcript');
const TranscriptLabel = require('./TranscriptLabel');


let _ = require('lodash');
const ce = React.createElement;

let {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  ScrollView
} = React;

let Status = Constants.STATUS;

function generateBasicAuth(username, password) {
  return 'Basic ' + base64.encode(username + ':' + password);
}

class RecordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: Status.WAITING,
      transcripts: [],
      question: '',
      result: []
    };
  }

  _onRecognize(error, rawResponse) {
    const self = this
    let response = JSON.parse(rawResponse);

    let transcript = null;
    let alternatives = response.results.length && response.results[0].alternatives;

    if (alternatives.length) {
      transcript = alternatives[0].transcript;
    }
    this.setState({
      status: Status.WAITING,
      transcripts: this.state.transcripts.concat(transcript),
    });

    var transcripts = this.state.transcripts.concat(transcript);

    fetch('https://pure-bastion-73183.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: transcript
      })

    })
    .then(data => data.json())
    .then(function(data){
      const result = data.data.map((item) => ({
       id: item.id,
       author: item.author[0],
       description: item.bibliography[0],
       title: item.title[0],
       body: item.body[0]
     }))
      self.setState({
        result
      })

    });
  }

  _onPress() {
    switch(this.state.status) {
      case Status.WAITING:
      AudioRecorder.setup(Constants.RECORD_FILE, function callback (fullPath) {
        AudioRecorder.start();

        this.setState({
          status: Status.RECORDING,
          fullPath: fullPath,
        });
      }.bind(this));
      break;

      case Status.RECORDING:
      this.setState({
        status: Status.RECOGNIZING,
      });

      let headers = {
        'Authorization': generateBasicAuth(Constants.USERNAME, Constants.PASSWORD),
        'Content-Type': Constants.MIME_TYPE,
        'Transfer-Encoding': 'chunked',
      };

      AudioRecorder.stop();
      HttpRequest.postFile(Constants.API_URL, headers, this.state.fullPath, this._onRecognize.bind(this));
      break;
    }
  }

  render() {
    const { status, result, transcripts } = this.state;
    const transcriptLabels = transcripts.map((term, key) => (
      <View key={`key-${key}`}>
        <Text style={styles.question}>{term}</Text>
      </View>
    ));
    
    const resultRows = result.map((item, key) => <Transcript item={item} key={`result-${key}`} />);

    return (
      <ScrollView style={styles.container}>
          <Text style={styles.instructions }>
            Touch to record your voice
          </Text>
          
          <RecordButton
            status={status}
            onPress={ this._onPress.bind(this) } 
          />
      
          { transcriptLabels }
          { resultRows }
      </ScrollView>
    );  
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#212121',
  },
  instructions: {
    color: '#F5FCFF',
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
  },
  question: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
  }
});

module.exports = RecordPage;