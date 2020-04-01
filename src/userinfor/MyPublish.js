import React, { Component } from 'react';
import {View,Text,ActivityIndicator,Dimensions,TouchableOpacity, StyleSheet, ToastAndroid, ScrollView} from 'react-native';
import Button from 'react-native-button';

const { width,height } = Dimensions.get('window');
const s = width / 640;

export default class MyPublish extends Component {

    constructor(){
        super();
        this.state={
            page:1,
            data:[],
            finish:false
        }
    }

    componentDidMount(){
        this.setState({
            finish:true
        });
        fetch('https://cnodejs.org/api/v1/topics?page=1&limit=10')
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                data:res.data
            },()=>{
                console.log(this.state.data.length);
                this.setState({
                    finish:false
                })
            })
        })
        this.flag=true;
    }

    getTitle=()=>{
        
        this.setState((state)=>{
            if((state.page-1)===0){
                ToastAndroid.show('已经是第1页啦！',ToastAndroid.LONG);
                // return {
                //     page:state.page
                // }
            }else{
                return {
                    page:state.page-1
                }
            }
        },()=>{
            
            console.log("当前是第："+this.state.page);
            if(this.state.page!==1){
                this.setState({
                    finish:true
                });
                fetch('https://cnodejs.org/api/v1/topics?page='+this.state.page+'&limit=10')
                .then(res=>res.json())
                .then(res=>{
                    this.setState({
                        data:res.data
                    },()=>{
                        this.setState({
                            finish:false
                        });
                    })
                })
            }
            
        })
    }
    getNextPage=()=>{
        this.setState((state)=>{
            var addpage = state.page+1;
            if(addpage>5){
                ToastAndroid.show('已经是最后一页啦！', ToastAndroid.LONG);
                this.flag=false;
                // return {
                //     page:state.page
                // }
            }else{
                this.flag=true;
                return {
                    page:addpage,
                } 
            }
                           
            
        },()=>{
            
            var url='https://cnodejs.org/api/v1/topics?page='+this.state.page+'&limit=10';
            console.log(url);
            console.log(this.flag);
            if(this.flag){
                this.setState({
                    finish:true
                });
                fetch(url)
                .then(res=>res.json())
                .then(res=>{
                    // console.log(res.data.title);
                    this.setState({
                        data:res.data
                    },()=>{
                        // console.log(this.state.data.length);
                        this.setState({
                            finish:false
                        });
                    })
                })
            }
            
        })
        
    }

    render() {
        return (
            <View style={{
                flex:1,
                backgroundColor:'#fff',
                alignItems:'center'
            }}>
                <View style={styles.content}>
                    {
                        this.state.data.map((item)=>(
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}>
                                <Text 
                                    numberOfLines={1}
                                    style={[styles.showtxt,styles.txtsize]} 
                                    
                                >{item.title.length>15?(item.title.substr(0,15)+'......'):item.title}</Text>
                                <Text style={[styles.time,styles.txtsize]}>{item.create_at.split('T')[0]}</Text>
                                {
                                    Math.random()>=0.5?(
                                        <Text style={styles.txtsize}>已回复</Text>
                                    ):(
                                        <Text style={{color:'red',fontSize:16}}>待回复</Text>
                                    )
                                }
                            </View>
                        ))
                    }
                    {
                        this.state.finish?(<View style={styles.finish}><ActivityIndicator size='large' color='red'/></View>):null
                    }
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.getTitle}
                    ><Text style={[styles.txt,styles.txtsize]}>上一页</Text>
                    </TouchableOpacity>
                    <Text style={[styles.txtsize,styles.apart]}>第{this.state.page}页/共5页</Text>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.getNextPage}
                    >
                        <Text style={[styles.txt,styles.txtsize]}>下一页</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles=StyleSheet.create({
    bottom:{
        height:50*s,
        // marginBottom:50*s,
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems:'center',
    },
    content:{
        width:width,
        height:height*0.60,
        padding:15*s,
    },
    showtxt:{
        width:'50%',
        lineHeight:50*s,
    },
    txtsize:{
        fontSize:16,
    },  
    time:{
        // fontSize:16,
        marginLeft:'15%',
        marginRight:'5%'
    },
    btn:{
        width:"30%",
        height:60*s,
        borderRadius:30*s,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#f23030"
    },
    txt:{
        color:'#fff',
    },
    finish:{
        flex:1,
        justifyContent:'center',
        // alignItems:'center',
    },
    apart:{
        marginLeft:20*s,
        marginRight:20*s
    }
})