import { StyleSheet, Text, View,Image,ScrollView,Alert, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native';
import {Dimensions} from 'react-native';
import Imgs from "../Screens/imgs";
import env from "../env";
import Likes from "./Likes";
import Heart from "./heart";
import Spinner from 'react-native-loading-spinner-overlay';
import { AntDesign } from '@expo/vector-icons';
import PrivateChat from "../Screens/privatechat";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Messages = ({route,navigation}) => {
  const [chats,setchats] = useState(null)
  const {userid,Token} = route.params;

  GetChats= async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        userid:`${userid}`
      })}
  await fetch(`${env.SERVER.URI}/showchats`,requestOptions)
  .then((response) => response.json())
  .then((data) =>{
    if (data.msg) {
      console.log(data)
    }else{
      setchats(data)
    }
  } );
  }

  useEffect( ()=>{
    GetChats();
  },[])

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.header}>
                <Pressable onPress={()=>{navigation.goBack()}} style={{marginRight:20}}><Ionicons name="arrow-back" size={30} color="black" /></Pressable>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Chats</Text>
            </View>

            {(chats==null)&& <View style={styles.noposts}>
            <Ionicons name="paper-plane" size={50} color="black" />
            <Text style={{fontSize:20,fontWeight:'bold'}}>Chats</Text>
            <Text style={{color:'rgba(60, 60, 60, 1)'}}>Here you'll be shown you private chats</Text>
            <Text style={{color:'rgba(60, 60, 60, 1)'}}>You dont have any chats yet</Text>
            <Text onPress={()=>{navigation.navigate('Tabs', {
              screen: 'Search',
              params: { 
                token:Token,
                userid:userid,},
            });}} style={{color:'rgba(0, 149, 246, 1)'}}>Search for users to start chatting</Text>
            </View>}

            {chats&&chats.map((chat)=>{
              return(
                <Pressable key={chat._id} onPress={()=>{navigation.navigate('Tabs', {
                  screen: 'Chat',
                  params: { 
                    token:Token,
                    userid:userid,
                    userid1:chat.usuario1,
                    userid2:chat.usuario2},
                });}}>
                  <PrivateChat  userid={userid} id1={chat.usuario1} id2={chat.usuario2} Token={Token}></PrivateChat>
                </Pressable>
                
              )
            })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Messages

const styles = StyleSheet.create({
  Chat:{
    width:windowWidth,
    backgroundColor:'white',
    flexWrap:'wrap',
    flexDirection:'row',
    paddingTop:5,
    paddingBottom:5,
    alignContent:'center',
    alignItems:'center',
    borderBottomColor:'rgba(219, 219, 219, 1)',
    borderBottomWidth:2
},
imgcontainerComment:{
    backgroundColor:'white',
    width:45,
    marginLeft:10
},
avatarimgimgcontainerComment:{
    height:45,
    width:45,
    borderRadius:30
},
heartcontainer:{
    backgroundColor:'white',
    marginTop:20,
    marginBottom:10
},
Chatheader:{
  width:windowWidth,
  height:20,
  backgroundColor:'white',
  flexWrap:'wrap',
  flexDirection:'row',
  alignContent:'center',
  alignItems:'center',
},
Chatcontent:{
  backgroundColor:'white',
  flexWrap:'wrap',
  flexDirection:'row',
  width:'65%',
  marginLeft:10,
  marginBottom:10
},
Chatdesc:{
  backgroundColor:'white',
  width:'100%'
},
header:{
  backgroundColor:'white',
  flexWrap:'wrap',
  flexDirection:'row',
  height:50,
  alignItems:'center',
  alignContent:'center',
  paddingLeft:20,
  width:windowWidth,
  borderBottomColor:'rgba(219, 219, 219, 1)',
  borderBottomWidth:2
},
noposts:{
  width:windowWidth,
  height:windowHeight/1.2,
  justifyContent:'center',
  alignItems:'center',
  alignContent:'center',
  backgroundColor:'white',
}

}
)