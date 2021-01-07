import React from "react";
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';


export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: "",
      colorChoice: "",
      colors: [
        '#0048BA',
        '#C46210',
        '#3B7A57',
        '#7FFFD4',
        '#D70040'
      ]
    };
  }


  render() {
    const { navigation } = this.props;
    const { name, colorChoice, colors} = this.state;
    return (
    <ImageBackground source={require('../assets/sunset.jpg')} imageStyle = {{resizeMode: 'cover'}} >
      <Text> Hello Chat!</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
        <TextInput
          style={{ height: 40, borderColor: "grey", borderWidth: 1 }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder="Type your name here"
        />
        </View>
        <Text>Choose your chat color!</Text>
        <View>
          {colors.map( color => (
            <View style={[ colorChoice === color ? { borderColor: '#333'} : null ]}
            key = {color}>
              <TouchableOpacity 
              onPress={() => this.setState({ colorChoice: color})}
              style={{backgroundColor: color}} 
              />
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Chat', { name, color: colorChoice })}>
            <Text>
              Let's Chat
            </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  
})