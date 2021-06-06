import React, { Component,useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import {Text,View,TouchableOpacity,TextInput} from 'react-native'
import * as firebase from 'firebase'
import { connect,Provider } from 'react-redux';


import * as Notifications from 'expo-notifications';

// import { normalize } from 'react-native-elements';
const OtpEnter = (props) => {
  let [code,setCode]=useState('')
  let [expoPushToken, setExpoPushToken] = useState('');
  let [notification, setNotification] = useState(false);
  let notificationListener = useRef();
  let responseListener = useRef();
  useEffect(() => {
    console.log(expoPushToken)
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
    const verid=props.route.params.vid
    const confirmCode = async () => {
        const credential = await firebase.default.auth.PhoneAuthProvider.credential(
            verid,
            code
        );
      await firebase.default
          .auth()
          .signInWithCredential(credential)
          .then(async() => {
           await firebase.default.firestore().collection('Users').doc(props.route.params.phoneNumber).get().then((docsnap)=>{
              if(!docsnap.exists){
                firebase.default.firestore().collection('Users').doc(props.route.params.phoneNumber).set({
                  PhoneNo:props.route.params.phoneNumber,
                  Notiftoken:expoPushToken
                })
              }
              setExpoPushToken('')
            }).catch((e)=>{
              console.log(props.route.params.phoneNumber)
              alert(e)
            })
            props.Load()
          });
      }
 async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      let { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
    return (<View>
        <View style={{alignContent:'center',alignItems:'center',marginBottom:50}}>
        <Text style={{marginTop:80,fontSize:25}}>What's Your Verification Code?</Text>
        
        </View>
        <TextInput
        onChangeText={setCode}
        style={{borderBottomColor:'#5e157a',borderBottomWidth:5,marginHorizontal:10,fontSize:35}}
      placeholder="Verification Code"
      keyboardType="phone-pad"
      autoCompleteType="tel"
    />
    <TouchableOpacity onPress={confirmCode} style={{backgroundColor:'#5e157a', marginTop:50,borderRadius:15,height:50,marginHorizontal:10}}>
      <Text style={{textAlign:'center',marginVertical:12,color:'white',fontSize:20}}>Verify Code</Text>
    </TouchableOpacity>
    </View>  );
}
 const mapDispatchToProps=(dispatch)=>{
    return {
     Load:()=>{
         dispatch({type:"Load"})
     }
    }
}
export default connect(null,mapDispatchToProps)(OtpEnter);