import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
    data(){
        return{
            itemImgListener:null,
            derefresh:null
        }
    },
    mounted() {
        //监听Item中图片加载完成
        this.derefresh = debounce(this.$refs.scroll.refresh, 50)
        //保存监听事件
        this.itemImgListener = () => {
            this.derefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
        console.log("混入")
    }
}

export const backTopMixin={
    data(){
        return{
            isShowBackTop:false,
        }
    },
    components:{
        BackTop
    },
    methods:{
        backClick(){
            /* this.$refs.scroll.scroll.scrollTo(0,0,500) */
            this.$refs.scroll.scrollTo(0,0,500)
          },
    }
}