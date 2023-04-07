import {  Pressable, StyleSheet, Text, TextInput, View,Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect,useState } from 'react'
import env from '../env';
import Likes from "./Likes";

const heart = ({id,userid,token}) => {

    const [numero,setnumero] = useState(0)
    const [check,SetCheck] = useState(false)

    const darLike = ()=>{

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
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify({
            id:`${id}`,
            idUsuario:`${userid}`
          })}
            //axios
            fetch(`${env.SERVER.URI}/like`,requestOptions)
            .then(res =>{
              if (res.status=="400"){
                msg="error";
              }else{}
              return res.json();
            }).then(
              (result) =>{
              if (result.msg=="Se dio like") {
                setnumero(numero+1)
              }else{
                setnumero(numero-1)
              }
              }
            )
      }



    useEffect(()=>{
        const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({
                id:`${id}`,
              idUsuario:`${userid}`
            })}
        fetch(`${env.SERVER.URI}/checklike`,requestOptions)
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
    },[])

  return (<View>
     <Pressable onPress={()=>{darLike()}} style={{marginLeft:11,marginTop:5}}>
    {(check==false)&&<Ionicons  name="heart-outline" size={24} color="black" />}
    {(check==true)&&<Ionicons name="heart" size={24} color="red" />}
    </Pressable>
    <Likes id={id} token={token}></Likes>
  </View>
   
  )
}

export default heart

const styles = StyleSheet.create({})