import axios from 'axios'

//也许会有多个服务器，所以不用export default
//回调方法一：要求用户传入两个函数success和failure
/* export function request(config,success,failure){
    //1.创建axios的实例
    const instance=axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    //发送真正的网络请求
    instance(config)
    //数据处理需要想办法回调出去
    .then(res=>{
        console.log(res)
        success(res)
    })
    .catch(err=>{
        console.log(err)
        failure(err)
    })
} */

//回调方法二
/* export function request(config){
    //1.创建axios的实例
    const instance=axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    //发送真正的网络请求
    instance(config.baseConfig)
    //数据处理需要想办法回调出去
    .then(res=>{
        console.log(res)
        config.success(res)
    })
    .catch(err=>{
        console.log(err)
        config.failure(err)
    })
} */

//promise方法三
/* export function request(config){
    return new Promise((resolve,reject)=>{
        //1.创建axios的实例
    const instance=axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    //发送真正的网络请求
    instance(config)
    //数据处理需要想办法回调出去
    .then(res=>{
        resolve(res)
    })
    .catch(err=>{
        reject(err)
    })
    })
} */

//方法四
export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //2.axios的拦截器interceptors
    //拦截请求
    instance.interceptors.request.use(config=>{
        console.log(config)
        //作用：1.比如config中的一些信息不符合服务器的要求
        //2.比如每次发送网络请求是，都希望在界面中显示一个请求的图标
        //3.某些网络请求(比如登录token)，必须携带一些特殊的信息

        //拦截后还要把config发回出去
        return config
    },err=>{
        console.log(err)
    })


    //拦截响应
    instance.interceptors.response.use(res=>{
        console.log(res)
        return res.data
    },err=>{
        console.log(err)
    })



    //3.发送真正的网络请求
    return instance(config)
}

//当有一天axios不再使用时，可以写上另一个网络请求的代码
//用promise包装:return new Promise()
//即可，其他地方都不需要变动
export function request2() {

}