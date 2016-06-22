let React = require('react-native');
let FreshSetup = require('./src/FreshSetup');
let {
  AppRegistry,
  NavigatorIOS,
  StatusBarIOS,
  StyleSheet,
} = React;

class Meowth extends React.Component {
  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: FreshSetup,
          title: 'MIKE',
          backButtonTitle: 'Back',
          passProps: {
            pageId: 'welcome',
          }
        }}
        barTintColor="#000000"
        tintColor="#424242"
        titleTextColor="#ffffff"
      />
    );
  }
}
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('meowth', () => Meowth);
