import React, { Component } from 'react';
import { Text, View,ActivityIndicator,Dimensions, ToastAndroid, TextInput, AsyncStorage, TouchableOpacity, Image, StyleSheet, Alert, } from "react-native";
import { Icon } from '@ant-design/react-native';
import { Actions } from "react-native-router-flux";
import { myFetch } from '../utils/index';


// const key Toast.loading('messsage')
// Portal.remove(key)

// let rootUrl='https://www.fastmock.site/mock/3c4e31ce2f1df90f673953e561c0b4a9/api';//fastmock根路径


const { width } = Dimensions.get('window');
const s = width / 640;


export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            pwd: '',
            isloding: false
        }
    }

    userhandle = (text) => {
        // console.log(text);
        this.setState({ username: text })
    }

    pwdhandle = (text) => {
        // console.log(text);
        this.setState({ pwd: text })
    }

    login = () => {

        // var user={
        //     "code":'0000',
        //     "data":{
        //         "username":'zhang',
        //         "token":'@id'
        //     },
        //     "desc":'成功'
        // };
        // myFetch.get('/topics',{limit:4,user:'sss'})
        // .then(res=>{
        //     console.log(res);
        // })

        // 箭头函数：
        // ()=>123, 123直接是返回值
        // ()=>{
        //   代码逻辑...
        //   return ...
        // }
        if (!this.state.username) {
            Alert.alert('请输入用户名！');
        }
        else if (!this.state.pwd) {
            Alert.alert('请输入密码！');
        } else {
            this.setState({
                isloding: true
            })
            myFetch.post('/login', {
                username: this.state.username,
                pwd: this.state.pwd
            }).then(res => {
                if (res.result == '0') {
                    Alert.alert('登录失败！');
                    this.setState({
                        isloding: false
                    });
                } else {
                    this.setState({
                        isloding: false
                    })
                    // console.log(',,,,,' + res.data);
                    AsyncStorage.setItem('user', JSON.stringify(res.data))  //存储的是字符串,返回值是Promise函数
                        .then(() => {
                            Actions.homePage();
                        })
                }

            })
        }

        // fetch(rootUrl+'/login',{
        //     method:'POST',
        //     headers:{
        //         "Accept":'application/json',
        //         'Content-type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         username:this.state.username,
        //         pwd:this.state.pwd
        //     })
        // })
        // .then(res=>res.json())
        // .then(res=>{
        //     console.log(res);
        //     Actions.homePage();//不能直接跳到子页面，要先跳到外层页面或 root或lightbox
        // })

    }


    render() {
        return (
            <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                // marginTop: '30%',
                backgroundColor:'#F8F8FF'

            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    
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
                                borderRadius: 30*s,
                                borderColor: "#40E0D0",
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
                        // backgroundColor:'orange',
                        marginTop: 60*s,
                        flexDirection: 'row',
                        justifyContent:'space-evenly',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                // width: "30%",
                                width:180*s,
                                height: 70*s,
                                borderRadius: 35*s,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 15*s,
                                // marginTop: 20*s,
                                // backgroundColor: "#789564"
                                backgroundColor:'#79CDCD'
                            }}
                            onPress={this.login}
                        >
                            <Text style={{ color: 'white',fontSize:18}}>登录</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                // width: "30%",
                                width:180*s,
                                height: 70*s,
                                borderRadius: 35*s,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 15*s,
                                // marginTop: 20*s,
                                // backgroundColor: "#789564"
                                backgroundColor:'#79CDCD'

                            }}
                            onPress={() => Actions.join()}
                        >
                            <Text style={{ color: 'white',fontSize:18 }}>去注册</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {
                        this.state.isloding ? (<View style={styles.isloding}><ActivityIndicator size='large' color='blue'/></View>) : null
                    }
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        // textAlignVertical:'center',
        lineHeight: 40*s,
        color: '#fff',
        fontSize: 22
    },
    isloding:{
        marginTop: 100*s,
    }
})
