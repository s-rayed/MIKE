let React = require('react-native');
let pages = require('./pagesContent');
let RecordPage = require('./RecordPage');
let {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030',
  },
  welcome: {
    color: '#F5FCFF',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  actionButton: {
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#5B99FA',
    borderRadius: 4,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 18,
  },
  pageImage: {
    width: 256,
    height: 256,
  },
});

class FreshSetup extends React.Component {
  _onPressButton() {
    let page, title, props;

    if (pages[this.props.pageId].next) {
      this.props.navigator.push({
        component: FreshSetup,
        backButtonTitle: 'Back',
        title: pages[pages[this.props.pageId].next].title,
        passProps: {
          pageId: pages[this.props.pageId].next,
        },
        rightButtonTitle: 'Skip',
        onRightButtonPress: function () {
          this.props.navigator.push({
            component: RecordPage,
            backButtonTitle: 'Back',
            title: 'Meowth',
          });
        }.bind(this)
      });
    } else {
      this.props.navigator.push({
        component: RecordPage,
        backButtonTitle: 'Back',
        title: 'MIKE',
      });
    }
  }

  render() {
    const actionText = pages[this.props.pageId].next ? 'Next slide' : 'Get Started';

    return (
      <View style={styles.container}>
        <Image
          style={styles.pageImage} // our own image
          source={pages[this.props.pageId].source}
        />
        <Text style={styles.instructions}>
          {pages[this.props.pageId].subTitle}
        </Text>

        <TouchableHighlight
          underlayColor="#3969B4"
          style={styles.actionButton}
          onPress={this._onPressButton.bind(this)}
        >
          <Text style={styles.actionLabel}>
            {actionText}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = FreshSetup;
