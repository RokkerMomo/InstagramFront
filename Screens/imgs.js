import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Dimensions} from 'react-native';
import env from "../env";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imgs = ({id,Token}) => {

    const [imagenes,setimagenes] = useState(null)

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
              for (let index = 0; index < result.length; index++) {
                  
                fotos = [...fotos,result[index].uri]
                  
              }
              console.log(fotos)
              setimagenes(fotos)
              
              }
            )
    },[])

 

  return (
    <View>
      <FlatList
    
    data={imagenes}
    horizontal
    pagingEnabled
    snapToAlignment="center"
    nestedScrollEnabled
    showsHorizontalScrollIndicator={false}
    renderItem={ ({ item}) => (
      <View style={styles.postimgcontainer}> 
    <Image style={styles.postimg} source={{uri:`${item}`}}/>
    
    {/* {item&&item.map((item)=>{
     return(
      <View style={styles.dot}></View>
     )
    })} */}
    </View>
    )}
  />
  <View style={styles.dotscontainer}>
  {imagenes&&imagenes.map((punto)=>{
    return(
      <View key={punto._id} style={styles.dot}></View>
    
    )
    
  })}
  </View>
  
    </View>
    
  )
}

export default imgs

const styles = StyleSheet.create({
    postimgcontainer:{
        width:windowWidth,
        height:360,
      },
      postimg:{
        width:windowWidth,
        height:360,
      },
        dot:{
          height:10,
          width:10,
          borderRadius:10,
          backgroundColor:'rgba(225, 225, 225, 0.7)',
          marginRight:'2%',
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
          position:'absolute',
          top:'96%',
        }
})