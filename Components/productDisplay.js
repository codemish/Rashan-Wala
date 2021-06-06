import React, { Component } from 'react'
import { Text, View ,Modal, Button,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import * as firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SliderBox } from "react-native-image-slider-box";
import {connect} from 'react-redux'
class productDisplay extends Component {
    state={
       title:'',
       price:-1,
       imageName:[],
       description:"",
       imageUrl:[],
       isModal:false,
       currentUrl:'',
       selectedItem:0,
       Showincredecre:false
    }
  async componentDidMount()
    {
          this.props.itemList.find((item)=>{
            if(item.id===this.props.route.params.Id)
            {
              this.setState({
                Showincredecre:true,
                selectedItem:item.quantity
              })
            }
          })
            await firebase.default.firestore().collection('Items').doc(this.props.route.params.category).collection(this.props.route.params.category).doc(this.props.route.params.Id).get().then((docd)=>{
            this.props.itemList.forEach((item)=>{
            if(item.id==this.props.route.params.Id)
            {
            this.temp=item.quantity
            this.tempbool=true
            }
            this.index++
            })
            this.setState({
                title:docd.data().title,
                price:docd.data().price,
                imageName:docd.data().image,
                description:docd.data().description,
                selectedItems:this.tempbool?this.temp:0
                // currentlyAvailable:querysnap.data().currentlyAvailable,
            });
            this.state.imageName.map((item)=>{
                 firebase.default.storage().ref('Items/'+this.props.route.params.category+'/'+this.props.route.params.Id+'/'+item).getDownloadURL()
                 .then((url)=>{
                     this.setState({
                         imageUrl:[...this.state.imageUrl,url]
                     })

                 })
                 .catch((err)=>{
                     alert(err)
                 })
            })
            
        }).catch((err)=>{alert(err)})
    }
    render() {
        return (
              <ScrollView style={styles.container}>
              <Modal visible={this.state.isModal} onRequestClose={()=>{this.setState({isModal:false})}}>
              <ImageViewer imageUrls={[{url:this.state.currentUrl}]} onCancel={()=>{this.setState({isModal:false})}} enableSwipeDown={true} backgroundColor="white"/>
              </Modal>
              {/* <Button title="Change" onPress={()=>{this.handleSnap()}}/> */}
             <SliderBox 
             onCurrentImagePressed={(index)=>{
             this.setState({isModal:true,currentUrl:this.state.imageUrl[index]})
             }}
             images={this.state.imageUrl} 
             autoplay={true}
             dotColor="white"
             sliderBoxHeight={200}
             ImageComponentStyle={{borderRadius: 0, width: '100%', marginTop: 0}}
             circleLoop={true}
            />
             <View style={{alignItems:'center', marginHorizontal:30}}>
            <Text style={styles.name}>{this.state.title}</Text>
            <Text style={styles.price}>₹ {this.state.price}</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
              Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
              natoque penatibus et magnis dis parturient montes, 
              nascetur ridiculus mus. Donec quam felis, ultricies nec
            </Text>
            {
             this.state.Showincredecre
             ?
            <View style={{flexDirection:'row',marginTop:'30%'}}>
            <AntDesign name="pluscircleo" size={24} color="black" style={styles.Lefticon} onPress={()=>{
              console.log(this.state.selectedItem)
               this.props.add(this.props.route.params.Id,this.props.route.params.category,this.state.title,this.state.price,this.state.imageUrl)
                this.setState({
                  selectedItem:this.state.selectedItem+1
                })
            }}/>
             <Text style={styles.Textinbw}> {this.state.selectedItem} </Text>
             <AntDesign name="minuscircleo" size={24} style={styles.RightIcon}  color="black" onPress={()=>{
               this.props.minus(this.props.route.params.Id)
               if(this.state.selectedItem==1)
               {
                 this.setState({
                   Showincredecre:false,
                 })
               }
               this.setState({
                  selectedItem:this.state.selectedItem-1
                })
            }}/>
            </View>
            :
            <TouchableOpacity style={styles.shareButton} onPress={()=>{
              console.log(this.state.selectedItem)
              this.setState({
                selectedItem:this.state.selectedItem+1,
                Showincredecre:true
              })
                this.props.add(this.props.route.params.Id,this.props.route.params.category,this.state.title,this.state.price,this.state.imageUrl)
                }
                }>
              <Text style={styles.shareButtonText}>Add To Cart</Text>  
            </TouchableOpacity>
            }
          </View>
            </ScrollView>
        )
    }
}
const mapStateToProps=(state)=>{
 return{
   currentlyAdded:state.inCart,
   itemList:state.Items
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
export default connect(mapStateToProps,mapDispatchToProps)(productDisplay)
const styles=StyleSheet.create({
    Textmrp:{
        color:"#90E0EF",
        marginTop:55
    },
    container:{
    flex:1,
    marginTop:2,
  },
  productImg:{
    width:200,
    height:200,
  },
  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"black",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",

  },
  star:{
    width:40,
    height:40,
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    // width:150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#90E0EF",
    marginTop:"30%"
  },
  shareButtonText:{
    color: "black",
    fontSize:20,
    alignContent:"center",
    padding:"8%"
  },
  addToCarContainer:{
    marginHorizontal:30
  },
  Incredecre:{
      flexDirection:"row",
      marginTop:"35%",
      borderWidth:2,
      paddingLeft:8,
      paddingRight:8,
      borderRadius:8,
      borderColor:"#0077B6",
      paddingTop:1,
      paddingBottom:1
  },
  Textinbw:{
     borderTopWidth:2,
     borderBottomWidth:2,
     padding:13,
     alignItems:'center'
  },
  RightIcon:{
   borderWidth:2,
   borderBottomRightRadius:10,
   borderTopRightRadius:10,
   padding:7,
   paddingTop:13,
   backgroundColor:'#0077B6'
  },
  Lefticon:{
   borderWidth:2,
   borderBottomLeftRadius:10,
   borderTopLeftRadius:10,
   padding:7,
   paddingTop:13,
       alignItems:'center',
       backgroundColor:'#0077B6'
  }
})