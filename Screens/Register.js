import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'

const Register = ({navigation}) => {
    const [Name,onChangeName] = useState('');
    const [User,onChangeUser] = useState('');
    const [Bio,onChangeBio] = useState('');
    const [Pass,onChangePass] = useState('');

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

<Pressable style={styles.LogIn}><Text style={styles.LogInText}>Create Account</Text></Pressable>



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