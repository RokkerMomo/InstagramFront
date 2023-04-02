import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const Login = () => {

  const [search,onchangeSearch] = useState('')

  return (
    <SafeAreaView>
      <ScrollView style={{height:'100%',backgroundColor:'white'}}>

<View style={styles.body}>

  <View style={styles.container}>

  <View style={styles.barsearch}>

  <Ionicons name="search" size={20} color="grey" />
  <TextInput
style={styles.input}
onChangeText={onchangeSearch}
value={search}
placeholder="Search"
/>
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
    barsearch:{
      justifyContent:'center',
      alignItems:'center',
      flexWrap:'wrap',
      flexDirection:'row',
      borderColor:'rgba(200, 200, 200, 1)',
      borderWidth:1,
      borderRadius:5,
      width:'80%'
    },
    input:{
      width:'80 %'
    },
    container:{
      width:'100%',
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      margin:5
    },

})