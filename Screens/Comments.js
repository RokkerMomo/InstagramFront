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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Comments = ({route,navigation}) => {
  const [posts,setposts] = useState(null)
  const [contador,setcontador] = useState(0)
  const hasUnsavedChanges = Boolean(true);
  const [ownername,setownername] = useState('')
  const [user,setuser] = useState('')
  const [fotoperfil,setfotoperfil] = useState(null)
  const [descripcion,setdescipcion] = useState('')
  const [comentarios,setcomentarios] = useState(null)
  const [postownerid,setpostownerid] =useState(null)

  const {userid,Token,Postid} = route.params;

  let date = new Date()

  getcomments= async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        Postid:`${Postid}`
      })}
      await fetch(`${env.SERVER.URI}/getcomentarios`,requestOptions)
      .then((response) => response.json()).
      then((result) =>{
          setcomentarios(result)
          console.log(comentarios)
        }
      ) 
  }

  newComment =  async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        Postid:`${Postid}`,
    ownername:`${ownername}`,
      owneruser:`${user}`,
      owner:`${userid}`,
      descripcion:`${descripcion}`,
      fotoperfil:`${fotoperfil}`,
      fecha:`${date}`
      })}
      await fetch(`${env.SERVER.URI}/newComentario`,requestOptions)
      .then(res =>{
        console.log(res.status);
        if (res.status=="400"){
        }else{}
        return res.json();
      }).then(
        (result) =>{
          console.log(result)
          setcontador(contador+1)
          setdescipcion('')
        }
      )
  }

  GetData = async ()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        _id:`${userid}`
      })}
      await fetch(`${env.SERVER.URI}/finduser`,requestOptions)
      .then(res =>{
        console.log(res.status);
        if (res.status=="400"){
        }else{}
        return res.json();
      }).then(
        (result) =>{
          // console.log(result)
          setownername(result.fullname)
          // console.log(ownername)
          setfotoperfil(result.foto)
          setuser(result.usuario)
        }
      )
  }

    getPost= async()=>{
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${Token}`
          },
          body: JSON.stringify({
            Postid:`${Postid}`
          })}
          await fetch(`${env.SERVER.URI}/showSinglePost`,requestOptions)
          .then((response) => response.json()).
          then((result) =>{
              setposts(result)
            }
          ) 
      }

    useEffect(()=>{
        getPost();
        GetData();
        
    },[])

    useEffect(()=>{
      getcomments();
    },[contador])


  return (
    <SafeAreaView>
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.header}>
                <Pressable onPress={()=>{navigation.goBack()}} style={{marginRight:20}}><Ionicons name="arrow-back" size={30} color="black" /></Pressable>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Comments</Text>
            </View>

        <View style={styles.posts}>
<View style={styles.postHeader}>
  <Pressable onPress={()=>{navigation.navigate('Tabs', {
              screen: 'Profile',
              params: { 
                token:Token,
                userid:userid,
                profileid:posts.owner,},
            });}} style={styles.postavatar}>
    <Image style={styles.avatarimg} source={{uri:`${posts&&posts.fotoperfil}`}} />
    </Pressable>
    <Text onPress={()=>{navigation.navigate('Tabs', {
              screen: 'Profile',
              params: { 
                token:Token,
                userid:userid,
                profileid:posts.owner,},
            });}} style={styles.postheaderText}>{posts&&posts.owneruser}</Text>
  </View>
</View>

{posts&&<Imgs id={posts&&posts._id} Token={Token}></Imgs>}

<View style={styles.post}>  
  <View style={styles.postContenido}>
    <View style={styles.postButtons}>
      {posts&&<Heart id={posts&&posts._id} token={Token} userid={userid}></Heart>}
    </View>
    <Text style={{fontSize:12,marginLeft:10,width:'90%'}}><Text style={styles.postheaderText}>{posts&&posts.owneruser}</Text> {posts&&posts.descripcion}</Text>

  </View>

</View>      
{comentarios&&comentarios.map((comentario)=>{
  const fecha = comentario.fecha.slice(0, 10);
  return(
    <View style={styles.Comment}>
                <View style={styles.imgcontainerComment}>
                <Image style={styles.avatarimgimgcontainerComment} source={{uri:`${comentario.fotoperfil}`}} />
                </View>
                <View style={styles.postcontent}>
                    <View style={styles.postheader}>
                        <Text style={{fontSize:15,fontWeight:'bold'}}>{comentario.owneruser}</Text>
                        <Text style={{color:'rgba(60, 60, 60, 1)'}}> {fecha}</Text>
                    </View>
                    <View style={styles.postdesc}>
                    <Text>{comentario.descripcion}</Text>
                    </View>
                    </View>
                    <View style={styles.heartcontainer}>
                    <Heart id={comentario._id} token={Token} userid={userid} ></Heart>
                    </View>
            </View>

  )
})}

<View style={styles.bloque}></View>
            


        </ScrollView>
        
        <View style={styles.newComment}>
                <View style={styles.imgcontainerComment}>
                <Image style={styles.avatarimgimgcontainerComment} source={{uri:`${fotoperfil&&fotoperfil}`}} />
                </View>
                <View style={styles.postcontent}>
                    <View style={styles.postdesc}>
                      <TextInput onChangeText={setdescipcion} value={descripcion} style={{width:'100%'}} placeholder='Escribe un comentario'></TextInput>
                    </View>
                    </View>
            
                        <Pressable style={{marginLeft:11}} onPress={()=>{newComment();}}><AntDesign name="enter" size={24} color="black" /></Pressable>
                
            </View>

    </SafeAreaView>
  )
}

export default Comments

const styles = StyleSheet.create({
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
    imgcontainer:{
        backgroundColor:'white',
        width:60,
        marginLeft:10
    },
    avatarimg:{
        height:60,
        width:60,
        borderRadius:30
    },
    postcontent:{
        backgroundColor:'white',
        flexWrap:'wrap',
        flexDirection:'row',
        width:'65%',
        marginLeft:10,
        marginBottom:10
    },
    postheader:{
        backgroundColor:'white',
        flexWrap:'wrap',
        flexDirection:'row',
        width:'100%',
        alignContent:'center',
        alignItems:'center'
    },
    Comment:{
        width:windowWidth,
        backgroundColor:'white',
        flexWrap:'wrap',
        flexDirection:'row',
        paddingTop:5,
        alignContent:'center',
        alignItems:'center'
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
    body:{
        flex:1,
          backgroundColor: 'rgba(255, 255, 255, 1)',
      
        },
        Storys:{
          width:windowWidth,
          height:70,
          justifyContent:'center',
          backgroundColor:'white',
          borderBottomColor:'rgba(219, 219, 219, 1)',
          borderTopColor:'rgba(219, 219, 219, 1)',
          borderRightColor:"white",
          borderLeftColor:"white",
          borderWidth:1,
          marginTop:0,
        },
        MyStory:{
          width:45,
          height:56,
          marginLeft:11,
          flexWrap:'wrap',
          flexDirection:'row',
          justifyContent:'center'
        },
        avatar:{
          width:45,
          height:45,
          backgroundColor:'white',
          borderRadius:100,
        },
        avatarimg:{
          width:45,
          height:45,
          borderRadius:100,
        },
        TextMyStory:{
          fontSize:9
        },
        post:{
          width:windowWidth,
          backgroundColor:'white',
          flexWrap:'wrap',
          flexDirection:'row',
        },
        postHeader:{
          width:windowWidth,
          height:50,
          backgroundColor:'white',
          flexWrap:'wrap',
          flexDirection:'row',
          alignContent:'center',
          alignItems:'center',
        },
        postavatar:{
          width:45,
          height:45,
          backgroundColor:'white',
          borderRadius:100,
          marginLeft:10,
        },
        postheaderText:{
          fontSize:12,
          fontWeight:'bold',
          marginLeft:10
        },
        postContenido:{
          width:windowWidth,
          flexWrap:'wrap',
          flexDirection:'row',
          backgroundColor:'white',
          borderBottomColor:'rgba(219, 219, 219, 1)',
          borderBottomWidth:1,
          paddingBottom:5
        },
        postimgcontainer:{
          width:windowWidth,
          height:360,
        },
        postimg:{
          width:windowWidth,
          height:360,
    
        },
        postButtons:{
          width:windowWidth,
          height:50,
          backgroundColor:'white',
          flexWrap:'wrap',
          flexDirection:'row',
        },
        newComment:{
        width:windowWidth,
        height:85.5,
        backgroundColor:'white',
        flexWrap:'wrap',
        flexDirection:'row',
        position:'absolute',
        top:'90%',
        borderTopColor:'rgba(219, 219, 219, 1)',
        borderTopWidth:1,
        alignContent:'center',
        alignItems:'center',
        paddingBottom:20,
        },
        postdesc:{
          backgroundColor:'white',
          width:'100%'
        },
        bloque:{
          height:85.5
        }
})