import axios from 'axios'
export function request(config) {
    //第二种封装方法
    const instance = axios.create({
            baseURL: 'http://152.136.185.210:8000/api',
            timeout: 5000
        })
        //axios请求拦截
        //请求拦截的作用
    instance.interceptors.request.use(config => {
            //console.log(config);
            //1.比如config中的一些信息不符合服务器的要求

            //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图片

            //3.某些网络请求(比如登录(token))，必须携带一些特殊的信息
            return config
        }, err => {
            console.log(err)
        })
        //响应拦截的作用
    instance.interceptors.response.use(res => {
        //console.log(res);
        return res
    }, err => {
        console.log(err)
    })

    return instance(config)
}