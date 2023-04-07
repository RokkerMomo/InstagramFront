import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Img from "./Img";
import env from "../env";

const Login = ({route,navigation}) => {
  const [search,onchangeSearch] = useState('')
  const [fotoperfil,setfotoperfil] = useState(null)
  const [fullname,setfullname] = useState('')
  const [username,setusername] = useState('')
  const [bio,setbio] = useState('')
  const [postsnumber,setpostnumber] = useState(0);
  const [followers,setfollowers] = useState(0);
  const [following,setfollowing] = useState(0);
  const {userid,Token} = route.params;
  const [cargando,setcargando] =useState(false)
  const [posts,setposts] = useState(null)

  searching = async () =>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        descripcion:`${search}`
      })}
  await fetch(`${env.SERVER.URI}/searchpost`,requestOptions)
  .then((response) => response.json())
  .then((result) =>{
    setposts(result['Posts'])
    console.log(result)
  } );
  }

  getPosts= async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        owner:`${userid}`
      })}
      await fetch(`${env.SERVER.URI}/showAllPosts`,requestOptions)
      .then((response) => response.json()).
      then((result) =>{
          // console.log(result)
          setposts(result)
          setcargando(false)
          console.log(result)
        }
      ) 
  }

  useEffect(()=>{
    getPosts();
  },[])


  useEffect (()=>{
    searching();
  },[search])


  return (
    <SafeAreaView>
      <ScrollView style={{height:'100%',backgroundColor:'white'}}>

<View style={styles.body}>

  <View style={styles.container}>

  <View style={styles.barsearch}>

  <Ionicons name="search" size={20} color="grey" />
  <TextInput
style={styles.input}
onChangeText={onchangeSearch}
value={search}
placeholder="Search"
/>
  </View>
  </View>
  
  

  <View style={styles.posts}>
        {posts&&posts.map((post)=>{
  // const fecha = Tweet.fecha.slice(0, 10);

  return(
      <Img key={post._id} id={post._id} Token={Token}></Img>
    )
})}

        

        </View>




</View>


    </ScrollView>
    </SafeAreaView>
    
  )
}

export default Login

const styles = StyleSheet.create({
  body:{
    alignItems:"center",
    backgroundColor:'white',
    width:'100%',
    height:'100%'
  },
    posts:{
      width:'100%',
      flexWrap:'wrap',
      flexDirection:'row',
    },
    post:{
      width:'33%',
      height:100,
      backgroundColor:'rgba(200, 200, 200, 1)',
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      flexWrap:'wrap',
      flexDirection:'row',
    },
    postimg:{
      width:'98%',
      height:'98%',
    },
    barsearch:{
      justifyContent:'center',
      alignItems:'center',
      flexWrap:'wrap',
      flexDirection:'row',
      borderColor:'rgba(200, 200, 200, 1)',
      borderWidth:1,
      borderRadius:5,
      width:'80%'
    },
    input:{
      width:'80 %'
    },
    container:{
      width:'100%',
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      margin:5
    },

})