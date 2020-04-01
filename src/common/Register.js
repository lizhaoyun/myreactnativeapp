import React, { Component } from 'react'
import { Text, View,Dimensions, ToastAndroid, TextInput, AsyncStorage, TouchableOpacity, Image, StyleSheet, Modal, Alert, ActivityIndicator, } from "react-native";
import { Icon, Toast } from '@ant-design/react-native';
import { Actions, Lightbox } from "react-native-router-flux";
import { myFetch } from '../utils/index';


const { width } = Dimensions.get('window');
const s = width / 640;

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pwd: '',
            token: 0,
            success: false,
            result: ''
        }
    }

    userhandle = (text) => {
        this.setState({ username: text })
    }

    pwdhandle = (text) => {
        this.setState({ pwd: text })
    }
    storeuser = () => {
        if (!this.state.username) {
            Alert.alert('请输入用户名！');
        }
        else if (!this.state.pwd) {
            Alert.alert('请输入密码！');
        }
        else {
            this.setState({
                success:true
            })
            myFetch.post('/check', {
                username: this.state.username,
                pwd: this.state.pwd
            }).then(res => {
                var result = res.data.result;
                switch (result) {
                    case '0':
                        this.setState({
                            success:false
                        },()=>{
                            Alert.alert('请求超时！');
                        });
                        break;
                    case '1':
                        this.setState({
                            success:false
                        },()=>{
                            Alert.alert('用户名重复！');
                        });
                        break;
                    default:
                        this.setState({
                            success:false
                        },()=>{
                            AsyncStorage.setItem('user', JSON.stringify(res.data.userInfo))  //存储的是字符串,返回值是Promise函数
                            .then(() => {
                                this.setState({
                                    success: true
                                },()=>{
                                    Alert.alert('注册成功！');
                                });
                                Actions.pop();
                                console.log('存储' + JSON.stringify(res.data.userInfo));

                            })
                        });
                        console.log(res.data);
                        
                        break;
                }

            })

        }

    }

    render() {
        return (
            <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'#F8F8FF'
            }}>
                <View style={{
                    justifyContent:'center',
                    alignItems: 'center',
                    // marginTop: '50%'
                }}>
                    <View>
                        <Icon name="user" style={{ width: 35*s, height: 35*s, position: 'absolute', left: 15*s, top: 32*s }} />
                        <TextInput
                            placeholder="用户名"
                            placeholderTextColor='#79CDCD'
                            onChangeText={this.userhandle}
                            style={{
                                marginTop: 20*s,
                                height: 60*s,
                                width: 400*s,
                                borderColor: "#40E0D0",
                                borderRadius: 30*s,
                                borderWidth: 1*s,
                                padding:0,
                                paddingLeft: 60*s,
                            }}
                        />
                    </View>
                    <View>
                        <Icon name="unlock" style={{ width: 35*s, height: 35*s, position: 'absolute', left: 15*s, top: 62*s }} />
                        <TextInput
                            placeholder="密码"
                            placeholderTextColor='#79CDCD'
                            secureTextEntry={true}
                            onChangeText={this.pwdhandle}
                            style={{
                                marginTop: 50*s,
                                height: 60*s,
                                width: 400*s,
                                borderRadius: 30*s,
                                borderColor: "#40E0D0",
                                borderWidth: 1*s,
                                padding:0,
                                paddingLeft: 60*s,
                            }}
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        marginTop: 60*s,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                width:180*s,
                                height: 70*s,
                                borderRadius: 35*s,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 15*s,
                                backgroundColor: "#79CDCD"
                            }}
                            onPress={() => Actions.pop()}
                        >
                            <Text style={{ color: 'white',fontSize:18 }}>返回</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width:180*s,
                                height: 70*s,
                                borderRadius: 35*s,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 15*s,
                                backgroundColor: "#79CDCD"
                            }}
                            onPress={this.storeuser}
                        >
                            <Text style={{ color: 'white' }}>注册</Text>
                        </TouchableOpacity>
                    </View>
                    {/* {
                        this.state.success ? (<View style={styles.tips}><Text style={styles.txt}>注册成功！</Text></View>) : null
                    } */}
                    {
                        this.state.success ? (<View style={styles.isloding}><ActivityIndicator size='large' color='#79CDCD'/></View>) : null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tips: {
        width: 200,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'pink',
        marginTop: '50%'
    },
    txt: {
        textAlign: 'center',
        lineHeight: 40
    },
    isloding:{
        // flex:1,
        marginTop: '30%',
    }
})
