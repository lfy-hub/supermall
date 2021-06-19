<template>
  <div id="detail">
      <detail-nav-bar  class="detail-nav"/>
      <detail-swiper style="margin-top: 44px;" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info style="padding-bottom: 60px;" :shop="shop"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo'

import {getDetail,Goods,Shop} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{}
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res=>{
      console.log(res)
      const data = res.result;
      this.topImages=data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      this.shop=new Shop(data.shopInfo)
    })
  },
};
</script>

<style scoped>
.detail-nav{
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
</style>