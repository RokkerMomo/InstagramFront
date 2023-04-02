import { StyleSheet, Text, View,Image,ScrollView,Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {

  const [text, setText] = useState('');
  const hasUnsavedChanges = Boolean(true);

  

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Cerrar Sesion?',
          'Quieres volver a la pantalla de inicio y cerrar tu sesion ?',
          [
            { text: "No Salir", style: 'cancel', onPress: () => {} },
            {
              text: 'Salir',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );


  const [images, setimages] = useState([
    require('../assets/sample.jpg'),
    require('../assets/avatarsample.png'),
  ]);

  return (
    <SafeAreaView style={{marginBottom:50}}>
      <View style={styles.header}>
      <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png',
          }}
          style={{width: '45%', height:'100%' }}
        />
        <Ionicons style={{marginLeft:'45%'}} name="add-circle-outline" size={30} color="black" />
      </View>
      <ScrollView>

<View style={styles.Storys}>
  <View style={styles.MyStory}>
    <View style={styles.avatar}>
    <Image style={styles.avatarimg} source={require('../assets/avatarsample.png')} />
    </View>
    <Text style={styles.TextMyStory}>Your Story</Text>
  </View>
</View>

<View style={styles.post}>
<View style={styles.postHeader}>
  <View style={styles.postavatar}>
    <Image style={styles.avatarimg} source={require('../assets/avatarsample.png')} />
    </View>
    <Text style={styles.postheaderText}>Username</Text>
  </View>
</View>

<FlatList
    
    data={images}
    horizontal
    pagingEnabled
    snapToAlignment="center"
    nestedScrollEnabled
    renderItem={ ({ item}) => (
      <View style={styles.postimgcontainer}> 
    <Image style={styles.postimg} source={item}/>
    </View>
    )}
  />

<View style={styles.post}>  
 


  <View style={styles.postContenido}>
    <View style={styles.postButtons}>
    <Ionicons style={{marginLeft:11}} name="heart-outline" size={24} color="black" />
    <Ionicons style={{marginLeft:11}} name="chatbubble-outline" size={24} color="black" />
    <Ionicons style={{marginLeft:11}} name="paper-plane-outline" size={24} color="black" />
    <Ionicons style={{marginLeft:220}} name="bookmark-outline" size={24} color="black" />
    </View>
    <Text style={styles.postheaderText} >9,785 likes</Text>
    <Text style={{fontSize:12,marginLeft:10}}><Text style={styles.postheaderText}>RokkerMomo</Text> Aqui iria la descripcion del post y seria habria que ponerle un limite de caracteres para que los post no se alargen mucho y se vea todo bonito, ademas de que la descripcion va justo despues del nombre.</Text>

  </View>

</View>

</ScrollView>
    </SafeAreaView>
    
  )
}

export default Home

const styles = StyleSheet.create({
  body:{
    flex:1,
      backgroundColor: 'rgba(255, 255, 255, 1)',
  
    },
    header:{
      width:windowWidth,
      height:50,
      justifyContent:'center',
      backgroundColor:'white',
      borderBottomColor:'rgba(219, 219, 219, 1)',
      borderBottomWidth:1,
      flexWrap:'wrap',
    },
    Storys:{
      width:windowWidth,
      height:70,
      justifyContent:'center',
      backgroundColor:'white',
      borderBottomColor:'rgba(219, 219, 219, 1)',
      borderTopColor:'rgba(219, 219, 219, 1)',
      borderRightColor:"white",
      borderLeftColor:"white",
      borderWidth:1,
      marginTop:0,
    },
    MyStory:{
      width:45,
      height:56,
      marginLeft:11,
      flexWrap:'wrap',
      flexDirection:'row',
      justifyContent:'center'
    },
    avatar:{
      width:45,
      height:45,
      backgroundColor:'white',
      borderRadius:100,
    },
    avatarimg:{
      width:45,
      height:45,
      borderRadius:100,
    },
    TextMyStory:{
      fontSize:9
    },
    post:{
      width:windowWidth,
      backgroundColor:'white',
      flexWrap:'wrap',
      flexDirection:'row',
    },
    postHeader:{
      width:windowWidth,
      height:50,
      backgroundColor:'white',
      flexWrap:'wrap',
      flexDirection:'row',
      alignContent:'center',
      alignItems:'center',
    },
    postavatar:{
      width:45,
      height:45,
      backgroundColor:'white',
      borderRadius:100,
      marginLeft:10,
    },
    postheaderText:{
      fontSize:12,
      fontWeight:'bold',
      marginLeft:10
    },
    postContenido:{
      width:windowWidth,
      flexWrap:'wrap',
      flexDirection:'row',
      backgroundColor:'white'
    },
    postimgcontainer:{
      width:windowWidth,
      height:360,
    },
    postimg:{
      width:windowWidth,
      height:360,

    },
    postButtons:{
      width:windowWidth,
      height:50,
      backgroundColor:'white',
      flexWrap:'wrap',
      flexDirection:'row',
      alignContent:'center',
      alignItems:'center',
    }

})