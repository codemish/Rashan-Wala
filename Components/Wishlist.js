import React, { Component } from 'react'
import { Text, View,TextInput,Button } from 'react-native'
import * as firebase from 'firebase'
export default class Wishlist extends Component {
    state={
        Text:""
    }
    handleinput=()=>{
        firebase.default.firestore().collection('Items').doc('xyz').set({Title:this.state.Text})
    }
  
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <TextInput placeholder="TYpe" onChangeText={(text)=>{this.setState({Text:text})}}/>
                <Button title="Submit" onPress={()=>{this.handleinput()}}>
                </Button>
            </View>
        )
    }
}
