import React, { Component } from 'react'
import { Text, View,StyleSheet ,Image,TouchableOpacity,Modal} from 'react-native'
import LocationPicker from './LocationPicker'
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign } from '@expo/vector-icons';
import {connect} from 'react-redux'
class HomeScreen extends Component {
  state={
            Array:[require('./Images/A.jpg') ,require('./Images/B.png'), require('./Images/C.jpg')],
            isVisible:true
        }
    render() {
        return (
            <View style={{flex:1, borderColor:"blue",
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor:"white"}}> 
                 <TouchableOpacity onPress={()=>{this.props.navigation.push("First",{screen:"Search"})}} style={{borderWidth:2,borderRadius:8,margin:5,marginBottom:0,width:"100%"}}>
               <View >
                <AntDesign name="search1" size={24} color="black" style={{marginRight:10}} onPress={()=>{this.props.navigation.navigate("First",{screen:"Search"})}}  />
               </View>
               </TouchableOpacity>
            <View style={styles.container}>
            <SliderBox 
             images={this.state.Array} 
             autoplay={true}
             dotColor="white"
             sliderBoxHeight={200}
              ImageComponentStyle={{borderRadius: 0, width: '100%', marginTop: 0}}
              circleLoop={true}
            />
            </View>
            <View style={{flex:2 ,flexDirection:'column'}}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',alignSelf:'center',margin:'0%'}}>
            <TouchableOpacity style={{margin:5}}>
            <Image source={require('./Images/IconsA.jpg')} style={styles.image}/>
            <Text>          Fruits</Text>
            <Text>and Vegetables</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{margin:5}}>
            <Image source={require('./Images/IconB.png')} style={styles.image}/>
            <Text style={{alignSelf:"center"}}>Grocery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{margin:5}}>
              <Image source={require('./Images/IconC.jpg')} style={styles.image}/>
            <Text style={{alignSelf:"center"}}>Household</Text>
        
            </TouchableOpacity>

            </View>

             <View style={{flexDirection:'row' ,marginTop:"12%"}}>
            <TouchableOpacity style={{margin:5}}>
            <Image source={require('./Images/IconD.png')} style={styles.image}/>
            <Text style={{alignSelf:"center"}}>Beverages</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{margin:5,borderRadius:5}}>
              <Image source={require('./Images/IconsE.png')} style={styles.image}/>
          
              <Text style={{alignSelf:"center"}}>Personal Care</Text>
          
            </TouchableOpacity>

            <TouchableOpacity style={{margin:5,borderRadius:5}}>
              <Image source={require('./Images/IconsF.png')} style={styles.image}/>
                <Text style={{alignSelf:"center"}} >Dairy and Bread</Text>          
            </TouchableOpacity>
            
            </View>
            </View>
         </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex:1.5,
    borderColor:"blue",
   
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
   height:100,width:100,marginLeft:"0%",borderRadius:7
  }
});
const mapStateToProps=(state)=>{
  return{
   Location: state.Location
  }
}
export default connect(mapStateToProps)(HomeScreen)