import { StyleSheet, Text, View,Image,ScrollView,Alert, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import {Dimensions} from 'react-native';

import env from "../env";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const privatechat = ({userid,id1,id2,Token}) => {
    const [fotoperfil,setfotoperfil] = useState(null)
    const [fullname,setfullname] = useState('')
    const [username,setusername] = useState('')
    const [bio,setbio] = useState('')
    const [postsnumber,setpostnumber] = useState(0);
    const [followers,setfollowers] = useState(0);
    const [following,setfollowing] = useState(0);
    const [cargando,setcargando] =useState(false)
    const [check,SetCheck] = useState(null)
    const [posts,setposts] = useState(null)

    GetData = ()=>{
      
        
      }

      
      useEffect(()=>{
        if (userid==id1) {
          const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${Token}`
            },
            body: JSON.stringify({
              _id:`${id2}`
            })}
            fetch(`${env.SERVER.URI}/finduser`,requestOptions)
            .then(res =>{
              console.log(res.status);
              if (res.status=="400"){
              }else{}
              return res.json();
            }).then(
              (result) =>{
               setfullname(result.fullname)
               setbio(result.bio)
               setusername(result.usuario)
               setfotoperfil(result.foto)
              }
            )
        }
  
        if (userid==id2) {
          const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${Token}`
            },
            body: JSON.stringify({
              _id:`${id1}`
            })}
            fetch(`${env.SERVER.URI}/finduser`,requestOptions)
            .then(res =>{
              console.log(res.status);
              if (res.status=="400"){
              }else{}
              return res.json();
            }).then(
              (result) =>{
                console.log(result)
               setfullname(result.fullname)
               setbio(result.bio)
               setusername(result.usuario)
               setfotoperfil(result.foto)
              }
            )
        }
        
        console.log(fullname)
      },[])

  return (
    <View style={styles.Chat}>
          <View style={styles.imgcontainerComment}>
          <Image style={styles.avatarimgimgcontainerComment} source={{uri:`${fotoperfil&&fotoperfil}`}} />
          </View>
          <View style={styles.Chatcontent}>
              <View style={styles.Chatheader}>
                  <Text style={{fontSize:15,fontWeight:'bold'}}>{fullname&&fullname}</Text>
              </View>
              <View style={styles.Chatdesc}>
              <Text>Start Chatting with {fullname&&fullname}</Text>
              </View>
              </View>
      </View>
  )
}

export default privatechat

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
  
  }
  )