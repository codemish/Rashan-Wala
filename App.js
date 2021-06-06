import React from 'react'
import { Text, View,StyleSheet } from 'react-native'
import Render from './Render'
import * as firebase from  'firebase'
import {FirebaseConfig} from './Firebaseconfig'
import {Provider,connect} from 'react-redux'
import {store} from './Components/Redux/Store'
if(!firebase.default.apps.length)
{
  firebase.default.initializeApp(FirebaseConfig);
}
export default class App extends React.Component{
  render() {
    return (
     <Provider store={store}>
     <Render/>
     </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
