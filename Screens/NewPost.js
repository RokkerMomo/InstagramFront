import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,StyleSheet, SafeAreaView, TextInput,Pressable, FlatList,Text, ScrollView,StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase, UploadFile } from "../config/config";
import Spinner from 'react-native-loading-spinner-overlay';
import env from "../env";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const NewPost = ({route,navigation}) => {

    const [image, setImage] = useState(null);
    const [imagenes,setimagenes] =useState([]);
    const [ownername,setownername] = useState('')
    const [user,setuser] = useState('')
    const [descripcion,setdescipcion] = useState('')
    const [fotoperfil,setfotoperfil] = useState('')
    const [postid,setpostid] = useState('')
    const [cargando,setcargando] =useState(false)

    const {userid,Token} = route.params;

    let date = new Date()

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
        // console.log(result)
        // console.log(result.assets[0])
        if (!result.canceled) {
          for (let index = 0; index < result.assets.length; index++) {
   
            console.log(result.assets[index].uri)
            setimagenes([...imagenes,result.assets[index].uri]);
            // setimagenes([...imagenes,result.assets[index]]);
            
          }
          
          // console.log(imagenes)
        }
      };

      uploadimgs = async() =>{
        for (let index = 0; index < imagenes.length; index++) {


          const response = await fetch(imagenes[index])
          const blob = await response.blob();
          const filename = imagenes[index].substring(imagenes[index].lastIndexOf('/')+1);
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
              postid:`${postid}`,
              uri:`${result}`,
              
            })}
            await fetch(`${env.SERVER.URI}/newimg`,requestOptions)
            .then(res =>{
              console.log(res.status);
              if (res.status=="400"){
              }else{}
              return res.json();
            }).then(
              (result) =>{
                console.log(result)
              }
            )
          }
  
  
          setcargando(false);
          navigation.navigate('Home', {
            screen: 'Home',
            params: { 
              token:Token,
              userid:userid,},
          });
      }


      upload = async () =>{
        setcargando(true);
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${Token}`
          },
          body: JSON.stringify({
            ownername:`${ownername}`,
            owneruser:`${user}`,
            owner:`${userid}`,
            descripcion:`${descripcion}`,
            fotoperfil:`${fotoperfil}`,
            fecha:`${date}`,
            
          })}
          await fetch(`${env.SERVER.URI}/newpost`,requestOptions)
          .then(res =>{
            console.log(res.status);
            if (res.status=="400"){
            }else{}
            return res.json();
          }).then(
            (result) =>{
              setpostid(result._id)
              uploadimgs();
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
              setownername(result.fullname)
              setfotoperfil(result.foto)
              setuser(result.usuario)
            }
          )
      }


      useEffect(()=>{
        GetData();
      },[])


  return (
    <SafeAreaView style={{marginTop:StatusBar.currentHeight}} >
      <ScrollView>
        
      </ScrollView>
      <View style={styles.header}>
        <Text style={{width:'90%',textAlign:'center'}}>New Post</Text>
        <Pressable onPress={()=>(upload())}><Ionicons name="checkmark" size={24} color="rgba(77, 181, 249, 1)" /></Pressable>
        
      </View>
      <View style={styles.body}>

      <Spinner
          visible={cargando}
          textContent={'Loading...'}
          textStyle={{color:'white'}}
        />

      
        <View style={styles.NewPost}>

        <Pressable onPress={pickImage} style={styles.agregarfoto}>
        {/* {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, position:'absolute', borderRadius:10 }} />} */}
          {!image &&<MaterialIcons name="add-a-photo" size={30} color="grey" />}
          </Pressable>

        <TextInput multiline={true} style={styles.input} onChangeText={setdescipcion} value={descripcion} placeholder='Escribe una descripccion'></TextInput>
        
        </View>
        <View style={styles.dotscontainer}>
  {imagenes&&imagenes.map((punto)=>{
    return(
      <View key={punto._id} style={styles.dot}></View>
    
    )
    
  })}
  </View>
        <FlatList
    
    data={imagenes}
    horizontal
    pagingEnabled
    snapToAlignment="center"
    renderItem={ ({ item }) => (
      <View style={styles.postimgcontainer}> 
    <Image style={styles.postimg} source={{uri:item}}/>
    </View>
    )}
  />
  



      </View>
      
    </SafeAreaView>
    
  );

  
}

export default NewPost

const styles = StyleSheet.create({
  body:{
    width:windowWidth,
    height:windowHeight,
    backgroundColor: 'white',

  },
  NewPost:{
    width:windowWidth,
    flexWrap:'wrap',
    flexDirection:'row',
    borderBottomColor:'rgba(219, 219, 219, 1)',
    borderBottomWidth:2
  },
  agregarfoto:{
    backgroundColor: '#FFFFFF',
      borderRadius: 50,
      width: 30, height: 30,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:'5%',
      marginRight:'5%',
      marginBottom:'5%',
      marginTop:'5%'
  },
  postimgcontainer:{
    width:windowWidth,
    height:360,
  },
  postimg:{
    width:windowWidth,
    height:360,
  },
    input:{
      width:'70%',
      marginBottom:'2%',
      marginTop:'2%'
    },
    header:{
      width:windowWidth,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      backgroundColor:'white',
      borderBottomColor:'rgba(219, 219, 219, 1)',
      borderBottomWidth:2,
      flexWrap:'wrap',
      flexDirection:'row'
    },
    dot:{
      height:10,
      width:10,
      borderRadius:10,
      backgroundColor:'rgba(60, 60, 60, 0.7)',
      marginRight:'2%',
      marginTop:5,
      marginBottom:5
    },
    containter:{
      flexWrap:'wrap',
      backgroundColor:'blue',
    },
    dotscontainer:{
      width:windowWidth,
      flexWrap:"wrap",
      flexDirection:'row',
      justifyContent:'center',
      position:'relative',
    }
})