import React, { Component } from 'react'
import { Text, View, TextInput, AsyncStorage, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button } from 'react-native-button';
import Swiper from 'react-native-swiper';

export default class SwiperPage extends Component {

    start=()=>{
        AsyncStorage.setItem('isFirstIntall','true',()=>{
            this.props.afterInstall();
            console.log('success!!!!!@@@@@');
        });
    }

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false}>
                <View style={styles.slide1}>
                    <Image style={styles.img} source={require('../../assets/1.png')} />
                </View>
                <View style={styles.slide2}>
                    <Image style={styles.img} source={require('../../assets/1.png')} />
                </View>
                <View style={styles.slide3}>
                    <Image style={styles.img} source={require('../../assets/1.png')} />
                    <TouchableOpacity
                        style={styles.start}
                        onPress={this.start}
                    >
                        <Text>开始体验</Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    slide3: {
        flex: 1,
        height:'100%',
        alignItems:'center'
    },
    start: {
        bottom: 100,
        width: 150,
        height: 40,
        backgroundColor: '#458657',
        borderRadius: 30,
        color:'#fff',
        justifyContent:'center',
        alignItems:'center',
        textAlignVertical:'center',//文字垂直居中
    },
    img:{
        width:'100%',
        height:'100%'
    }
})