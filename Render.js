import React, { Component } from 'react'
import { Text, View,Image, Button ,TouchableOpacity} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as firebase from 'firebase'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator,DrawerItem,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import Search from './Components/Search'
import About from './Components/About'
import {FirebaseConfig} from './Firebaseconfig'
import HomeScreen from './Components/HomeScreen'
import Cart from "./Components/Cart"; 
import Wishlist from "./Components/Wishlist";
import Profile from "./Components/Profile";
import Help from "./Components/Help";
import Signup from "./Components/LoginScreen"
import OtpEnter from './Components/OtpEnter'
import Settings from './Components/Settings'
import bookOrder from './Components/bookOrder'
import productDisplay from './Components/productDisplay'
import { connect,Provider } from 'react-redux';
import {store} from './Components/Redux/Store'
const Stack1=createStackNavigator();
const Draw=createDrawerNavigator();
const Stack2=createStackNavigator();

const Mainstack=(props)=>(
    <Stack1.Navigator >
    <Stack1.Screen name="HomeScreen"  component={HomeScreen}/>
    <Stack1.Screen name="Cart" component={Cart}  options={{headerStyle:{backgroundColor:"#0077B6",height:65}}}/>
    <Stack1.Screen name="Wishlist" component={Wishlist} options={{headerStyle:{backgroundColor:"#0077B6",height:65}}}/>
     <Stack1.Screen name="Orders" component={bookOrder} options={{headerStyle:{backgroundColor:"#0077B6",height:65}}}/>
    <Stack1.Screen name="productDisplay" component={productDisplay} options={{headerStyle:{backgroundColor:"#0077B6",height:65}}} options={({navigation})=>({headerStyle:{backgroundColor:"#0077B6"},
     headerRight:()=>(  
     <TouchableOpacity onPress={()=>{navigation.navigate("First",{screen:"Cart"})}}>
     <AntDesign name="shoppingcart" size={24} style={{marginRight:15,color:"white"}} color="black"/>
     <Text>
       {props.Quantity}
     </Text>
    </TouchableOpacity>  )})} />
    <Stack1.Screen name="Search" component={Search} options={{headerStyle:{backgroundColor:"#0077B6",height:65}}}/>
    </Stack1.Navigator>
)
const Drawstack=()=>(
    <Draw.Navigator drawerContent={(props)=><CustomDrawerComponent {...props}/>}>
    <Draw.Screen name="HomeScreen" component={HomeScreen}/>
    <Stack1.Screen name="Wishlist" component={Wishlist} options={{headerStyle:{backgroundColor:"#0077B6",height:65}}}/>
    <Draw.Screen name="Profile" component={Profile}/>
    <Draw.Screen name="Help" component={Help}/>
    <Draw.Screen name="About" component={About}/>
    <Draw.Screen name="Settings" component={Settings}/>
    </Draw.Navigator>
)
const CustomDrawerComponent=(props)=>(
  <View style={{height:150,backgroundColor:'white',justifyContent:"center",marginTop:"5%",flex:1}}>  
  <DrawerContentScrollView {...props}>
  <View>
   <Image source={{uri:'https://bootdey.com/img/Content/avatar/avatar6.png'}} style={{ height:90,width:90,borderRadius:70,alignSelf:"center",flexDirection:"column"}}/>
  <Text style={{fontSize:20,alignSelf:"center"}}>
   Hello  
  </Text>
  </View>
  <DrawerItemList {...props}/>
   </DrawerContentScrollView>
  </View>
)
 class Render extends Component {
  render() {
  return (
          <NavigationContainer>
          <Stack2.Navigator>
           {
            this.props.isLoaded ?
           (
          <>
          <Stack2.Screen name="Signup" component={Signup} />
          <Stack2.Screen name="OtpEnter" component={OtpEnter}/>
          </>
           ) : (
          <>
          <Stack2.Screen name="XYZ" component={Drawstack} options={({navigation})=>({headerStyle:{backgroundColor:"#0077B6"},
           headerRight:()=>(   <TouchableOpacity onPress={()=>{navigation.navigate("First",{screen:"Cart"})}}>
          <Text style={{color:"white"}}>
          {this.props.Quantity}
          </Text>
          <AntDesign name="shoppingcart" size={24} style={{marginRight:15,color:"white"}} color="black"/>
          </TouchableOpacity>  
          ) ,
          headerLeft:()=>(<Entypo style={{marginLeft:10}} name="menu" size={35} color="white" onPress={()=>{navigation.dispatch(DrawerActions.toggleDrawer())}} />)})}/>
          <Stack2.Screen name="First" component={Mainstack} options={{headerShown:false}}/>
          </>
           )
           }
         
          </Stack2.Navigator>
          </NavigationContainer>
        )
    }
}
const mapStateToProps=(state)=>{
return {
  isLoaded:state.isLoaded,
  Quantity:state.inCart
}
}
export default connect(mapStateToProps)(Render)