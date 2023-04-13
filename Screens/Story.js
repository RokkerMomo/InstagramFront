import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Story = ({route,navigation}) => {
    const {foto,descripcion} = route.params;
  return (
    <SafeAreaView>
        <Image blurRadius={30} style={styles.Imagenfondo} source={{uri:`${foto}`}} />
        <View style={styles.imgcontainer}>
        <Image style={styles.Imagen} source={{uri:`${foto}`}} />
        </View>
        <View style={styles.textcontainer}>
            <Text style={styles.text}>{descripcion}</Text>
        </View>
    </SafeAreaView>
  )
}

export default Story

const styles = StyleSheet.create({
    imgcontainer:{
        top:windowHeight/5,
        left:5,
        width:windowWidth-10,
        height:360,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    Imagen:{
        width:windowWidth-10,
        height:360,
        resizeMode:"contain"

    },
    Imagenfondo:{
        position:'absolute',
        width:windowWidth,
        height:windowHeight,

    },
    textcontainer:{
        position:'absolute',
        top:windowHeight/1.3,
        width:windowWidth,
        minHeight:25,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(219, 219, 219, 0.4)',
        padding:5,
    },
    text:{
        width:'75%',
        textAlign:'center'
    }
})