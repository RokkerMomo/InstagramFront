import { StyleSheet, Text, View,Image,Alert } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import env from "../env";

const Login = ({ navigation }) => {

  const [User,onChangeUser] = useState('');
  const [Pass,onChangePass] = useState('');

  msg=""

  const createTwoButtonAlert = () =>
    Alert.alert('Alerta!', `${msg}`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const SignIn = async () =>{
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario:`${User}`,
        password:`${Pass}`,
      })}
      await fetch(`${env.SERVER.URI}/signIn`,requestOptions)
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
            navigation.navigate('Tabs', {
              screen: 'Tabs',
              params: { 
                token:result.token,
                userid:result.user._id,},
            });
          }
        }
      )
  }


  return (
    <SafeAreaView style={{backgroundColor:'white'}}>

      <View style={styles.body}>

      <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png',
          }}
          style={{width: 150, height:50,marginTop:44,marginBottom:25 }}
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

        <Pressable onPress={() =>SignIn()} style={styles.LogIn}><Text style={styles.LogInText}>Log In</Text></Pressable>

        <View style={styles.letters}>
        <Text>Don't have an account ? </Text>
        <Pressable onPress={() => navigation.navigate('Register')}><Text style={{color:'rgba(0, 149, 246, 1)'}}>Sing Up</Text></Pressable>
        </View>
        


      </View>

    </SafeAreaView>
  )
}

export default Login

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
  LogIn:{
    width:263,
    height:40,
    backgroundColor:'rgba(77, 181, 249, 1)',
    borderRadius:10,
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