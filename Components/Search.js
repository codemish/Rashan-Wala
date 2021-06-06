
import { Text, View,ScrollView ,SafeAreaView,TextInput,StyleSheet,ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements'
import React ,{Component} from 'react'
import * as firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';
import Carrd from '../Card'
import {connect} from 'react-redux'
import { color } from 'react-native-reanimated';
 class Search extends React.Component {
     state={
    search:"",
    name:"",
    masterdatasource:[],
    filterdatasource:[],
    isLoaded:true,
    temp:"hello"
  }
  getText=()=>{
   firebase.default.firestore().collection('Items').onSnapshot((snap)=>{  
        let newdata=[];
        snap.forEach((doc)=>{
        newdata.push(doc.id)
        })
        this.setState({masterdatasource:newdata,filterdatasource:newdata})  
      })
  }
    searchFilterFunction=(text)=>{
      if (text)
       {
         var newData = this.state.masterdatasource.filter( (item)=> {

         var itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        var textData = text.toUpperCase();
        return textData==itemData;
            }
            );
            
      this.setState(
        {
        search:text,
        filterdatasource:newData,
        isLoaded:true
        }
         )
          }
           else 
       {
       this.setState({
       filterdatasource:this.state.masterdatasource,
       search:text,
       })
      }
       }
      componentDidMount() 
        {
        //  firebase.default.firestore().collection('Items').onSnapshot((snap)=>{console.log(snap)})
        //  firebase.default.firestore().collection('Items').doc('Beverages').collection('Beverages').onSnapshot((snap)=>{
        //    snap.forEach((doc)=>{console.log(doc.data())})
        //  })
         firebase.default.firestore().collection('Items').get().then((snap)=>{
           snap.forEach((docu)=>{
             firebase.default.firestore().collection('Items').doc(docu.id).collection(docu.id).get().then((querysnap)=>{querysnap.forEach((doct)=>{
          
           this.setState({
           masterdatasource:[...this.state.masterdatasource,{category:docu.id,price:doct.data().price,id:doct.id,title:doct.data().description,images:doct.data().image[0]}],
           filterdatasource:[...this.state.filterdatasource,{category:docu.id,price:doct.data().price,id:doct.id,title:doct.data().description,images:doct.data().image[0]}]
         })
              })})
           })
         })
         
        //  firebase.default.firestore().collection('Items').onSnapshot((snap)=>{snap.forEach((doc)=>{doc.collection(doc.data()).onSnapshot() })})
        }
       render() 
       {
        return (
          <SafeAreaView style={{flex:1}} >
            <View style={{flex:1}} >
            <View style={styles.searchSection}>
          <AntDesign name="search1" size={24} color="black" style={{marginRight:10}} onPress={()=>{this.props.navigation.navigate("First",{screen:"Search"})}}  />
          <TextInput
           style={styles.input}
           placeholder="Type Here"
           onChangeText={(text)=>{
            if(text.length==0){
            this.setState({
              filterdatasource:[],
              search:''
            })
            }
            else{
            //  this.setState({isLoaded:false})
             this.searchFilterFunction(text)
            }
           }
           }
        underlineColorAndroid="transparent"
         />
             </View>
             <View style={{flex:115}}>
             <ScrollView >
             {
                this.state.filterdatasource.map((doc)=>{
                  {/* console.log(doc.price) */}
                  return <Carrd id={doc.id} title={doc.title} image={doc.images} category={doc.category} price={doc.price} navigation={this.props.navigation}/>
                })              
             }
             </ScrollView>
            </View>
            </View>
            </SafeAreaView>
        )
    }
}
const styles=StyleSheet.create(
  {searchSection: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
},
searchIcon: {
   marginLeft:15,
    padding: 10,
},
input: {
    flex:1,
    height:55,
    backgroundColor: '#fff',
    color: '#424242',
}
,})

export default connect()(Search)