import React, { Component, useRef, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Button} from 'react-native'
import * as firebase from 'firebase'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { connect,Provider } from 'react-redux';
const OtpAuth = (props) => {

   const [phoneNumber,setPhoneNumber]=useState('')
   const recaptchaVerifier = useRef(null);

   const sendVerification = async() =>{
        
       const phoneProvider=new firebase.default.auth.PhoneAuthProvider()
       await phoneProvider.verifyPhoneNumber(phoneNumber,recaptchaVerifier.current).then((result)=>{props.navigation.navigate('OtpEnter',{vid:result,phoneNumber:phoneNumber})}).catch((e)=>{alert(e)})  
   }; 
    return (<View>
      <View style={{alignItems:'center',alignContent:'center', marginBottom:50}}>

      <Text style={{marginTop:80,fontSize:25}}>What's Your Phone Number?</Text>
      <Text style={{fontSize:15}}>Include +91 with Phone Number</Text>
      </View>
       
        <TextInput
        style={{borderBottomColor:'#5e157a',borderBottomWidth:5,marginHorizontal:10,fontSize:35}}
      placeholder="Phone Number"
      onChangeText={setPhoneNumber}
      keyboardType="phone-pad"
      autoCompleteType="tel"
    />
    <TouchableOpacity onPress={sendVerification} style={{backgroundColor:'#5e157a', marginTop:50,borderRadius:15,height:50,marginHorizontal:10}}>
      <Text style={{textAlign:'center',marginVertical:12,color:'white',fontSize:20}}>Send Verification Code</Text>
    </TouchableOpacity>
    <Text style={{color:'grey', marginTop:25,marginHorizontal:8}}>By tapping "Send Verification Code" above, we will send a SMS to login.</Text>
    
    <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
        firebaseConfig={firebase.default.app().options}
    />
    </View>  );
}
 
export default connect()(OtpAuth);