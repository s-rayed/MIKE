let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
  createElement: ce,
} = React;

var thing = '';

class Transcript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsShow: false,
    }
  }
  render() {
    const { item } = this.props
    const { detailsShow } = this.state
    console.log('item', item)
    const onPress = () => { 
      console.log('pressed')
      this.setState({ detailsShow: !this.state.detailsShow })
    }

    const details = (detailsShow)
    ? <Text style={styles.yes}>{item.description}</Text>
    : null;

    return (
      ce(View, { onPress, style: styles.view },
        ce(Text, { onPress, style: styles.yes }, item.title),
        details
      )
    );
  }
}

// ce(FooClass, null, 'Hello')

// ce('section', {},
//   ce('h1', {}, 'A great section'),
//   ce('p', {}, children)
//   )
// )
// <section><h1>A great section</h1><p>Hello</p></section>

var styles = StyleSheet.create({
  view: {
    marginTop: 20,
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
    // color: '#FFFFFF',
    color: '#123123',
    marginTop: 20,
  }
});

module.exports = Transcript;
