import React, { Component } from 'react'
import { Button, Text, View,Image } from 'react-native'
import * as firebase from 'firebase'
export default class About extends Component {
    state={
        imageName:"",
        imageurl:""
    }
    componentDidMount(){
    firebase.default.firestore().collection("Items").doc("WBx122k6RfGiCvJAOGOB").get().then((doc)=>{this.setState({imageName:doc.data().image[0]})}).then(()=>{    console.log(this.state.imageName),alert("Success")}).catch((err)=>{alert(err)})
    }
    Handledownload=async()=>{
    firebase.default.storage().ref('Items/kkk/'+this.state.imageName).getDownloadURL().then((url)=>{this.setState({imageurl:url}),console.log(this.state.imageurl)}).catch((err)=>{alert(err)})
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Button title="Get" onPress={()=>{this.Handledownload()}}/>
                <Image source={{uri:this.state.imageurl}} style={{flex:0.8}} />
            </View>
        )
    }
}
