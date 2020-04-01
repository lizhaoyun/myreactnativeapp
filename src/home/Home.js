import React, { Component } from 'react';
import { View, Text, Dimensions,Button,ScrollView, TextInput, Image, StyleSheet, TouchableOpacity, StatusBar, } from 'react-native';
import { Actions } from "react-native-router-flux";
import { Icon } from '@ant-design/react-native';
import Swiper from 'react-native-swiper';


const { width } = Dimensions.get('window');
const s = width / 640;

export default class Home extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    height: 80*s,
                    backgroundColor: '#f23030',
                    alignItems: 'center'
                }}>

                    {/* <StatusBar backgroundColor='red'/> */}
                    <View style={{
                        width: '80%',
                        flexDirection: 'row',
                        height: 56*s,
                        alignItems: 'center',
                        backgroundColor: '#fbb8b8',
                        marginRight: 10*s,
                        paddingLeft: 15*s,
                        borderRadius: 28*s,
                    }}>
                        <Icon name="search" style={{ color: "#fff" }} />
                        <TextInput placeholder="请输入您要搜索的关键字" placeholderTextColor="#fff" style={{ fontSize: 17,padding:0,paddingLeft:15*s }} />
                    </View>
                    <Icon name="shopping-cart" style={{ color: "#fff" }} />
                </View>
                <View>
                    <Image
                        source={require("../../assets/images/bgimg.jpg")}
                        style={{ height: 273*s, width: '100%' }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{
                    flexDirection: 'column'
                }}
                >
                    <View style={styles.box}>
                        <View style={styles.bone}>
                            <Image style={styles.pic} source={require("../../assets/images/introduce_06.jpg")} />
                            <Text style={styles.txt}>居家维修保养</Text>
                        </View>
                        <Icon name="right" />
                    </View>
                    <View style={styles.box}>
                        <View style={styles.bone}>
                            <Image style={styles.pic} source={require("../../assets/images/introduce_09.jpg")} />
                            <Text style={styles.txt}>住宿优惠</Text>
                        </View>
                        <Icon name="right" />
                    </View>
                    <View style={styles.box}>
                        <View style={styles.bone}>
                            <Image style={styles.pic} source={require("../../assets/images/introduce_11.jpg")} />
                            <Text style={styles.txt}>出行接送</Text>
                        </View>
                        <Icon name="right" />
                    </View>
                    <View style={styles.box}>
                        <View style={styles.bone}>
                            <Image style={styles.pic} source={require("../../assets/images/introduce_13.jpg")} />
                            <Text style={[styles.txt, styles.spetxt]}>E族活动</Text>
                        </View>
                        <Icon name="right" />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: 20
                }}>
                    <TouchableOpacity
                        style={{
                            width: 350*s,
                            height: 60*s,
                            borderRadius: 20*s,
                            backgroundColor: "#f23030",
                        }}
                    >
                        <Text style={{
                            color: '#fff',
                            textAlign: 'center',
                            lineHeight: 60*s,
                            fontSize: 18
                        }}>发布需求</Text>
                    </TouchableOpacity>
                    <Text style={{
                        color: '#767676',
                        textAlign: 'center',
                        marginTop: 30*s
                    }}>©E族之家 版权所有</Text>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        width: "100%",
        height: 120*s,
        backgroundColor: "#fff",
        marginTop: 10*s,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30*s
    },
    bone: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },
    txt: {
        fontSize: 22,
        fontFamily: "Microsoft YaHei",
        color: "#333333",
        marginLeft: 30*s
    },
    spetxt: {
        color: "#f79999"
    },
    pic: {
        width: 120*s,
        // height: 88*s,
        resizeMode: 'contain'
    },
})
