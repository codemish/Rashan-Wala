import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import {Switch} from 'react-native-paper'

import * as firebase from 'firebase'
import { TouchableHighlight } from 'react-native-gesture-handler'
class Settings extends React.Component{
    state={

    }
    logOut=()=>{
        firebase.default.auth().signOut().then(()=>{
                 this.props.Load()
                }).catch((err)=>{
                    console.log(err)
                })
    }
    render()
    {
        return (
        // myorder
        // Notifications
        // Customer Service
        // Logout
            <View style={{marginTop:5}}>
            <TouchableHighlight style={{paddingHorizontal:30,paddingBottom:30,paddingTop:30 ,backgroundColor:"#90E0EF",borderRadius:10,borderBottomWidth:1}} onPress={()=>{
            }}>
            <Text style={{fontSize:17}}>
            Myorders
            </Text>
            </TouchableHighlight>
            <View style={{marginTop:15,paddingHorizontal:30,paddingBottom:30,paddingTop:30,backgroundColor:"#90E0EF",borderBottomWidth:1,justifyContent:'center'}}>
            <Text  style={{fontSize:17}}>
            Notifications

            <Switch value={false} style={{paddingLeft:200}}/>
            </Text>
            
            </View>
               <View style={{marginTop:15,paddingHorizontal:30,paddingBottom:30,paddingTop:30,backgroundColor:"#90E0EF",borderBottomWidth:1}}>
            <Text style={{fontSize:17}}>
            Customer Service
            </Text>
            </View>
            <View style={{marginTop:15,paddingHorizontal:30,paddingBottom:30,paddingTop:30,backgroundColor:"#90E0EF",borderBottomWidth:1}}>
            <Text  style={{fontSize:17}}
             onPress=
            {
                this.logOut
            }>
            Logout
            </Text>
            </View>
            </View>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
       Load:()=>{
         dispatch({type:"Load"})
     }
    }
}

export default connect(null,mapDispatchToProps)(Settings)