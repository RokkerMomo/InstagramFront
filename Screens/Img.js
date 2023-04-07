import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Dimensions} from 'react-native';
import env from "../env";
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Img = ({id,Token}) => {

    const [imagenes,setimagenes] = useState(null)
    const [multiple,setmultiple] = useState(false)

    var fotos = []

    useEffect(()=>{
        const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${Token}`
            },
            body: JSON.stringify({
              postid:id
            })}
          fetch(`${env.SERVER.URI}/showPostImgs`,requestOptions)
            .then((response) => response.json()).
            then((result) =>{
              console.log("new")

              if (result.length>=2) {
                setmultiple(true)
              }

              for (let index = 0; index < result.length; index++) {
                  
                fotos = [...fotos,result[0].uri]
                  
              }
              console.log(fotos)
              setimagenes(fotos)
              
              }
            )
    },[])


  return (
    <View key={id} style={styles.post}>
        
   <Image style={styles.postimg} source={{uri:`${imagenes}`}} />
   {(multiple==true)&&<Ionicons style={styles.multipleimgs} name="images-outline" size={25} color="white" />}
   
   </View>
  )
}

export default Img

const styles = StyleSheet.create({
    
    postimg:{
      width:'98%',
      height:'98%',
    },
    post:{
      width:'33%',
      height:125,
      backgroundColor:'white',
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      flexWrap:'wrap',
      flexDirection:'row',
    },
    multipleimgs:{
        position:'absolute',
        left:"70%",
        top:'5%',
        backgroundColor:'rgba(60, 60, 60, 0.1)red',
        borderRadius:5,
        padding:2
    }
})