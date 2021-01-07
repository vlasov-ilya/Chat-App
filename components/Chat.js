import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    }
  }

  render() {
    const { name, color } = this.props.route.params

    if (!name || name === '') name = 'Unnoun'

    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgoundColor: this.props.color}}>
        <Text> Hello !</Text>
        <Button 
        title = "Go back to Start"
        onPress = {() => this.props.navigation.navigate("Start")}
        />
      </View>
    );
  }
}