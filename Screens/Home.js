import { StyleSheet, Text, View,Image,ScrollView,Alert, Pressable } from 'react-native'
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({route,navigation}) => {

  const [text, setText] = useState('');
  const [posts,setposts] = useState(null)
  const [cargando,setcargando] =useState(false)
  const hasUnsavedChanges = Boolean(true);
  const {userid,Token} = route.params;

  
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
      })}
      await fetch(`${env.SERVER.URI}/showAllPosts`,requestOptions)
      .then((response) => response.json()).
      then((result) =>{
          // console.log(result)
          setposts(result)
          setcargando(false)

        }
      ) 
  }

  useEffect(()=>{
    getPosts();
  },[])

  useEffect(
  
     () =>{
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Cerrar Sesion?',
          'Quieres volver a la pantalla de inicio y cerrar tu sesion ?',
          [
            { text: "No Salir", style: 'cancel', onPress: () => {} },
            {
              text: 'Salir',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      })    
    },
[navigation, hasUnsavedChanges]);


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
  <View style={styles.MyStory}>
    <View style={styles.avatar}>
    <Image style={styles.avatarimg} source={require('../assets/avatarsample.png')} />
    </View>
    <Text style={styles.TextMyStory}>Your Story</Text>
  </View>
</View>

<Spinner
          visible={cargando}
          textContent={'Loading...'}
          textStyle={{color:'white'}}
        />

{posts&&posts.map((post)=>{
  // const fecha = Tweet.fecha.slice(0, 10);

  return(
    <View key={post._id}>
      <View style={styles.post}>
<View style={styles.postHeader}>
  <View style={styles.postavatar}>
    <Image style={styles.avatarimg} source={{uri:`${post.fotoperfil}`}} />
    </View>
    <Text style={styles.postheaderText}>{post.owneruser}</Text>
  </View>
</View>

<Imgs id={post._id} Token={Token}></Imgs>

<View style={styles.post}>  
  <View style={styles.postContenido}>
    <View style={styles.postButtons}>
      <Heart id={post._id} token={Token} userid={userid} ></Heart>
    <Ionicons style={{marginLeft:11,marginTop:5}} name="chatbubble-outline" size={24} color="black" />
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
    }

})