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
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase, UploadFile } from "../config/config";
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = ({route,navigation}) => {
  const {userid,profileid,Token} = route.params;
    const [image,setImage] = useState(null);
  const [mostrar,setmostrar] = useState(null);
  const [resultadoimagen,setresultadoimagen] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [nombre,onChangeNombre] = useState('Nombre')
  const [apellido,onChangeApellido] = useState('Apellido')
  const [usuario,onChangeUsuario] = useState('Usuario')
  const [bio,onChangeBio] = useState('Biografia')
  const [mostrarcambio,setmostrarcambio] =useState(false)
  const [sendinput,setsendinput] = useState(null)

  const [vieja,onChangeVieja] = useState("")
  const [nueva,onChangeNueva] = useState("")

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      allowsMultipleSelection:false,
      aspect: [4, 4],
      quality: 1,
    });
    console.log('new')
    console.log(result.assets[0].uri)
    // console.log(result.assets[0])
    if (!result.canceled) {
       
          setImage(result.assets[0].uri);
          updatepic();
          
  
      // console.log(imagenes)
    }
  };

  updatepic = async ()=>{
    const response = await fetch(image)
          const blob = await response.blob();
          const filename = image.substring(image.lastIndexOf('/')+1);
          const result = await UploadFile(blob,filename)
          console.log(result)
  
          const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${Token}`
            },
            body: JSON.stringify({
              _id:`${userid}`,
              foto:`${result}`,
              
            })}
            await fetch(`${env.SERVER.URI}/changepic`,requestOptions)
            .then(res =>{
              console.log(res.status);
              if (res.status=="400"){
              }else{}
              return res.json();
            }).then(
              (result) =>{
              }
            )
  }

  updateprofile = async()=>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        _id:`${userid}`,
    fullname:`${nombre}`,
    usuario:`${usuario}`,
    bio:`${bio}`
      })}
      await fetch(`${env.SERVER.URI}/edituser`,requestOptions)
      .then(res =>{
        console.log(res.status);
        if (res.status=="400"){
        }else{}
        return res.json();
      }).then(
        (result) =>{
          navigation.navigate('Home', {
            screen: 'Home',
            params: { 
              token:Token,
              userid:userid,},
          });
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
         onChangeNombre(result.fullname)
         onChangeBio(result.bio)
         onChangeUsuario(result.usuario)
         setImage(result.foto)
        }
      )

  }

  useEffect(()=>{
    GetData();
  },[])
  return (
    <ScrollView style={{backgroundColor:'white'}}>
    <View style={styles.Body}>
      <Text style={{fontSize:16, fontWeight:'bold', marginTop:20}}>Enter Your new data</Text>
<Text style={{color:'rgba(142, 142, 142, 1)',marginBottom:8}}>all your posts will be updated </Text>

{/* <Dialog.Container visible={mostrarcambio}>
      <Dialog.Title>Cambiar Contraseña</Dialog.Title>
      <Dialog.Description>
        Ingrese los datos
      </Dialog.Description>
      <Dialog.Input secureTextEntry={true} label="Contraseña actual" onChangeText={onChangeVieja} value={vieja}></Dialog.Input>
      <Dialog.Input secureTextEntry={true} label="Contraseña Nueva"  onChangeText={onChangeNueva} value={nueva}></Dialog.Input>
      <Dialog.Button onPress={()=>{setmostrarcambio(false)}} label="Cancelar" />
      <Dialog.Button onPress={()=>{Changepass()}} label="Cambiar" />
    </Dialog.Container> */}



      <View style={styles.Carta}>
        
        <Pressable onPress={()=>{pickImage()}} style={styles.agregarfoto}>
        {image && <Image source={{ uri: image&&image }} style={{ width: 100, height: 100, position:'absolute', borderRadius:50 }} />}
          {image &&<MaterialIcons name="add-a-photo" size={24} color="white" />}
          </Pressable>

        <Text style={styles.datos}>Datos Personales</Text>
        <TextInput onChangeText={onChangeNombre} value={nombre} placeholder='Nombre' style={styles.Input}></TextInput>
        <TextInput onChangeText={onChangeUsuario} value={usuario} placeholder='Usuario' style={styles.Input}></TextInput>

        <TextInput onChangeText={onChangeBio} value={bio}
        editable
        multiline
        numberOfLines={4}
        maxLength={50} placeholder='Biografia (Opcional)' style={styles.InputBio}></TextInput>
        
        
      <Pressable onPress={()=>{updateprofile()}} style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgba(6, 153, 240, 0.2)' : 'transparent',
            },
            styles.Registro,
          ]}>
          <Text style={styles.textRegistro}>Guardar Cambios</Text>
          </Pressable>

         

      </View>
     
    </View>
    </ScrollView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    datos:{
        color:'white',
        marginBottom:10
    },
    Body:{
        flex: 1,
        backgroundColor: 'white',
        alignContent:'center',
        alignItems:'center'
    
      },
    Titulo:{
      color: '#FFFFFF',
      fontSize:24,
      fontWeight:"bold",
      marginBottom:12,
    
    
    },
    Carta:{
      backgroundColor:'white',
      width:'100%',

      borderRadius:10,
      paddingTop:16,
      paddingRight:20,
      paddingLeft:20,
    marginTop:10,
    marginBottom:10,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
    
    },
    Input:{
      width:263,
    height:40,
    backgroundColor:'rgba(250, 250, 250, 1)',
    borderColor:'rgba(238, 238, 238, 1)',
    borderWidth:1,
    borderRadius:5,
    marginBottom:20,
    paddingLeft:5,
    },
    Inputpass:{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginBottom:10,
      paddingLeft:5,
      height:35,
      width:'50%'
    },

    InputBio:{
      width:263,
      height:40,
      backgroundColor:'rgba(250, 250, 250, 1)',
      borderColor:'rgba(238, 238, 238, 1)',
      borderWidth:1,
      borderRadius:5,
      paddingLeft:5,
      marginBottom:10
      },
    
    
    textIngresar:{
      color:'#00FF38',
    },
    
    Registro:{
      width:150,
      height:30,
      backgroundColor:'rgba(239, 239, 239, 1)',
      borderRadius:10,
      marginLeft:10,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      marginRight:15,
      marginTop:40
    },
    changepass:{
      width:'49%',
      height:35,
      color:'yellow',
      backgroundColor:'yellow',
      borderColor:'black',
      borderRadius:5,
      borderWidth:2,
      alignItems: 'center',
      marginLeft:'1%',
      flexWrap:'wrap',
      flexDirection:'row',
      paddingLeft:'5%'
    },
    textchangepass:{
      color:"black"
    },
    textRegistro:{
    },
    agregarfoto:{
      backgroundColor: '#FFFFFF',
        borderRadius: 50,
        marginBottom:10,
        width: 100, height: 100,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'30%',
    }
})