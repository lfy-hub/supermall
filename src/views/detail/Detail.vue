<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" 
    @titleClick="titleClick"
    ref="nav"/>
    <scroll class="detail-content" ref="scroll"
    :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @goodsImageLoad="goodsImageLoad"/>
      <detail-param-info ref="params" :param-info="itemParams"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";


import { getDetail,getRecommend, Goods, Shop } from "network/detail";
import {debounce} from "commonJs/utils"
import {itemListenerMixin,backTopMixin} from "commonJs/mixin" 
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodList,
    Scroll,
    
  },
  mixins:[itemListenerMixin,backTopMixin], 
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      itemParams:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo=data.detailInfo;
      this.itemParams=data.itemParams;

      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    });

    getRecommend().then((res)=>{
      this.recommends=res.data.list
    })

    //对给getThemeTopY赋值的操作进行防抖
    this.getThemeTopY=debounce(()=>{
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs)
    },100)
  },
  mounted(){
    
  },
  destroyed(){
    //取消全局事件监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(['addCart']),
    goodsImageLoad(){
      this.derefresh()
      /* this.$refs.scroll.refresh() */
      this.getThemeTopY()
      
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    contentScroll(position){
      const positionY=-position.y
      let length=this.themeTopYs.length
      for(let i=0;i<length-1;i++){
        if(this.currentIndex!=i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
      if(this.currentIndex!=length-1&&(positionY>=this.themeTopYs[length-1])){
        this.currentIndex=length-1
        this.$refs.nav.currentIndex=this.currentIndex
      }

      //判断BackTop是否显示
      this.isShowBackTop=(-position.y)>1000 
    },
    addToCart(){
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.nowPrice
      product.iid=this.iid

      this.addCart(product).then(res=>{
        this.$toast.show(res,1500)
      }) 

      /* this.$store.dispatch("addCart",product).then(res=>{
        console.log(res)
      }) */
    }
  }
};
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content{
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #fff;
}
</style>