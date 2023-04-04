import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import env from "../env";
const Profile = ({route,navigation}) => {

  const [fotoperfil,setfotoperfil] = useState(null)
  const [fullname,setfullname] = useState('')
  const [username,setusername] = useState('')
  const [bio,setbio] = useState('')
  const [postsnumber,setpostnumber] = useState(0);
  const [followers,setfollowers] = useState(0);
  const [following,setfollowing] = useState(0);
  const {userid,Token} = route.params;


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
         setfullname(result.fullname)
         setbio(result.bio)
         setusername(result.usuario)
         setfotoperfil(result.foto)
        }
      )
  }

useEffect(()=>{
 GetData();
    
},[])


  return (
    <ScrollView style={{height:'100%',backgroundColor:'white'}}>

    <View style={styles.body}>
      
    <View style={styles.profilediv}>

    <View style={styles.avatar}>
    <Image style={styles.avatarimg} source={{uri:`${fotoperfil&&fotoperfil}`}} />
    </View>

    <View style={styles.userdiv}>
    <Text style={styles.username}>{username&&username}</Text>
    <Pressable style={styles.editprofile} ><Text>Edit Profile</Text></Pressable>
    </View>

    <View style={styles.profilefooter}>
    <Text style={styles.profilename}>{fullname&&fullname}</Text>
    <Text>{bio&&bio}</Text>
    </View>
   
        </View>
        
        <View style={styles.pff}>

          <View style={styles.buttons}>
            <Text style={{fontWeight:'bold'}}>{postsnumber&&postsnumber}</Text>
            <Text>Posts</Text>
          </View>
          
          <View style={styles.buttons}>
            <Text style={{fontWeight:'bold'}}>{followers&&followers}</Text>
            <Text>Followers</Text>
          </View>

          <View style={styles.buttons}>
            <Text style={{fontWeight:'bold'}}>{following&&following}</Text>
            <Text>Following</Text>
          </View>

        </View>

        <View style={styles.posts}>

        <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

    <View style={styles.post}>
    <Image style={styles.postimg} source={require('../assets/avatarsample.png')} />
    </View>

        </View>




    </View>

    
        </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  body:{
    alignItems:"center",
    backgroundColor:'white',
    width:'100%',
    height:'100%'
  },
  profilediv:{
    width:'100%',
    backgroundColor:'white',
    flexWrap:"wrap",
    flexDirection:'row',
    borderBottomColor:'rgba(238, 238, 238, 1)',
    borderBottomWidth:2
  },
    avatar:{
      width:75,
      height:75,
      backgroundColor:'rgba(200, 200, 200, 1)',
      borderRadius:100,
      marginTop:10,
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:20
    },
    avatarimg:{
      width:70,
      height:70,
      borderRadius:100,
    },
    userdiv:{
      width:200,
      height:70,
      backgroundColor:'white',
      marginTop:10,
      marginLeft:25
    },
    username:{
      fontSize:20,
      fontWeight:'bold',
      margin:10
    },
    editprofile:{
      width:180,
      height:30,
      backgroundColor:'rgba(239, 239, 239, 1)',
      borderRadius:10,
      marginLeft:10,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      
    },
    profilefooter:{
      width:'90%',
      marginTop:10,
      marginBottom:10,
      marginLeft:20,
      backgroundColor:'white',
      flexWrap:"wrap",
    flexDirection:'row',
    },
    profilename:{
      width:'100%',
      fontWeight:'bold'
    },
    pff:{
      width:'100%',
      height:50,
      borderBottomColor:'rgba(238, 238, 238, 1)',
    borderBottomWidth:2,
    flexWrap:"wrap",
    flexDirection:'row',
    },
    buttons:{
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      width:'33%',

    },
    posts:{
      width:'100%',
      flexWrap:'wrap',
      flexDirection:'row',
    },
    post:{
      width:'33%',
      height:100,
      backgroundColor:'rgba(200, 200, 200, 1)',
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      flexWrap:'wrap',
      flexDirection:'row',
    },
    postimg:{
      width:'98%',
      height:'98%',
    },
})