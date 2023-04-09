import {  Pressable, StyleSheet, Text, TextInput, View,Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect,useState } from 'react'
import env from '../env';

const Likes = ({id,token}) => {
    const [numero,setnumero] = useState(0)

    useEffect(()=>{
        const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({
              id:`${id}`
            })}
            fetch(`${env.SERVER.URI}/getlikes`,requestOptions)
              .then(res =>{
                if (res.status=="400"){
                  msg="error";
                }else{}
                return res.json();
              }).then(
                (result) =>{
                setnumero(result)
                }
              )
    },[])

  return (
    <Text style={styles.postheaderText}>{numero} likes</Text>
  )
}

export default Likes

const styles = StyleSheet.create({
    postheaderText:{
        fontSize:12,
        fontWeight:'bold',
        marginTop:5
      },
})