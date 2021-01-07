import React from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    // Set default state for adding text field functionality
    this.state = {
      text: '',
    }
  }

  render() {
    // Define props passed from start
    const { name, color } = this.props.route.params;

    // Fallback in case no name is entered on start screen
    if (!name || name === '') name = 'Unnoun'

    // Populates user's name, if entered
    this.props.navigation.setOptions({ title: name });

    return (
      // Sets colorChoice as chat screen background color
      <View>
        <Text>Welcome to the Chat!</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
        <TextInput
          style={styles.input}
          placeholder="Give me some time to make it works"
        />
        <Button 
        title = "Go back to Start"
        onPress = {() => this.props.navigation.navigate("Start")}/>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 4,
    borderColor: '#123432',
    padding: 10,
  }
})