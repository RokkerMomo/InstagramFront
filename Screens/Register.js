import { StyleSheet, Text, View,Image,Alert } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import env from "../env";
const Register = ({navigation}) => {
    const [Name,onChangeName] = useState('');
    const [User,onChangeUser] = useState('');
    const [Bio,onChangeBio] = useState('');
    const [Pass,onChangePass] = useState('');

    msg=""

    const createTwoButtonAlert = () =>
    Alert.alert('Alerta!', `${msg}`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

    const succsess = () =>
    Alert.alert('Alerta!', `${msg}`, [
      {text: 'OK', onPress: () => navigation.navigate('Login')},
    ]);

    const SignUp = async () =>{
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname:`${Name}`,
          usuario:`${User}`,
          password:`${Pass}`,
          foto:'https://firebasestorage.googleapis.com/v0/b/movilestwitter-395ad.appspot.com/o/pngegg.png?alt=media&token=3d924671-2f05-4949-92ae-d722d5b51049',
          bio:`${Bio}`
        })}
        await fetch(`${env.SERVER.URI}/signup`,requestOptions)
      .then(res =>{
        console.log(res.status);
        if (res.status=="400"){
          msg="error";
        }else{}
        return res.json();
      }).then(
        (result) =>{
          console.log(result)
          if (msg=="error") {
            msg=result.msg
          createTwoButtonAlert();
          }else{
            msg='registrado con exito'
            succsess();
            console.log(result);
          }
        }
      )

    }

  return (

        <ScrollView style={{height:'100%',backgroundColor:'white'}}>
        <View style={styles.body}>

<Text style={{fontSize:16, fontWeight:'bold', marginTop:10}}>Enter Name and password</Text>
<Text style={{color:'rgba(142, 142, 142, 1)',marginBottom:8}}>Add your name so friends can find you</Text>

<TextInput
style={styles.input}
onChangeText={onChangeName}
value={Name}
placeholder="Full Name"
/>

<TextInput
style={styles.input}
onChangeText={onChangeUser}
value={User}
placeholder="Username"
/>

<TextInput
style={styles.input}
onChangeText={onChangePass}
value={Pass}
placeholder="Password"
secureTextEntry={true}
/>

<TextInput
style={styles.inputbio}
onChangeText={onChangeBio}
value={Bio}
editable
        multiline
        numberOfLines={4}
        maxLength={40}
placeholder="biography (optional)"
/>

<Pressable onPress={()=>{SignUp()}} style={styles.LogIn}><Text style={styles.LogInText}>Create Account</Text></Pressable>



</View>
        </ScrollView>
    

  )
}

export default Register

const styles = StyleSheet.create({
    body:{
        alignItems:"center",
        backgroundColor:'white',
        width:'100%',
        height:'100%'
      },
      input:{
        width:263,
        height:40,
        backgroundColor:'rgba(250, 250, 250, 1)',
        borderColor:'rgba(238, 238, 238, 1)',
        borderWidth:1,
        borderRadius:5,
        marginBottom:8,
        paddingLeft:5,
      },
      inputbio:{
        width:263,
        height:80,
        backgroundColor:'rgba(250, 250, 250, 1)',
        borderColor:'rgba(238, 238, 238, 1)',
        borderWidth:1,
        borderRadius:5,
        marginBottom:8,
        padding:5,
    },
      LogIn:{
        width:263,
        height:40,
        backgroundColor:'rgba(77, 181, 249, 1)',
        borderRadius:5,
        marginBottom:45,
        paddingLeft:5,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
      LogInText:{
        color:'white'
      },
      letters:{
        flexWrap:'wrap',
        flexDirection:'row'
      }
})