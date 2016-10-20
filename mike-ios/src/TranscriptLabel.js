let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
  createElement: ce,
} = React;

var thing = '';

class TranscriptLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsShow: false,
    }
  }
  render() {
    
    return (
      ce(View, { onPress, style: styles.view },
        ce(Text, { onPress, style: styles.yes }, this.props.desc)
      )
    );
  }
}

var styles = StyleSheet.create({
  view: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: '#333333',
  },
  label: {
    fontSize: 15,
  },
  yes: {
    color: '#FFFFFF'
  }
});

module.exports = TranscriptLabel;
