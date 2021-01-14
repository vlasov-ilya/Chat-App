import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const firebase = require('firebase');
require('firebase/firestore');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state for start screen functionality
    this.state = {
      name: '',
      colorChoice: '',
      colors: [
        '#0048BA',
        '#C46210',
        '#3B7A57',
        '#7FFFD4'
      ],
    }
  }

  render() {
    const { navigation } = this.props;
    const { name, colors, colorChoice } = this.state;
    return (
      // Set the background as the image provided in assets
      <ImageBackground source={require('../assets/sunset.jpg')} style={styles.background} imageStyle={{ resizeMode: 'cover' }}>
        <Text style={styles.title}>Hello Chat!</Text>
        <View style={styles.startContainer}>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.input}
              // Any change in the name field is stored as the state, allows adding
              // name to chat screen
              onChangeText={(name) => this.setState({ name })}
              value={name}
              // React-native feature to include accessibility easily
              accessible={true}
              accessibilityLable="Your name"
              accessibilityHint='Enter your name, please'
              placeholder='Name'
            />
          </View>
          <Text style={styles.choose}>
            Choose Background Color:
          </Text>
          {/* Create buttons for user to choose background color */}
          <View style={styles.colors}>
            {colors.map(color => (
              <View style={[styles.colorBorder,
              colorChoice === color ? { borderColor: '#757083' } : null]}
                key={color}>
                <TouchableOpacity
                  onPress={() => this.setState({ colorChoice: color })}
                  style={[styles.colorButton, { backgroundColor: color }]}
                />
              </View>
            ))}
          </View>
          {/* Give chat button navigation and pass name and color as props */}
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: name, color: colorChoice })}
            style={styles.button}>
            <Text style={styles.buttonText}>
              To the CHAT!
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 50,
    fontWeight: '600',
    color: '#539527',
    alignItems: 'center',
    flex: 1,
    marginTop: 50
  },
  startContainer: {
    width: '90%',
    height: '50%',
    backgroundColor: '#fff',
    marginBottom: 100,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#00EAFF',
    width: '90%',
    marginLeft: 20,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  searchBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#757083',
    paddingLeft: 13,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 30,
  },
  input: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    width: '90%',
    padding: 18,
    opacity: 0.5,
    borderColor: '#757083',
  },
  choose: {
    fontSize: 18,
    color: '#757083',
    marginLeft: 20,
    marginTop: 10,
  },
  colors: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '70%',
    marginLeft: 20,
    marginTop: 5,
  },
  colorButton: {
    height: 45,
    width: 45,
    borderRadius: 50
  },
  colorBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 100,
    padding: 3
  }
});