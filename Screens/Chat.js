import { StyleSheet, Text, View,Image,ScrollView,Alert, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import env from "../env";
import { AntDesign } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



import io from "socket.io-client";
const socket = io(`https://instagramback-production.up.railway.app`)

const Chat = ({route,navigation}) => {
const [mensajes,setmensajes] = useState(null)
const {userid,userid1,userid2,Token} = route.params;
const [descripcion,setdescripcion] = useState(null)
const [contadormensaje,setcontadormensaje] = useState(0)
let date = new Date()

NewMessage = async()=>{
  socket.emit('mensaje',descripcion)

  setdescripcion('');
  if (userid==userid1) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        descripcion:`${descripcion}`,
        de:`${userid1}`,
        para:`${userid2}`,
        fecha:`${date}`
      })}
      await fetch(`${env.SERVER.URI}/newmessage`,requestOptions)
    .then((response) => response.json())
    .then((data) =>{
      setcontadormensaje(contadormensaje+1);
    } );
  }else{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        descripcion:`${descripcion}`,
        de:`${userid2}`,
        para:`${userid1}`,
        fecha:`${date}`
      })}
      await fetch(`${env.SERVER.URI}/newmessage`,requestOptions)
    .then((response) => response.json())
    .then((data) =>{
      setcontadormensaje(contadormensaje+1);
    } );
  }
}

  GetMessages= async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        userid1:`${userid1}`,
        userid2:`${userid2}`
      })}
  await fetch(`${env.SERVER.URI}/searchMessages`,requestOptions)
  .then((response) => response.json())
  .then((data) =>{
    setmensajes(data)
  } );
  }

  useEffect( ()=>{
    const receivedMessage = () =>{
      setcontadormensaje(contadormensaje+1)
    
    }
    socket.on('mensaje', receivedMessage)

    //Desuscribimos el estado del componente cuando ya no es necesario utilizarlo
    return () => {
      socket.off('mensaje', receivedMessage)
    }
  },[contadormensaje])

  useEffect(()=>{
    GetMessages();
  },[contadormensaje])
  
  return (
    <View>
      
<SafeAreaView>
      <ScrollView style={{backgroundColor:'white'}}>
      <View style={styles.header}>
                <Pressable onPress={()=>{navigation.goBack()}} style={{marginRight:20}}><Ionicons name="arrow-back" size={30} color="black" /></Pressable>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Chat</Text>
            </View>

        <View style={styles.chatcontainer}>

        
        {mensajes&&mensajes.map((mensaje)=>{
          return(
            <View key={mensaje._id} style={[styles.mensaje, mensaje.de==userid ? styles.mensajepropio : styles.mensaje]}>
            <Text style={{color:"white"}}>{mensaje.descripcion}</Text>
          </View>
          )
        })}
       </View>
      </ScrollView>
      </SafeAreaView>
      <View style={styles.newmensaje}>
      <TextInput
        style={styles.newmensajeinput}
        onChangeText={setdescripcion}
        value={descripcion}
        placeholder="Escribe un nuevo mensaje"
      />
        <Pressable onPress={()=>{NewMessage();}} ><AntDesign name="enter" size={24} color="black" /></Pressable>
      </View>
    </View>
    

      

    
  )
}

export default Chat

const styles = StyleSheet.create({
  chatcontainer:{
    width:windowWidth,
    padding:5,
    backgroundColor:'white',
    flex:1,
    marginBottom:80
  },
  mensaje:{
    backgroundColor:'rgba(24, 37, 51, 1)',
    borderRadius:15,
    width:'60%',
    minHeight:50,
    marginTop:5,
    justifyContent:'center',
    paddingLeft:10,
    paddingRight:5
  },
  mensajepropio:{
    left:'40%',
    backgroundColor:'rgba(43, 82, 120, 1)',
  },
  newmensaje:{
    height:'10%',
    position:'absolute',
    top:'90%',
    width:windowWidth,
    flexWrap:'wrap',
    flexDirection:'row',
    backgroundColor:'white',
    justifyContent:"center",
    alignContent:"center",
    alignItems:'center',
    borderTopColor:'rgba(219, 219, 219, 1)',
    borderTopWidth:2
  },
  newmensajeinput:{
    width:'80%',
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

})