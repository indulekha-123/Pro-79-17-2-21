import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestes : []
    }
  this.requestRef= null
  }

  getRequestedBooksList =()=>{
    this.requestRef = db.collection("requested")
    .onSnapshot((snapshot)=>{
      var requestes = snapshot.docs.map(document => document.data());
      this.setState({
        requestes : requestes
      });
    })
  }


  componentDidMount(){
    this.getRequestedBooksList()
  }

  componentWillUnmount(){
   // this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
      console.log(item.item_name);

    return (
     <ListItem  
     key={i} 
     title={item.item_name}
     Subtitle={item.description}
     titleStyle={{color:'black',fontWeight:'bold'}}
     rightElement={<TouchableOpacity style={styles.button}>
         <Text style={{color:'#ffff'}}>Exchange</Text>
     </TouchableOpacity>
    }
    bottomDivider
    />
    )
}


  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Exchange"/>
       
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
              />
            
          
        </View>
     
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})