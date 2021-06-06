import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import {store} from './Redux/Store'
import Carrd from '../Card'
import * as firebase from 'firebase'
import { Button } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
class Cart extends Component {
     handleOrder=async()=>{
           await firebase.default.firestore().collection('ActiveOrders').add({
                Order:this.props.itemArr
            }).then(()=>{
                 this.props.navigation.navigate("Orders")
            }).catch(()=>{
                alert("Err")
            })
        }
    render() {
        return (
            <View style={{flex:1}}>    
            { 
             this.props.itemArr.length
             ?
             <View>
             { 
             this.props.itemArr.map((item)=>{
             return (
             <Text>
             <Carrd id={item.id} category={item.category} title={item.title} quantity={item.quantity} price={item.price} navigation={this.props.navigation}/>
             </Text>
             )
             })
             }
               <Button style={{backgroundColor:'#0077B6'}} onPress={()=>{
                   this.handleOrder();
               }} >
               <Text style={{color:'white'}}>
                   ₹ {this.props.checkoutAmount} 
               </Text>
            <AntDesign name="shoppingcart" size={24} color="white"/>
            </Button>
            </View>
            :
            <Text style={{flex:1,fontSize:22,alignSelf:'center'}} >
                Nothing to Show
            </Text>
            
            }
             </View>
        )
    }
}
const mapStateToProps=(state)=>{
return {
   itemArr:state.Items,
   checkoutAmount:state.checkoutAmount
}
}
const styles=StyleSheet.create({
    checkoutText:{
        flex:1,
        fontSize:20,
        color:'black',
        justifyContent:'flex-end'
    },
    button:{
     borderColor:'black',
     borderWidth:2,
     borderRadius:10,
    //  alignItems:'flex-end',
     backgroundColor:"#0077B6",
    }
})
export default connect(mapStateToProps)(Cart)