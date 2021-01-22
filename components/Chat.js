import React from 'react';
import { View, Platform, KeyboardAvoidingView, YellowBox } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomFunctions from './CustomFunctions';
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

    // Retrive msg
    this.referenceMessages = firebase.firestore().collection('messages')

    this.state = {
      messages: [],
      user: {},
      uid: 0,
      isConnected: false,
      image: null,
      location: null
    };
  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async componentDidMount() {
    // Check onlime status
    NetInfo.fetch().then(state => {
      var isConnected = state.isConnected;
      this.setState({
        isConnected
      });
      this.getMessages();
      if (isConnected) {
        // firebase call 
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            user = await firebase.auth().signInAnonymously();
          }
          // Update user
          this.setState({
            uid: user.uid,
          });
        });
        // update collection
        this.unsubscribe = this.referenceMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
      }
    });

    this.setState({
      messages: [
        {
          _id: 1,
          text: `${this.props.route.params.name} + ' is here!'`,
          createdAt: new Date(),
          system: true,
        }
      ]
    });
    YellowBox.ignoreWarning(['Setting a timer'])
  }
  //query for stored msgs 
  onCollectionUpdate = querySnapshot => {
    const messages = [];
    // Map throug documents
    querySnapshot.forEach(doc => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image,
        location: data.location
      });
    });
    this.setState({
      messages
    });
  };

  // Disconnect when close app

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  //store sent msgs
  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.saveMessages();
      }
    );
    this.addMessage(messages)
  }

  // Add new msg to database
  addMessage(message) {
    const { _id, createdAt, text, user, image, location } = message[0];
    this.referenceMessages.add({
      _id: _id,
      createdAt: createdAt,
      text: text || null,
      user: {
        _id: user._id,
        name: user.name
      },
      image: image || null,
      location: location || null
    })
  }
  // save msg for ofline access 

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Allow to delete msgs

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }


  // customize text bubbles 
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#99F99F'
          },
          left: {
            backgroundColor: '#99FFFf'
          }
        }}
      />
    )
  }

  renderInputToolbar = props => {
    if (this.state.isConnected == false) {

    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      const longitude = parseInt(currentMessage.location.longitude);
      const latitude = parseInt(currentMessage.location.latitude);
      return (
        <MapView
          style={{
            width: 250,
            height: 150,
            borderRadiuse: 15,
            margin: 5
          }}
          region={{
            longitude,
            latitude,
            longitudeDelta: 0.0421,
            latitudeDelta: 0.0922,
          }}
        />
      );
    }
    return null;
  }


  renderActions = (props) => {
    return <CustomFunctions {...props} />;
  };

  render() {

    const { name, color } = this.props.route.params;
    const { messages, uid } = this.state;


    // props user's Name
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar}
          messages={messages}
          renderCustomView={this.renderCustomView}
          renderActions={this.renderActions}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: uid,
            name: name,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}