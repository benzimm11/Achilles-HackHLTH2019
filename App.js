import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {YellowBox} from 'react-native';
import Home from './screens/Home.js';
import Search from './screens/Search.js';

YellowBox.ignoreWarnings(['Setting a timer', 'Warning:', 'Remote debugger']);

const MainNavigator = createStackNavigator(
  {
    Home: Home,
    Search: Search,
  },
  {
    initialRouteName: 'Search',
  },
);

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  state = {};

  render() {
    return <AppContainer />;
  }
}

export default App;
