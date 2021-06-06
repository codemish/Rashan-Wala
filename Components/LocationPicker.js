import React, { Component } from 'react';
import {View,Text,ActivityIndicator,Alert,Button,TouchableOpacity,StyleSheet, Image} from 'react-native'
import * as Location from 'expo-location'
import { useState } from 'react';
import {connect} from 'react-redux'
import * as Permissions from 'expo-permissions'
// import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps'
import axios from 'axios';
const LocationPicker = (props) => {
    // const imagePreviewUrl=`https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=YOUR_API_KEY`
    const [location,setLocation]=useState([])
    const [address,setAddress]=useState([])
    const [isFetching,setIsFetching]=useState(false)
    const [permLocation,setPermLocation]=useState()
    const getLOcation=async ()=>{
        setIsFetching(true)
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if(result.status !=='granted'){
            Alert.alert('Permission denied')
            return false
        }
        let loca=Location.getCurrentPositionAsync()
        setLocation({
            lat:(await loca).coords.latitude,
            lng:(await loca).coords.longitude,
        })
      await axios.get('https://us1.locationiq.com/v1/reverse.php?key=pk.190782048484bbb336cd8948d0643375&lat='+location.lat+'&lon='+location.lng+'&format=json')
       .then((response)=>{
          setAddress(response.data.display_name)
       }).catch()
       props.addre(address)
       setIsFetching(true)
    }
    return (
    <View>
        <Text>
        {address}           
        </Text>
        <Button title="Get Data" onPress={getLOcation}></Button>
    </View>  
    );
}
const mapDispatchToProps=(dispatch)=>{
    return {
        addre:(address)=>{
           dispatch({
               type:"Locate",
               payload:address
           })
        }
    }
}
export default connect(null,mapDispatchToProps)(LocationPicker);
