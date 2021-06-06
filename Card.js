import React, { Component } from 'react'
import { Text, View,StyleSheet,Image ,ScrollView,TouchableOpacity,Dimensions} from 'react-native'
import * as firebase from 'firebase'
import { SliderBox } from "react-native-image-slider-box";
import {Card,Title} from 'react-native-paper'
import {connect} from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import productDisplay from './Components/productDisplay';
import Numberdisplay from './Components/Numberdisplay'
import { Button } from 'react-native-paper';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 class Carrd extends Component {
    state={
        Arr:[],
        title:"",
        cost:"",
        ImageName:"",
        Imageurl:"",
        itemSelected:0
    }
   async componentDidMount(){
      
         await firebase.default.firestore().collection('Items').doc(this.props.category).collection(this.props.category).doc(this.props.id).get().then((doc)=>{this.setState({ImageName:doc.data().image[0]})}).catch((err)=>{alert(err)})
         await  firebase.default.storage().ref('Items/'+this.props.category+'/'+this.props.id+'/'+this.state.ImageName).getDownloadURL().then((url)=>{this.setState({Imageurl:url})}).catch((err)=>{console.log(err)})
        // })
    }
    
    render() 
    {
        return(
          <View style={{flex:1,alignSelf:'stretch'}}>
             <TouchableOpacity onPress={()=>{this.props.navigation.navigate("First",{screen:"productDisplay",params:{Id:this.props.id,category:this.props.category}})}}>
            <Card style={styles.c}>
             <Card.Title  left={()=><Image style={{marginRight:10,height:50,width:50,borderRadius:60}} source={{uri:this.state.Imageurl}} />}
                        right={() =>  <Text style={{marginLeft:'15%',fontSize:20}} >Price:-{this.props.price}</Text> }
             />
               <Card.Content>
               <View style={{flexDirection:'column'}}>
               <View >
                <Title>{this.props.title}</Title>
                </View>
                <View>
               </View>
                </View>
               </Card.Content>
             </Card>
             </TouchableOpacity> 
             </View>
 
        )
    }
}
const styles= StyleSheet.create({
    c:{
        width:width,
        borderRadius:5,
        marginTop:7,
        marginLeft:7,
        marginRight:7,
        borderColor:"black",
        backgroundColor:'#90E0EF',
    }
})
const mapStateToProps=(state)=>{
    return{
           itemList:state.Items
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        minus:(id)=>{
            dispatch({
              type:"MINUS_FROM_CART",
          payload:{
                   ID:id,
            }
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Carrd)
