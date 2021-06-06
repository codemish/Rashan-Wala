import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Text, View,StyleSheet ,Linking } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import Card from '../Card'
import * as firebase from 'firebase'
import { Feather } from '@expo/vector-icons';
class bookOrder extends Component {
    state={
        text:"",
    }
   async componentDidMount()
    {
        var user= await firebase.default.auth().currentUser;
        var array=[];
         await firebase.default.firestore().collection('Users').doc(user.phoneNumber).get().then((doc)=>{
         array=doc.data().PreviousOrders;
        }).catch((err)=>{
            alert(err);
        })
        // console.log(array)
        this.props.ItemArr.map((item)=>{
            array.push(item)
        })
        console.log(array)
         await firebase.default.firestore().collection('Users').doc(user.phoneNumber).set({
             PreviousOrders:array
         }).then(()=>{
             alert("Done")
         }).catch((err)=>{
             alert(err)
         })
    }
    phoneNumber=9893113839
   makeCall=()=>{
       Linking.openURL(`tel:${this.phoneNumber}`)
   }
    render() {
        return (
           
            <View style={styles.container}>
            <View style={{flex:0.8,flexDirection:'column'}}>
            <ScrollView>
             { 
             this.props.ItemArr.map((item)=>{
             return (
             <Text>
              <Card id={item.id} category={item.category} title={item.title} quantity={item.quantity} price={item.price} navigation={this.props.navigation}/>
             </Text>
             )
             })}
             </ScrollView>
            <Text style={{
                fontSize:20,
                backgroundColor:'#0077B6',
                padding:'1%',
                justifyContent:'center',
                textAlign:'center'
            }}>
             Scroll Down for all the items
            </Text>
            </View>
            <View style={{flexDirection:'row',marginTop:'5%',flex:0.2}} >
            <Feather name="phone-call" size={60} color="black" onPress={()=>{
                makeCall()
            }} />
            <Text style={{
                fontSize:25, 
                marginLeft:'20%'
            }}
            onPress={()=>{
                 this.makeCall()
            }}
            >
            Call The Owner
            </Text>
            </View>
            </View>
        )
    }
}
const mapStateToProps=(state)=>{
return {
    ItemArr:state.Items
}
}
const mapDispatchToProps=(dispatch)=>{
    return{
     add:(id,category,title,price,imageurl)=>{
     dispatch({
     type:"ADD_TO_CART",
     payload:{
       ID:id,
       category:category,
       title:title,
       price: price,
       imageurl:imageurl
     }
      })},
    minus:(id,quantity)=>{
     dispatch({
         type:"MINUS_FROM_CART",
       payload:{
       ID:id,
       Quantity:quantity
     }
     })
    }
}
}
const styles= StyleSheet.create({
    container:{
    flex:1
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(bookOrder)