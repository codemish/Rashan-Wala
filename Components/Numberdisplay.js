import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import {connect} from 'react-redux'
class Numberdisplay extends Component {
    temp=0;
    componentDidMount(){
 this.props.itemList.find((Item)=>{
         if(Item.id===this.props.id)
         {
             this.temp=Item.quantity
             return Item.quantity
         }
     })
    }
    componentDidUpdate()
   {
     this.props.itemList.find((Item)=>{
         if(Item.id===this.props.id)
         {
             this.temp=Item.quantity
             return Item.quantity
         }
     })
   }
    render() {
        return (
            <View style={styles.CircleShapeView}>
                <Text style={{color:"black",marginTop:0,fontSize:11,paddingTop:3,paddingRight:4}}> {this.temp} </Text>
            </View>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
      itemList:state.Items
    }
}
const styles=StyleSheet.create({
      CircleShapeView: {
    width: 20,
    height: 20,
    borderRadius: 150/2,
    backgroundColor: 'white',
    flexDirection:'row'
},
})
export default connect(mapStateToProps)(Numberdisplay)