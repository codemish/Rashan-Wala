import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Button} from "react-native-paper"
import {connect} from 'react-redux'
 class Signup extends Component {
    render() {
        return (
            <View>
              {console.log(this.props)}
                <Text> Hello Please Signup </Text>
                <Button onPress={()=>{this.props.Load()}}>
                  Enable  
                </Button>
                <Button  onPress={()=>{this.props.navigation.navigate("First",{screen:"Cart"})}} >
                Press
                </Button>
            </View>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
     Load:()=>{
         dispatch({type:"Load"})
     }
    }
}
export default connect(null,mapDispatchToProps)(Signup)
