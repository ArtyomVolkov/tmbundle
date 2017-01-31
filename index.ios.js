/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Actions, Router, Scene} from 'react-native-router-flux';

// components
import Search from './src/components/pages/Search';
import Details from './src/components/pages/Details';
import SubMenu from './src/components/layouts/SubMenu';

export default class AwesomeProject extends Component {
  render() {
    return (
      <Router>
        <Scene key="drawer" component={SubMenu} open={false}>
          <Scene key="root">
            <Scene key={'search'}
              component={Search}
              title={'Search Event'}
              initial={true}
              leftButtonIconStyle={{tintColor:'black'}}/>
          </Scene>
        </Scene>
        <Scene key={'details'} component={Details} title={'Details'} leftButtonIconStyle={{tintColor:'black'}}/>
      </Router>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
