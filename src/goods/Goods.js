import React, { Component } from 'react'
import {View,Text,Dimensions,Button,TextInput,StyleSheet, Image, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Actions} from "react-native-router-flux";
import { Icon } from '@ant-design/react-native';


const {width}=Dimensions.get('window');
const s=width/640;

const goods=[
    {
        title:'Oishi/上好佳玉米卷20包膨化休 闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../../assets/images/list_03.jpg')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休 闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../../assets/images/list_05.jpg')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休 闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../../assets/images/list_03.jpg')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休 闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../../assets/images/list_05.jpg')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休 闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../../assets/images/list_03.jpg')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休 闲食品Oishi/上好佳',
        price:'36.00',
        img:require('../../assets/images/list_05.jpg')
    },
]

export default class Goods extends Component {
    render() {
        return (
            <View>
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.header}>
                        <View style={styles.search}>
                            <TextInput
                                placeholder="请输入商品名称"
                                placeholderTextColor="#999999"
                                style={{
                                    width: 490 * s,
                                    height: 50 * s,
                                    fontSize: 17,
                                    padding:0,
                                    paddingLeft:15*s
                                }} />
                            <Icon name='search' style={{ fontSize: 28 }} />
                        </View>
                    </View>
                    <View style={styles.nav}>
                        <TouchableOpacity>
                            <Text style={[styles.txt, styles.sptxt]}>综合</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.txt}>销量</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.txt}>新品</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.txt}>价格</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.txt}>信用</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={{ backgroundColor: '#f4f4f4' }}
                        data={goods}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View key={item} style={styles.goods}>
                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width:219*s,
                                        height: 238 * s,
                                        marginTop: 30 * s,
                                        padding:0,
                                    }}
                                    source={item.img} />
                                <Text style={styles.intxt}>{item.title}</Text>
                                <Text
                                    style={styles.pritxt}
                                >{item.price}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    txt:{
        textAlign:'center',
        fontSize:17,
        color:'#333333',
    },
    sptxt:{
        color:'#f23030'
    },
    intxt:{
        flexWrap:'wrap',
        color:'#666666',
        paddingTop:12*s,
    },
    pritxt:{
        color:'#f23030',
        paddingTop:10*s,
        // alignItems:''
    },
    header:{
        height:70*s,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#eeeeee',
        justifyContent:'center',
        alignItems:'center'
    },
    search:{
        height:50*s,
        width:544*s,
        backgroundColor:'#eeeeee',
        flexDirection:'row',
        alignItems:'center'
    },
    nav:{
        height:70*s,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    goods:{
        width:290*s,
        alignItems:'center',
        backgroundColor:'#fff',
        marginLeft:20*s,
        marginTop:20*s,
        paddingLeft:15*s,
        // paddingRight:15*s,
        paddingBottom:20*s
    }
})