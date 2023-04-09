import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import {Dimensions} from 'react-native';
import env from "../env";
import Spinner from 'react-native-loading-spinner-overlay';
import Img from "./Img";
import { Octicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({route,navigation}) => {

  const [fotoperfil,setfotoperfil] = useState(null)
  const [fullname,setfullname] = useState('')
  const [username,setusername] = useState('')
  const [bio,setbio] = useState('')
  const [postsnumber,setpostnumber] = useState(0);
  const [followers,setfollowers] = useState(0);
  const [following,setfollowing] = useState(0);
  const {userid,profileid,Token} = route.params;
  const [cargando,setcargando] =useState(false)
  const [check,SetCheck] = useState(null)
  const [posts,setposts] = useState(null)

  async function GetFollowers() {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        idSeguido:`${profileid}`
      })}
    // Similar to componentDidMount and componentDidUpdate:
    fetch(`${env.SERVER.URI}/getfollowers`,requestOptions)
    .then(res =>{
      if (res.status=="400"){
      }else{}
      return res.json();
    }).then(
      (result) =>{
        setfollowers(result)
      }
    )
  }

  async function GetFollowing() {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        idSeguidor:`${profileid}`
      })}
    // Similar to componentDidMount and componentDidUpdate:
    fetch(`${env.SERVER.URI}/getFollowing`,requestOptions)
    .then(res =>{
      if (res.status=="400"){
      }else{}
      return res.json();
    }).then(
      (result) =>{
        setfollowing(result)
      }
    )
  }

  async function CheckFollow(){
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
    idSeguido:`${profileid}`,
    idSeguidor:`${userid}`
      })}
    await fetch(`${env.SERVER.URI}/checkfollow`,requestOptions)
   .then(res =>{
     if (res.status=="400"){
     }else{}
     return res.json();
   }).then(
     (result) =>{
       if (result.status=='true') {
        SetCheck(true)
       }else{
        SetCheck(false)
       }
     }
   )
  }

  async function Follow(){

    if (check==true) {
      SetCheck(false)
    }else{
      SetCheck(true)
    }


    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        idSeguido:`${profileid}`,
    idSeguidor:`${userid}`
      })}
    // Similar to componentDidMount and componentDidUpdate:
    await fetch(`${env.SERVER.URI}/follow`,requestOptions)
    .then(res =>{
      if (res.status=="400"){
      }else{}
      return res.json();
    }).then(
      (result) =>{
        if (result.msg=='Ahora sigues a esta persona') {
          setfollowers(followers+1)
        }else{
          setfollowers(followers-1)
        }
        console.log(result)
      }
    )
  }

  

  getPosts= async()=>{
    setcargando(true)
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        owner:`${profileid}`
      })}
      await fetch(`${env.SERVER.URI}/showuserposts`,requestOptions)
      .then((response) => response.json()).
      then((result) =>{
          // console.log(result)
          setposts(result['posts'])
          setpostnumber(result['posts'].length)
          setcargando(false)
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
        _id:`${profileid}`
      })}
      await fetch(`${env.SERVER.URI}/finduser`,requestOptions)
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

useEffect(()=>{
 GetData();
 CheckFollow();
 GetFollowers();
 GetFollowing();
 getPosts();
    
},[])


  return (
    <ScrollView style={{height:'100%',backgroundColor:'white'}}>

    <View style={styles.body}>

    <Spinner
          visible={cargando}
          textContent={'Loading...'}
          textStyle={{color:'white'}}
        />
      
    <View style={styles.profilediv}>

    <View style={styles.avatar}>
    <Image style={styles.avatarimg} source={{uri:`${fotoperfil&&fotoperfil}`}} />
    </View>

    <View style={styles.userdiv}>
    <Text style={styles.username}>{username&&username}</Text>
    {(userid==profileid) && <Pressable  style={styles.editprofile}>
        <Text>Editar Perfil</Text>
        </Pressable>}
        {(userid!=profileid) && <Pressable onPress={()=>{Follow()}} style={styles.editprofile}>

{(check==true) &&<Text>Siguiendo</Text>}
{(check==false) &&<Text>Seguir</Text>}

</Pressable>}
    </View>

    <View style={styles.profilefooter}>
    <Text style={styles.profilename}>{fullname&&fullname}</Text>
    <Text>{bio&&bio}</Text>
    </View>
   
        </View>
        
        <View style={styles.pff}>

          <View style={styles.buttons}>
            <Text style={{fontWeight:'bold'}}>{postsnumber&&postsnumber}</Text>
            <Text>Posts</Text>
          </View>
          
          <View style={styles.buttons}>
            <Text style={{fontWeight:'bold'}}>{followers&&followers}</Text>
            <Text>Followers</Text>
          </View>

          <View style={styles.buttons}>
            <Text style={{fontWeight:'bold'}}>{following&&following}</Text>
            <Text>Following</Text>
          </View>

        </View>



        <View style={styles.posts}>
          {(posts&&posts.length==0)&&
          <View style={styles.noposts}>
            <Octicons name="diff-added" size={50} color="black" />
            <Text style={{fontSize:20,fontWeight:'bold'}}>Profile</Text>
            <Text style={{color:'rgba(60, 60, 60, 1)'}}>When you share Photos</Text>
            <Text style={{color:'rgba(60, 60, 60, 1)'}}>They'll appear on your profile</Text>
            <Text onPress={()=>{navigation.navigate('Tabs', {
              screen: 'NewPost',
              params: { 
                token:Token,
                userid:userid,},
            });}} style={{color:'rgba(0, 149, 246, 1)'}}>Share your first photo</Text>
            </View>}
        {posts&&posts.map((post)=>{
  // const fecha = Tweet.fecha.slice(0, 10);

  return(
    <Pressable style={styles.post} onPress={()=>{navigation.navigate('Tabs', {
      screen: 'Comments',
      params: { 
        token:Token,
        userid:userid,
        Postid:post._id,},
    });}}>
 <Img  key={post._id} id={post._id} Token={Token} userid={userid}></Img>
    </Pressable>
     
    )
})}

        

        </View>




    </View>

    
        </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  body:{
    alignItems:"center",
    backgroundColor:'white',
    width:'100%',
    height:'100%'
  },
  profilediv:{
    width:'100%',
    backgroundColor:'white',
    flexWrap:"wrap",
    flexDirection:'row',
    borderBottomColor:'rgba(238, 238, 238, 1)',
    borderBottomWidth:2
  },
    avatar:{
      width:75,
      height:75,
      backgroundColor:'rgba(200, 200, 200, 1)',
      borderRadius:100,
      marginTop:10,
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:20
    },
    avatarimg:{
      width:70,
      height:70,
      borderRadius:100,
    },
    userdiv:{
      width:200,
      height:70,
      backgroundColor:'white',
      marginTop:10,
      marginLeft:25
    },
    username:{
      fontSize:20,
      fontWeight:'bold',
      margin:10
    },
    editprofile:{
      width:180,
      height:30,
      backgroundColor:'rgba(239, 239, 239, 1)',
      borderRadius:10,
      marginLeft:10,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      
    },
    profilefooter:{
      width:'90%',
      marginTop:10,
      marginBottom:10,
      marginLeft:20,
      backgroundColor:'white',
      flexWrap:"wrap",
    flexDirection:'row',
    },
    profilename:{
      width:'100%',
      fontWeight:'bold'
    },
    pff:{
      width:'100%',
      height:50,
      borderBottomColor:'rgba(238, 238, 238, 1)',
    borderBottomWidth:2,
    flexWrap:"wrap",
    flexDirection:'row',
    },
    buttons:{
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      width:'33%',

    },
    posts:{
      width:'100%',
      flexWrap:'wrap',
      flexDirection:'row',
    },
    post:{
      width:'33.3%',
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
    noposts:{
      width:windowWidth,
      height:windowHeight/2,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      backgroundColor:'white',
    }
})