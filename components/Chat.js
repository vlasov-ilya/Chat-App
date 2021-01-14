import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDpx0NC1UBN3hhR7jcUW4LShJZcjqLXUA4",
        authDomain: "chatapp-cba7a.firebaseapp.com",
        projectId: "chatapp-cba7a",
        storageBucket: "chatapp-cba7a.appspot.com",
        messagingSenderId: "811912018112",
        appId: "1:811912018112:web:48c86c60ebaaa6e9cc9525",
        measurementId: "G-5EYQERLN33"
      })
    }

    this.state = {
      messages: [],
      user: {},
      uid: 0,
    };
  }

  componentDidMount() {
    // firebase call 
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        user = await firebase.auth().signInAnonymously();
      }
      // Update user
      this.setState({
        uid: user.uid,
        loggedInText: "Welcome to the Chat!"
      });

      // Retrive msg
      this.referenceMessages = firebase.firestore().collection('messages')
      // new msg 
      this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
    });

    this.setState({
      messages: [
        {
          id: 1,
          text: this.props.route.params.name + ' is here!',
          createdAt: new Date(),
          system: true,
        }
      ]
    })
  }
  //query for stored msgs 
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Map throug documents
    querySnapshot.forEach(doc => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages
    });
  };

  // Add new msg to database
  addMessage() {
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text,
      createdAt: this.state.messages[0].createdAt,
      user: this.state.messages[0].user,
      uid: this.state.uid,
    });
  }

  //store sent msgs
  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.addMessage();
      }
    );
  }

  componentWillUnmount() {
    this.authUnsubscribe();
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

  render() {
    // Define props passed from start
    const { name, color } = this.props.route.params;
    const { messages, uid } = this.state;

    // Fallback in case no name is entered on start screen
    if (!name || name === '') name = 'Unnoun'

    // Populates user's name, if entered
    this.props.navigation.setOptions({ title: name });

    return (

      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: uid,
            name: name,
          }}
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