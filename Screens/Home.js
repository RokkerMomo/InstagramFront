import { StyleSheet, Text, View,Image,ScrollView,Alert, Pressable,BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import Imgs from "../Screens/imgs";
import env from "../env";
import Likes from "./Likes";
import Heart from "./heart";
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({route,navigation}) => {

  const [text, setText] = useState('');
  const [posts,setposts] = useState(null)
  const [cargando,setcargando] =useState(false)
  const [storys,setstorys] = useState(null)
  const hasUnsavedChanges = Boolean(true);
  const {userid,Token} = route.params;

  getstorys = async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
      })}
      await fetch(`${env.SERVER.URI}/showstorys`,requestOptions)
  .then((response) => response.json())
  .then((data) =>{
    setstorys(data)
    console.log(storys)
    setcargando(false)
  } );
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
        userid:`${userid}`
      })}
  await fetch(`${env.SERVER.URI}/showfollowing`,requestOptions)
  .then((response) => response.json())
  .then((data) =>{
    setposts(data)
    setcargando(false)
  } );
  }

  useEffect(
  
    () =>{
     navigation.addListener('beforeRemove', (e) => {
       if (!hasUnsavedChanges) {
         // If we don't have unsaved changes, then we don't need to do anything
         return;
       }

       // Prevent default behavior of leaving the screen
       e.preventDefault();

       BackHandler.exitApp();
     })    
   },
[navigation, hasUnsavedChanges]);

  useEffect(()=>{
    getPosts();
    getstorys();
  },[])

  


  return (
    <SafeAreaView style={{marginBottom:50}}>
      <View style={styles.header}>
      <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png',
          }}
          style={{width: '45%', height:'100%' }}
        />
        
      </View>
      <ScrollView>

<View style={styles.Storys}>
  <Pressable onPress={()=>{navigation.navigate('Tabs', {
              screen: 'NewStory',
              params: { 
                token:Token,
                userid:userid,},
            });}} style={styles.MyStory}>
    <View  style={styles.avatar}>
    <Ionicons name="add-outline" size={30} color="black" />
    </View>
    <Text style={styles.TextMyStory}>New Story</Text>
  </Pressable>
    {storys&&storys.map((story)=>{
      return (
        <Pressable onPress={()=>{navigation.navigate('Tabs', {
          screen: 'Story',
          params: { 
            foto:story.foto,
            descripcion:story.descripcion
          },
        });}} style={styles.MyStory}>
<View  style={styles.avatar}>
<Image style={styles.avatarimg} source={{uri:`${story.fotoperfil}`}} />
</View>
<Text style={styles.TextMyStory}>{story.owneruser}</Text>
</Pressable>
      )
    })}
</View>

<Spinner
          visible={cargando}
          textContent={'Loading...'}
          textStyle={{color:'white'}}
        />

{(posts&&posts.length==0)&&
          <View style={styles.noposts}>
            <Ionicons name="home" size={50} color="black" />
            <Text style={{fontSize:20,fontWeight:'bold'}}>Home</Text>
            <Text style={{color:'rgba(60, 60, 60, 1)'}}>Here you'll be shown the posts of the users you follow</Text>
            <Text style={{color:'rgba(60, 60, 60, 1)'}}>You dont follow anyone yet</Text>
            <Text onPress={()=>{navigation.navigate('Tabs', {
              screen: 'Search',
              params: { 
                token:Token,
                userid:userid,},
            });}} style={{color:'rgba(0, 149, 246, 1)'}}>Search for users to follow</Text>
            </View>}

{posts&&posts.map((post)=>{
  // const fecha = Tweet.fecha.slice(0, 10);

  return(
    <View key={post._id}>
      <View style={styles.post}>
<View style={styles.postHeader}>
  <Pressable onPress={()=>{navigation.navigate('Tabs', {
              screen: 'Profile',
              params: { 
                token:Token,
                userid:userid,
                profileid:post.owner,},
            });}} style={styles.postavatar}>
    <Image style={styles.avatarimg} source={{uri:`${post.fotoperfil}`}} />
    </Pressable>
    <Text onPress={()=>{navigation.navigate('Tabs', {
              screen: 'Profile',
              params: { 
                token:Token,
                userid:userid,
                profileid:post.owner,},
            });}} style={styles.postheaderText}>{post.owneruser}</Text>
  </View>
</View>

<Imgs id={post._id} Token={Token}></Imgs>

<View style={styles.post}>  
  <View style={styles.postContenido}>
    <View style={styles.postButtons}>
      <Heart id={post._id} token={Token} userid={userid} ></Heart>
      <Pressable onPress={()=>{navigation.navigate('Tabs', {
              screen: 'Comments',
              params: { 
                token:Token,
                userid:userid,
                Postid:post._id,},
            });}}><Ionicons style={{marginLeft:11,marginTop:5}} name="chatbubble-outline" size={24} color="black" /></Pressable>
    
    </View>
    <Text style={{fontSize:12,marginLeft:10,width:'90%'}}><Text style={styles.postheaderText}>{post.owneruser}</Text> {post.descripcion}</Text>

  </View>

</View>
    </View>
  )
})}


</ScrollView>
    </SafeAreaView>
    
  )
}

export default Home

const styles = StyleSheet.create({
  body:{
    flex:1,
      backgroundColor: 'rgba(255, 255, 255, 1)',
  
    },
    header:{
      width:windowWidth,
      height:50,
      justifyContent:'center',
      backgroundColor:'white',
      borderBottomColor:'rgba(219, 219, 219, 1)',
      borderBottomWidth:1,
      flexWrap:'wrap',
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
      flexWrap:'wrap',
      flexDirection:'column'
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
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
    },
    avatarimg:{
      width:45,
      height:45,
      borderRadius:100,
    },
    TextMyStory:{
      fontSize:9,
      width:55,
      textAlign:'center'
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
    noposts:{
      width:windowWidth,
      height:windowHeight/1.2,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      backgroundColor:'white',
    }

})