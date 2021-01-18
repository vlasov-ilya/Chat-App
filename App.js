import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Start from './components/Start';
import Chat from './components/Chat';


const firebase = require('firebase');
require('firebase/firestore');

// Create stack navigator
const Stack = createStackNavigator();

export default class ChatApp extends Component {
  render() {
    return (
      // Start and Chat navigation 
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}