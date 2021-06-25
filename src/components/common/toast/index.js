import Toast from './Toast'

const obj={
}

obj.install=function(Vue){
    //1.创建组件构造器
    const toastContrustor=Vue.extend(Toast)

    //2.创建组件对象
    const toast=new toastContrustor()

    //3.将组件对象手动挂载到某一元素上
    toast.$mount(document.createElement('div'))

    //4.toast.$el对应上述div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast=toast

}

export default obj