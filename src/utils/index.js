import queryString from 'query-string';
let rootUrl='https://www.fastmock.site/mock/3c4e31ce2f1df90f673953e561c0b4a9/api';//fastmock根路径

let myFetch={
    get(url,queryParams){
        url = rootUrl+url;
        if(queryParams){
            url+='?'+queryString.stringify(queryParams);
        }
        return fetch(url)
                .then(res=>res.json())
    },
    post(url,body){     //封装post请求

        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
                "Accept":'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res=>res.json())  //返回的是promise
    }
}

export {myFetch};
