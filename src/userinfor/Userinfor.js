import React, { Component } from 'react'
import { View, Text, AsyncStorage, Dimensions, TextInput, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from "react-native-router-flux";
import { Icon } from '@ant-design/react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Button from "react-native-button";

const { width } = Dimensions.get('window');
const s = width / 640;

var personnal = [
    { title: '账户管理', icon: 'setting' },
    { title: '收货地址', sourcepath: require('../../assets/images/location.jpg') },
    { title: '我的信息', icon: 'idcard' },
    { title: '我的订单', sourcepath: require('../../assets/images/dingdan.jpg') },
    { title: '我的二维码', icon: 'qrcode' },
    { title: '我的积分', sourcepath: require('../../assets/images/jifen.jpg') },
    { title: '我的收藏', icon: 'star' },
];
var activities = [
    { title: '居家维修保护', sourcepath: require("../../assets/images/repair.jpg") },
    { title: '出行接送', sourcepath: require("../../assets/images/car.jpg") },
    { title: '我的受赠人', icon: 'user' },
    { title: '我的住宿优惠', sourcepath: require("../../assets/images/bed.jpg") },
    { title: '我的活动', sourcepath: require("../../assets/images/activity.jpg") },
    { title: '我的发布', icon: 'form' },
]

export default class Userinfor extends Component {
    constructor() {
        super();
        this.state = {
            name: 'BINNU DHILLON',
            imageUrl: require('../../assets/images/headimg.jpg'),
            isout: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    storeData = async () => {
        await AsyncStorage.setItem('imageUrl', this.state.imageUrl.uri,
            () => { console.log('ok') }
        )
    }
    getData = async () => {
        await AsyncStorage.getItem('imageUrl')
            .then((res) => {
                console.log(res);
                if (res) {
                    this.setState({
                        imageUrl: { uri: res }
                    }, () => {
                        // console.log('111111111');
                    })
                }

            });
    }

    takephoto = () => {
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({
                imageUrl: {
                    uri: image.path
                }
            }, () => {
                this.storeData();
            })
        });
    }

    singout = () => {
        AsyncStorage.removeItem('user')
            .then(res => {
                console.log('clear all!!!!');
                Actions.login();
                this.setState({
                    isout: true
                }, () => {
                    console.log('登录状态:' + this.state.isout);
                })
            })

    }

    render() {
        return (
            <View>
                <ScrollView>
                <View>
                    <View style={{
                        height: 280 * s,
                        backgroundColor: '#f23030',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 160 * s,
                            height: 160 * s,
                            borderRadius: 80 * s,
                            overflow: "hidden",
                            borderWidth: 2*s,
                            borderColor: '#fff',
                            marginTop: 10*s
                        }}>
                            <Button
                                onPress={() => { this.takephoto() }}
                            >
                                <Image
                                    style={{
                                        resizeMode: 'cover',
                                        width: 160 * s,
                                        height: 160 * s,
                                    }}
                                    source={this.state.imageUrl}
                                />
                            </Button>
                        </View>
                        <Text style={{ color: '#fff', fontSize: 22,marginTop:15*s}}>BINNU DHILLON</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#fff'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 60 * s,
                            paddingLeft: 20*s,
                            paddingBottom: 8 * s,
                            borderBottomWidth: 1,
                            borderBottomColor: '#eeeeee'
                        }}>
                            <Image
                                style={{ width: 30 * s, height: 37 * s, resizeMode: 'contain' }}
                                source={require("../../assets/images/user.jpg")} />
                            <Text style={{ marginLeft: 20, fontSize: 18, color: '#4f4e4e' }}>我的个人中心</Text>
                        </View>
                        <View style={{
                            height: 355 * s,
                            backgroundColor: "#fff",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            paddingTop: 26 * s,
                        }}>
                            {
                                personnal.map((item, idx) => {
                                    if (item.icon) {
                                        return <View style={styles.box}>
                                            <Icon name={item.icon} size="lg" style={styles.img} />
                                            <Text style={styles.txt}>{item.title}</Text>
                                        </View>
                                    }
                                    return <View style={styles.box}>
                                        <Image style={styles.img} source={item.sourcepath} />
                                        <Text style={styles.txt}>{item.title}</Text>
                                    </View>
                                })
                            }
                        </View>
                    </View>
                    {/* <View> */}
                    <View style={{
                        backgroundColor: '#fff',
                        marginTop: 5*s
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 45*s,
                            paddingLeft: 20*s,
                            borderBottomWidth: 1,
                            borderBottomColor: '#eeeeee'
                        }}>
                            <Icon name="tag" size="md" />
                            <Text style={{ marginLeft: 20*s, fontSize: 18, color: '#4f4e4e' }}>E族活动</Text>
                        </View>
                        <View style={{
                            height: 240 * s,
                            paddingTop: 18 * s,
                            backgroundColor: "#fff",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            {
                                activities.map((item, idx) => {
                                    if (item.icon) {
                                        if (item.title === '我的发布') {
                                            return <View style={styles.box}>
                                                <Button onPress={() => Actions.mypublish()}>
                                                    <Icon style={styles.img} name={item.icon} size="lg" />
                                                </Button>
                                                <Text style={styles.txt}>{item.title}</Text>
                                            </View>
                                        }
                                        return <View style={styles.box}>
                                            <Icon name={item.icon} size="lg" style={styles.img} />
                                            <Text style={styles.txt}>{item.title}</Text>
                                        </View>
                                    }
                                    return <View style={styles.box}>
                                        <Image style={styles.img} source={item.sourcepath} />
                                        <Text style={styles.txt}>{item.title}</Text>
                                    </View>
                                })
                            }

                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                width: 360*s,
                                height: 60*s,
                                borderRadius: 30*s,
                                marginTop: 20*s,
                                backgroundColor: 'red'
                            }}
                            onPress={this.singout}
                        >
                            <Text style={styles.txtbottom}>{this.state.name}  |  退出</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        width: '30%',
        paddingBottom: 13*s,
        paddingTop: 15*s,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        marginTop: 6 * s,
        color: '#4f4e4e',
    },
    txtbottom: {
        textAlign: 'center',
        color: "#fff",
        // marginTop: 20,
        lineHeight:50*s,
        fontSize: 18
    },
    img: {
        paddingBottom: 1 * s,
        width: 35 * s,
        height: 40 * s,
        fontSize: 35 * s,
        resizeMode: 'contain'
    }
});