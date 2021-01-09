import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      text: '',
    }
  }
// Creating msgs format

  componentDidMount() {
    // welcome msg and system msg
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello " + this.props.route.params.name + " !",
          createAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: this.props.route.params.name + " is here!",
          createAt: new Date(),
          system: true,
        },
      ],
    });
  }
// customize text bubbles 
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000"
          },
          left: {
            backgroundColor: "#fff"
          }
        }} />
    )
  }
  //allow msgs to be aapend  
  onSend(messages = []) {
    this.setState((previousState) =>
    ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    // Define props passed from start
    const { name, color } = this.props.route.params;
    const { messages } = this.state;

    // Fallback in case no name is entered on start screen
    if (!name || name === '') name = 'Unnoun'

    // Populates user's name, if entered
    this.props.navigation.setOptions({ title: name });

    return (

      <View style={{ flex: 1, backgroundColor: color}}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{ _id: 1 }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 4,
    borderColor: '#123432',
    padding: 10,
  }
})